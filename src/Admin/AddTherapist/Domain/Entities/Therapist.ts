export default class Therapist {

    public Id: string = "";
    public Name: string = "";
    public Email: string = "";
    public Role: string = "";

    constructor(therapistOrId: Partial<Therapist>) {
        this.Id = therapistOrId.Id ?? "";
        this.Name = therapistOrId.Name ?? "";
        this.Email = therapistOrId.Email ?? "";
        this.Role = therapistOrId.Role ?? "";
    }
} 