import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class PobController {
  @Post('POB')
  handlePOBEvent(@Body() payload: any) {
    console.log('Evento "/POB" recibido:', payload);
    return 'Evento "/POB" recibido correctamente';
  }
}
