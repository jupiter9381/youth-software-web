module "pass_on_fe_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "${local.project}-${var.environment}"
  acl    = "private"

  block_public_policy     = true
  restrict_public_buckets = true
  block_public_acls       = true
  ignore_public_acls      = true

  versioning = {
    enabled = true
  }

  server_side_encryption_configuration = {
    rule = {
      apply_server_side_encryption_by_default = {
        sse_algorithm = "AES256"
      }
    }
  }

  control_object_ownership = true
  object_ownership         = "BucketOwnerPreferred"

  attach_policy = true
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        "Sid" : "AllowCloudFrontServicePrincipal",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "cloudfront.amazonaws.com"
        },
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::${local.project}-${var.environment}/*",
        "Condition" : {
          "StringEquals" : {
            "AWS:SourceArn" : "arn:aws:cloudfront::${var.aws_account_id}:distribution/${module.pass_on_fe_cdn.cloudfront_distribution_id}"
          }
        }
      }
    ]
  })
}

module "pass_on_fe_logs_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "${local.project}-logs-${var.environment}"
  acl    = "private"

  control_object_ownership = true
  object_ownership         = "BucketOwnerPreferred"

  versioning = {
    enabled = true
  }
}
