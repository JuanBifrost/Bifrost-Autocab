import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class RunningLateController {
  @Post('runninglate')
  handleArrivedEvent(@Body() payload: any) {
    const bookingId = payload.OriginalBookingId; // Asegúrate de que el campo del booking ID sea correcto en el payload
    console.log(
      `Evento "/runninglate" recibido para el Booking ID: ${bookingId}`,
    );
    console.log(payload);
    return 'Evento "/runninglate" recibido correctamente';
  }
}
