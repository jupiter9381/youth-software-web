terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

terraform {
  backend "s3" {
    key        = "pass-on-fe/terraform.tfstate"
    bucket     = "pass-on-terraform-state-${var.environment}"
    encrypt    = true
    kms_key_id = var.kms_key_id
  }
}
