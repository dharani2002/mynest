import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';

//root module of the application
@Module({
  imports: [CatsModule,MongooseModule.forRoot('mongodb+srv://dharani:root@cluster0.utegh.mongodb.net/cats')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('cats')
  }
}
//forRoutes({path:"cats",method:RequestMethod.POST})
