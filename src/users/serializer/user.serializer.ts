import { Exclude } from "class-transformer";
import { Role } from "../../roles/entities/role.entity";

export class UserSerializer {
    id: number;
    userName: string;
    roles: Role[];

    @Exclude()
    password: string;

    constructor(partial: Partial<UserSerializer>) {
        Object.assign(this, partial);
    }
}