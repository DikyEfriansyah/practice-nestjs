import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtGuard extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration : false,
      secretOrKey : 'hayukkk'
    })
  }

  async validate(payload: any) {
    return {
      UserId : payload.id,
      UserName : payload.username,
      UserPhone : payload.phone,
      UserEmail : payload.email,
      firstName : payload.firstName,
      lastName : payload.lastName
    }
  }
}
