import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty({ message: "Username is required" })
    @IsString({ message: "Invalid Username" })
    user_name: string;

    @IsNotEmpty({ message: "Password is required" })
    @IsString({ message: "Invalid password" })
    password: string;
}