provider "aws" {
  region = "eu-west-1"
}

terraform {
  backend "s3" {
    bucket       = "vibraheka-tf"
    key          = "amplify-app"
    region       = "eu-west-1"
    encrypt      = true
  }
}
