import { Module } from '@nestjs/common';
import { Regions } from 'output/entities/Regions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsController } from 'src/regions/regions.controller';
import { RegionsService } from 'src/regions/regions.service';
import { UploadMulter } from 'src/multer/multer';
import { MulterModule } from '@nestjs/platform-express/multer';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { Users } from 'output/entities/Users';
import { LocalGuard } from 'src/auth/local/local.guard';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
    imports: [TypeOrmModule.forFeature([Regions, Users]), 
    MulterModule.register(UploadMulter.MulterOption()),
    PassportModule,
    JwtModule.register({
        secret : 'hayukkk',
        signOptions : { expiresIn : '2d'}
    })],
    controllers: [RegionsController, UserController],
    providers: [RegionsService, UserService, LocalGuard, JwtGuard],
    exports: [UserService]
})
export class GlobalModule {}
