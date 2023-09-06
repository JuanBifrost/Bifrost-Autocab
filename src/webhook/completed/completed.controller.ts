import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class CompletedController {
  private lastModifiedId = 0;

  @Post('completed')
  handleModifiedEvent(@Body() payload: any) {
    console.log('Evento "/completed" recibido:', payload);
    return 'Evento "/completed" recibido correctamente';
  }
}
