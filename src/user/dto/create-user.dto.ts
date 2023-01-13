import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}
