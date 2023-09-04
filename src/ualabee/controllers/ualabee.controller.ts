import { Controller, Post, Body } from '@nestjs/common';
import { UalabeeService } from '../services/ualabee.service';

@Controller('ualabee')
export class UalabeeController {
  constructor(private readonly ualabeeService: UalabeeService) {}

  @Post('validate')
  async validateUser(@Body('searchfilter') searchfilter: string) {
    // Obtener los tokens
    const ghostToken = await this.ualabeeService.getTokenGhost();
    const capToken = await this.ualabeeService.getTokenCAP();

    // Obtener el ID del pasajero
    const passengerId = await this.ualabeeService.getPassengerId(
      searchfilter,
      ghostToken,
    );

    // Obtener la información de la persona
    const personDetails = await this.ualabeeService.getPersonDetails(
      capToken,
      passengerId,
    );

    // Extrae el departmentId de los detalles de la persona
    const departmentId = personDetails.departmentId;

    // Llamada a getDepartment
    const departmentDetails = await this.ualabeeService.getDepartment(
      capToken,
      departmentId,
    );

    // Devolver la información de la persona
    return {
      personDetails,
      departmentDetails,
    };
  }
}
