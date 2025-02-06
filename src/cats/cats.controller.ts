import { Controller, Get,Req, Res, Post,Body, Param, HttpCode } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./cats.service";

@Controller('cats')//decorator to define basic controller, with path preficx cats
export class CatsController{
    constructor(private catsService:CatsService){}
    @Get()//create a handler for get request
    //we can pass prefix to send reuqest to a specific path '/cats'
    @HttpCode(200)
    async findAll(){
        //Req decorator allows input from users
        //we also get @Req, @Next, @Param, @Body, @Session, @Query, @Headers, @Ip, @HostParam
        //response.status(200).send('this acton return all cats')
        return this.catsService.findAll()
    }
    //@Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), and @Head().
    // @All() defines an endpoint that handles all of them.
    //Post return 201 rest all return 200 status code
    @Post()
    async create(@Body() createCatDto:CreateCatDto){
        this.catsService.create(createCatDto)
    }
    @Get(":id")
    findOne(@Param('id')id:string){
        return `this action return a #${id} cat`
    }
}
//Param is used to collect /cats/:name
//Query /cats?age=2&breed=Persian