import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class CompletedController {
  private lastModifiedId = 0;

  @Post('modified')
  handleModifiedEvent(@Body() payload: any) {
    console.log('Evento "/cancelled" recibido:', payload);
    return 'Evento "/cancelled" recibido correctamente';
  }
}
