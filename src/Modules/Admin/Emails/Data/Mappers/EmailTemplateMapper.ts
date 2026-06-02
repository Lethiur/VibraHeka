import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";
import { EmailTemplateForAction } from "@admin/emailTemplates/Domain/Models/EmailTemplateForAction";
import { ActionType } from "@admin/emailTemplates/Domain/Models/ActionType";
import { EmailTemplateDTO } from "@admin/emailTemplates/Data/DTOs/EmailTemplateDTO";
import { EmailTemplateForActionDTO } from "@admin/emailTemplates/Data/DTOs/EmailTemplateForActionDTO";

export function mapEmailTemplateDTO(dto: EmailTemplateDTO): EmailTemplate {
  return {
    ID: dto.templateID,
    Name: dto.templateName,
    Created: dto.createdAt,
    LastModified: dto.lastModified,
  };
}

export function mapEmailTemplateForActionDTO(dto: EmailTemplateForActionDTO): EmailTemplateForAction {
  return {
    TemplateID: dto.templateID,
    ActionType: dto.actionType as ActionType,
  };
}

export function mapEmailTemplateForActionToDTO(entity: EmailTemplateForAction): EmailTemplateForActionDTO {
  return {
    actionType: entity.ActionType,
    templateID: entity.TemplateID,
  };
}
