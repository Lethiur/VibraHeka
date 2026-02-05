export default class Therapist {

    public Id: string = "";
    public Email: string = "";
    public Role: number = 0;

    public FirstName: string = "";
    public MiddleName: string = "";
    public LastName: string = "";
    public PhoneNumber: string = "";
    public Bio: string = "";
    public AvatarUrl: string = "";

    constructor(therapistOrId: Partial<Therapist>) {
        this.Id = therapistOrId.Id ?? "";
        this.Email = therapistOrId.Email ?? "";
        this.Role = therapistOrId.Role ?? 0;
        this.FirstName = therapistOrId.FirstName ?? "";
        this.MiddleName = therapistOrId.MiddleName ?? "";
        this.LastName = therapistOrId.LastName ?? "";
        this.PhoneNumber = therapistOrId.PhoneNumber ?? "";
        this.Bio = therapistOrId.Bio ?? "";
        this.AvatarUrl = therapistOrId.AvatarUrl ?? "";
    }
} 