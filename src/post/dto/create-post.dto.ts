import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreatePostDto {

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    content: string;

    @IsBoolean()
    @ApiProperty()
    published: boolean;

}