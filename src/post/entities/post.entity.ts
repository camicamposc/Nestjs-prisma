
import { ApiProperty } from "@nestjs/swagger";
import { Post } from "@prisma/client";

export class PostEntity implements Post {
    @ApiProperty({ default: 1 })
    id: number;
    @ApiProperty({ default: 'Titulo' })
    title: string;
    @ApiProperty({ default: 'Contenido' })
    content: string;
    @ApiProperty({ default: true })
    published: boolean;

}
