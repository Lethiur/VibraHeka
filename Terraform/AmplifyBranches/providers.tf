provider "aws" {
  region = "eu-west-1"
}

terraform {
  backend "s3" {
    bucket       = "vibraheka-tf"
    key          = "amplify-app-branches"
    region       = "eu-west-1"
    encrypt      = true
  }
}

data "terraform_remote_state" "backend" {
  backend = "s3"
  workspace = terraform.workspace
  config = {
    bucket = "vibraheka-tf"
    key    = "registration-svc"
    region = "eu-west-1"
  }
}

data "terraform_remote_state" "amplify_app_state" {
  backend = "s3"
  workspace = "main"
  config = {
    bucket = "vibraheka-tf"
    key    = "amplify-app"
    region = "eu-west-1"
  }
}


