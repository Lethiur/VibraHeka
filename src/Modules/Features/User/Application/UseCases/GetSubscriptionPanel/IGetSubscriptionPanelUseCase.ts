import { Result } from "neverthrow";

export default interface IGetSubscriptionPanelUseCase {

    Execute(): Promise<Result<string, string>>
}