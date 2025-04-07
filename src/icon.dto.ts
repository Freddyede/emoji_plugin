import { IsNotEmpty } from 'class-validator';

export class IconDto {
    @IsNotEmpty()
    htmlCode: string;
    @IsNotEmpty()
    name: string;
}