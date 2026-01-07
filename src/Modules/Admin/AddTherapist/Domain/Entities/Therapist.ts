export default class Therapist {

    public Id: string = "";
    public Name: string = "";
    public Email: string = "";
    public Role: number = 0;

    constructor(therapistOrId: Partial<Therapist>) {
        this.Id = therapistOrId.Id ?? "";
        this.Name = therapistOrId.Name ?? "";
        this.Email = therapistOrId.Email ?? "";
        this.Role = therapistOrId.Role ?? 0;
    }
} 