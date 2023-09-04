import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class ArrivedController {
  @Post('arrived')
  handleArrivedEvent(@Body() payload: any) {
    const bookingId = payload.OriginalBookingId; // Asegúrate de que el campo del booking ID sea correcto en el payload
    console.log(`Evento "/arrived" recibido para el Booking ID: ${bookingId}`);
    console.log(payload);
    return 'Evento "/arrived" recibido correctamente';
  }
}
