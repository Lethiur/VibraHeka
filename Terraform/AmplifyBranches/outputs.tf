output "amplify_app_id" {
  description = "Amplify app id used for branch operations"
  value       = data.terraform_remote_state.amplify_app_state.outputs.amplify_app_id
}
