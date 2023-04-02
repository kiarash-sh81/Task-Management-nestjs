/* eslint-disable prettier/prettier */
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
    @IsString()
    @MinLength(4 , { message: "نام کاربری باید حداقل ۴ کرکتر باشد" })
    @MaxLength(20 , { message: "نام کاربری نمیتواند بیشتر از 20 کرکتر باشد" })
    username: string;

    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ , { message: "پسورد ضعیف است" })
    password: string;
}