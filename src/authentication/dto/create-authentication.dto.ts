import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsOptional,
} from "class-validator";

export class CreateAuthenticationDto {
    @IsNotEmpty({ message: "Firstname is required" })
    @IsString({ message: "Invalid firstname" })
    first_name: string;

    @IsNotEmpty({ message: "Lastname is required" })
    @IsString({ message: "Invalid lastname" })
    last_name: string;

    @IsNotEmpty({ message: "Username is required" })
    @IsString({ message: "Invalid Username" })
    user_name: string;

    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: "Invalid email" })
    email: string;

    @IsNotEmpty({ message: "PhoneNumber is required" })
    @IsString({ message: "Invalid phone number" })
    @IsPhoneNumber("IN")
    phone_number: string;

    @IsOptional()
    @IsString()
    dob: string;

    @IsOptional()
    @IsString()
    gender: string;

    @IsOptional()
    @IsString()
    user_type: string;

    @IsOptional()
    @IsString()
    status: string;

    @IsNotEmpty({ message: "Password is required" })
    @IsString({ message: "Invalid password" })
    password: string
}
