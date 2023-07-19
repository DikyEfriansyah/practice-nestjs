import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users) private UserRepo : Repository<Users>,
        private jwtService : JwtService
    ) {}

    public async signup(fields: any) {
        try {
            const hashPassword = await Bcrypt.hash(fields.password, 10);
            const user = await this.UserRepo.save({
                username : fields.username,
                firstName : fields.firstName,
                lastName : fields.lastName,
                userEmail : fields.email,
                userPhone : fields.phone,
                userPassword : hashPassword,
            });
            const { userPassword, ...result } = user;
            return result;

        } catch (error) {
            return error.message;
        }
    }

    public async validateUser(username : string, password : string){
        const user = await this.UserRepo.findOne({where : [{username : username}, {userEmail : username}]})

        const compare = await Bcrypt.compare(password, user.userPassword)
        if(compare) {
            const { userPassword, ...result} = user

            return result;
        }
    }

    public async login(user:any){
        const payload = {
            username : user.username,
            id : user.userId,
            phone : user.userPhone,
            email : user.userEmail,
            firstName : user.firstName,
            lastName : user.lastName
        };

        return {
            access_token : this.jwtService.sign(payload)
        }
    }
}
