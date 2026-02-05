import LocalStorageService from "@core/infrastructure/Storage/LocalStorageService";

export default class MockLocalStorageService extends LocalStorageService {
    public setString = jest.fn<void, [string, string]>();
    public getString = jest.fn<string | null, [string]>();
    public remove = jest.fn<void, [string]>();
    public clear = jest.fn<void, []>();

    constructor() {
        super();
    }
}
