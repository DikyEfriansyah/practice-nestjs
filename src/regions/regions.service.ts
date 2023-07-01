import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Regions } from 'output/entities/Regions';
import { Repository } from 'typeorm'

@Injectable()
export class RegionsService {
    constructor(
        @InjectRepository(Regions) private RegionsServ: Repository<Regions>
    ) {}

    public async findAll(){
        return await this.RegionsServ.find();
    }
}
