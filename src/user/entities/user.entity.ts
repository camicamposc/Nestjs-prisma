import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";


export class UserEntity implements User {
    @ApiProperty({ default: 1 })
    id: number;
    @ApiProperty({ default: 'correo@correo.com' })
    email: string;
    @ApiProperty({ default: 'Maria' })
    name: string;
}
