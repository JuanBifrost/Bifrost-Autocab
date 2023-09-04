import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class VehicleTracksController {
  @Post('vehicletracks')
  handleVehicleTracksEvent(@Body() payload: any) {
    const vehicleId = payload.vehicleId;
    const location = payload.CurrentLocation;
    console.log(
      `Evento "/vehicletracks" recibido para el Vehicle ID: ${vehicleId}`,
    );
    console.log(`Ubicación: ${JSON.stringify(location)}`);
    console.log(payload.CurrentLocation);
    return 'Evento "/vehicletracks" recibido correctamente';
  }
}
