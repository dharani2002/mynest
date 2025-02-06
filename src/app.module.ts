import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';

//root module of the application
@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(LoggerMiddleware)
    .forRoutes({path:'cats',method:RequestMethod.GET})
  }
}
