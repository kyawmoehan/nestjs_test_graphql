import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../roles/entities/role.entity";
import { ROLES_KEY } from "../decorators/role.decorators";
import { RoleEnum } from "../enum/role.enum";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const gqlContext = GqlExecutionContext.create(context);
        const req = gqlContext.getContext().req;
        const user = req.user;

        const userRoles = user.roles.map((role: Role) => role.name);
        return requiredRoles.some((role) => {
            return userRoles.includes(role);
        });
    }
}