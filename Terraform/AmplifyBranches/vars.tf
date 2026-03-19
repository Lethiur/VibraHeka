variable "branch_name" {
  description = "Main branch to create explicitly in Amplify"
  type        = string
  default     = "main"
}

variable "tags" {
  description = "Tags for Amplify resources"
  type        = map(string)
  default     = {}
}