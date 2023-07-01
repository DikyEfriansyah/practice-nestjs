import { Module } from '@nestjs/common';
import { Regions } from 'output/entities/Regions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsController } from 'src/regions/regions.controller';
import { RegionsService } from 'src/regions/regions.service';

@Module({
    imports: [TypeOrmModule.forFeature([Regions])],
    controllers: [RegionsController],
    providers: [RegionsService]
})
export class GlobalModule {}
