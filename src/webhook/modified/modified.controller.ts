import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class ModifiedController {
  private lastModifiedId = 0;

  @Post('modified')
  handleModifiedEvent(@Body() payload: any) {
    console.log('Evento "/modified" recibido:', payload);
    return 'Evento "/modified" recibido correctamente';
  }
}
