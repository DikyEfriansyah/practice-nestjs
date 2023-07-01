import { Controller } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { Get } from '@nestjs/common';

@Controller('regions')
export class RegionsController {
    constructor(private Service : RegionsService) {}

    @Get()
    public async getAll(){
        return await this.Service.findAll();
    }
}
