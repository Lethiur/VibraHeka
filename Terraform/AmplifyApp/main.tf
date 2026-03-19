resource "aws_amplify_app" "VH_Amplify" {
  name         = var.app_name
  repository   = var.repository_url
  access_token = var.github_access_token
  platform     = "WEB"

  build_spec = file("${path.module}/amplify.yml")

  enable_branch_auto_build = true
  enable_auto_branch_creation = true

  environment_variables = var.environment_variables
  
  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|jpeg|js|mjs|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>"
    target = "/index.html"
    status = "200"
  }

  tags = var.tags
}