variable "aws_region" {
  description = "AWS region where Amplify app will be created"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Amplify app name"
  type        = string
}

variable "repository_url" {
  description = "Git repository URL connected to Amplify"
  type        = string
}

variable "github_access_token" {
  description = "GitHub personal access token with repo access"
  type        = string
  sensitive   = true
}

variable "primary_branch" {
  description = "Main branch to create explicitly in Amplify"
  type        = string
  default     = "main"
}

variable "auto_branch_creation_patterns" {
  description = "Branch name patterns to auto-create environments"
  type        = list(string)
  default     = ["VH-*, staging"]
}

variable "enable_pull_request_preview" {
  description = "Enable PR previews for temporary environments"
  type        = bool
  default     = false
}

variable "pull_request_environment_name" {
  description = "Prefix for PR preview environments"
  type        = string
  default     = "pr"
}

variable "environment_variables" {
  description = "Environment variables applied at app and branch level"
  type        = map(string)
  default     = {}
}

variable "tags" {
  description = "Tags for Amplify resources"
  type        = map(string)
  default     = {}
}
