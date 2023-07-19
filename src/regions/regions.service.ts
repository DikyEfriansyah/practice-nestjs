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
        return await this.RegionsServ.find({
            relations : {
                countries : true
            }
        });
    }

    public async getOne(ids : number){
        return await this.RegionsServ.findOne({where : {regionId : ids}});
    }

    public async insert(name : string){
        try{
            const region = await this.RegionsServ.save({
                regionName : name
            })
            return region;
        }catch(error){
            return error.message;
        }
    }

    public async update(id: number, name: string){
        try{
            const region = await this.RegionsServ.update(id, {
                regionName : name
            })

            return region;
        }catch(error){
            return error.message;
        }
    }

    public async delete (id: number){
        return await this.RegionsServ.delete(id);
    }

    public async upload(file, name: string){
        try {
            const region = await this.RegionsServ.save({
                regionName : name,
                photo : file.originalname
            });
            return region;
        } catch (error) {
            return error.message;
        }
    }
}
