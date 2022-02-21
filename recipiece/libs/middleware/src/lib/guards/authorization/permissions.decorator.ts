import { SetMetadata } from "@nestjs/common";
import { UserPermissionsLevel } from "@recipiece/database";

export const Permissions = (...permissions: UserPermissionsLevel[]) => SetMetadata('permissions', permissions);
