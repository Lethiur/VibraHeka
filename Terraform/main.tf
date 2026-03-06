resource "aws_amplify_app" "this" {
  name         = var.app_name
  repository   = var.repository_url
  access_token = var.github_access_token
  platform     = "WEB"

  build_spec = file("${path.module}/amplify.yml")

  enable_branch_auto_build = true

  auto_branch_creation_patterns = var.auto_branch_creation_patterns

  auto_branch_creation_config {
    enable_auto_build             = true
    enable_pull_request_preview   = var.enable_pull_request_preview
    enable_performance_mode       = false
    environment_variables         = var.environment_variables
    pull_request_environment_name = var.pull_request_environment_name
    stage                         = "DEVELOPMENT"
  }

  environment_variables = var.environment_variables

  dynamic "custom_rule" {
    for_each = var.enable_api_proxy ? [1] : []
    content {
      source = "/api/<*>"
      target = "${var.api_proxy_origin}/api/<*>"
      status = "200"
    }
  }

  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|jpeg|js|mjs|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>"
    target = "/index.html"
    status = "200"
  }

  tags = var.tags
}

resource "aws_amplify_branch" "primary" {
  app_id      = aws_amplify_app.this.id
  branch_name = var.primary_branch
  stage       = "PRODUCTION"

  enable_auto_build = true

  environment_variables = var.environment_variables

  framework = "React"

  tags = var.tags
}
