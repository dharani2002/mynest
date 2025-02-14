import { Controller, Get,Req, Res, Post,Body, Param, HttpCode, HttpException, HttpStatus, ParseIntPipe, UsePipes, DefaultValuePipe, UseInterceptors, UseGuards } from "@nestjs/common";
import { CreateCatDto, createCatSchema } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { ForbiddenException } from "./exceptions/forbidden.exception";
import { ZodValidationPipe } from "./pipes/validation.pipe";
import { Roles } from "./decorator/roles.decorator";
import { LoggingInterceptor } from "./intercetpors/logging.interceptor";
import { RolesGuard } from "./auth/role.guard";
import { TransformInterceptor } from "./intercetpors/transform.intercetpor";
import { TimeoutInterceptor } from "./intercetpors/timeout.interceptor";


@Controller('cats')
//decorator to define basic controller, with path preficx cats
@UseInterceptors(LoggingInterceptor)
export class CatsController{
    constructor(private catsService:CatsService){}
    @Get()//create a handler for get request
    //we can pass prefix to send reuqest to a specific path '/cats'
    @UseInterceptors(TransformInterceptor)
    @UseInterceptors(TimeoutInterceptor)//doesn't work
    @HttpCode(200)
    async findAll(){
        //Req decorator allows input from users
        //we also get @Req, @Next, @Param, @Body, @Session, @Query, @Headers, @Ip, @HostParam
        //response.status(200).send('this acton return all cats')
        try {
            return this.catsService.findAll()
        } catch (error) {
            // throw new HttpException({
            //     status:HttpStatus.FORBIDDEN,
            //     error:"this information is forbidden",
            // },HttpStatus.FORBIDDEN,{
            //     cause:error
            // }
            // );
            throw new ForbiddenException();
        }
    }
    //@Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), and @Head().
    // @All() defines an endpoint that handles all of them.
    //Post return 201 rest all return 200 status code
    @Post()
    @Roles(['admin'])
    @UseGuards(RolesGuard)
    @UsePipes(new ZodValidationPipe(createCatSchema))
    async create(@Body() createCatDto:CreateCatDto){
        this.catsService.create(createCatDto)
    }
    @Get(":id")
    findOne(@Param('id',new DefaultValuePipe(0),ParseIntPipe)id:number){
        return `this action return a #${id} cat`
    }
    
}
//Param is used to collect /cats/:name
//Query /cats?age=2&breed=Persian


// flow
//middleware->guard->interceptor/pipe