
# backend_api_gateway_base_route

# amplify_app_id

resource "aws_ssm_parameter" "frontend_url" {
  name  = "/${data.terraform_remote_state.backend.outputs.settings_namespace}/frontend/url"
  type  = "String"
  value = "https://${aws_amplify_branch.this.display_name}.${data.terraform_remote_state.amplify_app_state.outputs.amplify_default_domain}/recover-password"
}

resource "aws_ssm_parameter" "frontend_url_test" {
  count = terraform.workspace == "main" ? 0 : 1
  name  = "/${data.terraform_remote_state.backend.outputs.settings_namespace}/frontend/url"
  type  = "String"
  value = "https://${aws_amplify_branch.this.display_name}.${data.terraform_remote_state.amplify_app_state.outputs.amplify_default_domain}/recover-password"
}


resource "aws_amplify_branch" "this" {
  app_id      = data.terraform_remote_state.amplify_app_state.outputs.amplify_app_id
  branch_name = var.branch_name
  stage       = "DEVELOPMENT"

  enable_auto_build = true
  
  framework         = "React"

  environment_variables = {
    VITE_API_BASE_URL = "${data.terraform_remote_state.backend.outputs.backend_api_gateway_base_route}/api/v1"
  }
  
  tags = var.tags
}

