variable "app_name" {
  description = "App name"
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
