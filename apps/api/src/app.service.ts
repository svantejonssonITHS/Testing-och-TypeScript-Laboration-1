import { Injectable } from '@nestjs/common';

const pucko = 'barn';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
