import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class CancelledController {
  private lastModifiedId = 0;

  @Post('cancelled')
  handleModifiedEvent(@Body() payload: any) {
    console.log('Evento "/cancelled" recibido:', payload);
    return 'Evento "/cancelled" recibido correctamente';
  }
}
