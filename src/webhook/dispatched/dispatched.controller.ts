import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DateTime } from 'luxon';

@Controller('webhook')
export class DispatchedController {
  constructor(private httpService: HttpService) {}

  @Post('dispatched')
  async handleDispatchedEvent(@Body() payload: any) {
    console.log('Evento "/dispatched" recibido:', payload);
    const phoneNumber = payload.TelephoneNumber;

    const now = DateTime.now().setZone('America/Bogota');
    const from = now.minus({ days: 1 }).startOf('day').toISO();
    const to = now.plus({ days: 3 }).startOf('day').toISO();

    const searchRequestBody = {
      from,
      to,
      telephoneNumber: phoneNumber,
      companyIds: [],
      capabilities: [],
      capabilityMatchType: 'Any',
      exactMatch: false,
      ignorePostcode: true,
      ignoreTown: true,
      types: ['Mobile'],
    };

    const response: any = await this.createSearch(searchRequestBody);

    if (response.error) {
      throw new BadRequestException(response.error);
    }

    if (Array.isArray(response.data)) {
      response.data.forEach((booking: any) => {
        booking.pickupDueTime = DateTime.fromISO(booking.pickupDueTime)
          .setZone('America/Bogota')
          .toISO();
        booking.pickupDueTimeUtc = DateTime.fromISO(booking.pickupDueTimeUtc)
          .setZone('America/Bogota')
          .toISO();
      });
    }

    console.log('Código de respuesta exitosa:', response.data);
    console.log('Código de respuesta exitosa:', JSON.stringify(response.data));

    if (Array.isArray(response.data.extraPassengerDetails)) {
      response.data.extraPassengerDetails.forEach((d: any) => console.log(d));
      console.log(
        'Contenido de extraPassengerDetails:',
        JSON.stringify(response.data.extraPassengerDetails),
      );
    }
    return response.data;
  }

  async createSearch(searchRequestBody: any) {
    try {
      console.log(
        '========================== ¡Qué ha pasado! ==========================',
        searchRequestBody,
      );
      const searchEndpoint =
        'https://autocab-api.azure-api.net/booking/v1/1.2/search';
      const subscriptionKey = '17bc03df542246a4b6e8c6754e906623';

      await new Promise((resolve) => setTimeout(resolve, 10000));

      const axiosResponse = await this.httpService
        .post(searchEndpoint, searchRequestBody, {
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
          },
        })
        .toPromise();

      return {
        error: '',
        data: axiosResponse.data,
      };
    } catch (error) {
      console.error(error);
      return { error: `Error en la petición POST: ${error.message}`, data: '' };
    }
  }
}
