import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('demos')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
