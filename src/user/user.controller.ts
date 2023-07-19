import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private authService : UserService) {}

    @Post('signup')
    public async signUp(@Body() fields:any){
        return this.authService.signup(fields)
    }

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    public async signIn(@Request() req){
        return this.authService.login(req.user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    public async getProfile(@Request() req){
        return req.user;
    }
}
