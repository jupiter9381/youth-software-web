module "pass_on_fe_cdn" {
  source = "terraform-aws-modules/cloudfront/aws"

  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_All"
  retain_on_delete    = false
  wait_for_deployment = false
  default_root_object = "index.html"

  aliases = [var.domain_name]

  logging_config = {
    bucket          = module.pass_on_fe_logs_bucket.s3_bucket_bucket_regional_domain_name
    include_cookies = false
    prefix          = "cloudfront-logs"
  }

  create_origin_access_control = true
  origin_access_control = {
    "${local.project}-oac" = {
      description      = "CloudFront access to S3"
      origin_type      = "s3"
      signing_behavior = "always"
      signing_protocol = "sigv4"
    }
  }

  origin = {
    "${local.project}" = {
      domain_name = module.pass_on_fe_bucket.s3_bucket_bucket_regional_domain_name
      origin_access_control = "${local.project}-oac"
    }
  }

  custom_error_response = {
    error_code = 403
    error_caching_min_ttl = 10
    response_code = 200
    response_page_path = "/index.html"
  }

  default_cache_behavior = {
    target_origin_id = "${local.project}"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]

    forwarded_values = {
      query_string = false

      cookies = {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    default_ttl            = 3600
    min_ttl                = 0
    max_ttl                = 86400
  }

  viewer_certificate = {
    acm_certificate_arn = var.ssl_cert_arn
    ssl_support_method  = "sni-only"
  }

  depends_on = [module.pass_on_fe_logs_bucket]
}
