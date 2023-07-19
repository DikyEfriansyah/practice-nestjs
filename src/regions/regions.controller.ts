import { Body, Controller, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('regions')
export class RegionsController {
    constructor(private Service : RegionsService) {}

    @Get()
    public async getAll(){
        return await this.Service.findAll();
    }

    @Get(':ids')
    public async getById(@Param('ids') ids : number){
        return  this.Service.getOne(ids)
    }

    @Post()
    public async postData(@Body('name') name: string){
        return await this.Service.insert(name);
    }

    @Put(':id')
    public async updateData(@Body('name') name : string, @Param('id') id : number){
        return await this.Service.update(id, name);
    }

    @Delete(':id')
    public async deleteData(@Param('id') id: number){
        return await this.Service.delete(id)
    }

    @Post('uploads')
    @UseInterceptors(FileInterceptor('file'))
    public async upload(@UploadedFile() file, @Body('name') name: string){
        return this.Service.upload(file, name);
    }

}
