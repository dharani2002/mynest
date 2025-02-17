import { Injectable } from "@nestjs/common";
import { Cat } from "./schema/cat.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCatDto } from "./dto/create-cat.dto";

// export interface Cat{
//     name:string;
//     age:number;
//     breed:string
// }

@Injectable()
export class CatsService{
    //private readonly cats:Cat[]=[]
    constructor(@InjectModel(Cat.name) private catModel:Model<Cat>){}

    async create(createCatDto:CreateCatDto):Promise<Cat>{
        const existedCat= await this.catModel.findOne({
            name:createCatDto.name
        })
        if(existedCat){
            throw new Error("Cat already exists")
        }
        const createdCat=new this.catModel(createCatDto)
        return createdCat.save()
    }

    async findAll():Promise<Cat[]>{
        return this.catModel.find().exec()
    }
    
}