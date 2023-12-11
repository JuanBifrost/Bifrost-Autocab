import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class CatchallController {
  private lastModifiedId = 0;

  @Post('')
  handleModifiedEvent(@Body() payload: any) {
    console.log('Evento "/" recibido:', payload);
    return 'Evento "" recibido correctamente';
  }
}
