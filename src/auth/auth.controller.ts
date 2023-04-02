/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signUp')
    signUp(@Body() authCredentailsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentailsDto);
    }
    @Post('/signIn')
    signIn(@Body() authCredentailsDto: AuthCredentialsDto): Promise<{ accessToken: string }>{
        return this.authService.signIn(authCredentailsDto);
    }
}
