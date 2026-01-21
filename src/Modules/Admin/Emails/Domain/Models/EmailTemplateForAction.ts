import { ActionType } from "@admin/emailTempaltes/Domain/Models/ActionType";

/**
 * Email template for action.
 */
export interface EmailTemplateForAction {
    /**
     * The template ID.
     */
    TemplateID: string;
    /**
     * The action type.
     */
    ActionType: ActionType;
}