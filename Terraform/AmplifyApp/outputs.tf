output "amplify_app_id" {
  description = "Amplify App ID"
  value       = aws_amplify_app.VH_Amplify.id
}

output "amplify_default_domain" {
  description = "default domain of this app"
  value = aws_amplify_app.VH_Amplify.default_domain
}