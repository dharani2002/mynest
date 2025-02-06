import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//entry file of the application that uses NestFactory to cereate nest application instance
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{abortOnError:false});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//nestFactory is a cors class that provdes static fnctions like create()
//we simply start our server here i port 3000
//we can mention create<NestExpressAplication> to avoid implicit any