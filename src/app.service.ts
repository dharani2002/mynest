import { Injectable } from '@nestjs/common';
//basic service with a single method
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
