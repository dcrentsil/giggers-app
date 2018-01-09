export class Gigger{
    type: string;
    name: string;
    username: string;
    speciality: string;
    description : string;
    constructor(data: {
        type?: string,
        name?: string,
        username?: string,
        speciality?: string,
        description? : string
    } ={}) {
        this.type = data.type;
        this.name = data.name;
        this.username = data.username;
        this.speciality = data.speciality;
        this.description = data.description;
    }
}

