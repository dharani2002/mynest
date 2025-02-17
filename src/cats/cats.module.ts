import { Module } from "@nestjs/common"
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Cat, CatSchema } from "./schema/cat.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:Cat.name,schema:CatSchema}])],
    controllers:[CatsController],
    providers:[CatsService],
    exports:[CatsService]
})

export class CatsModule{}

/*
*
* providers: [
*   {
*     provide: CatsService,
*     useClass: CatsService,
*   },
* ];
* is the explicit constrcution where we can see token CatsService is associated with class CatsService
*/

/*
* provider can be asynchronous too.
* 
{
  provide: 'ASYNC_CONNECTION',
  useFactory: async () => {
    const connection = await createConnection(options);
    return connection;
  },
}
*/