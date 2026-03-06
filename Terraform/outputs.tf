output "amplify_app_id" {
  description = "Amplify App ID"
  value       = aws_amplify_app.this.id
}

output "amplify_app_default_domain" {
  description = "Default Amplify domain"
  value       = aws_amplify_app.this.default_domain
}

output "primary_branch_url" {
  description = "Primary branch URL"
  value       = "https://${aws_amplify_branch.primary.branch_name}.${aws_amplify_app.this.default_domain}"
}
