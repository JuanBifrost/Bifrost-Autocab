import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UalabeeService {
  constructor(private readonly httpService: HttpService) {}

  async getTokenGhost() {
    const requestBody = {
      username: 'automator',
      password: 'Autocabad1*',
    };

    try {
      console.log(
        'Enviando solicitud para obtener el token Ghost...PRODUCCION',
      );
      const response = await this.httpService
        .post(
          'https://app-30aedadca5434641afa97e56c141f06d.ghostapi.app:29003/api/v1/authenticate',
          requestBody,
        )
        .toPromise();

      const ghostToken = response.data.secret; // Asegúrate de ajustar el nombre del campo de acuerdo a la respuesta real
      console.log('Token Ghost obtenido:', ghostToken);
      return ghostToken;
    } catch (error) {
      console.error('Error al obtener el token Ghost:', error);
      throw error;
    }
  }

  async getTokenCAP() {
    const requestBody = {
      cabExchangeAgentId: '32204',
      username: 'maruizpa@proton.me',
      password: 'Aq12wsxcz**/',
    };

    try {
      console.log('Enviando solicitud para obtener el token CAP...PRODUCCION');
      const response = await this.httpService
        .post('https://capapi.autocab.net/api/authenticate', requestBody)
        .toPromise();

      const capToken = response.data.token; // Asegúrate de ajustar el nombre del campo de acuerdo a la respuesta real
      console.log('Token CAP obtenido - PRODUCCION:', capToken);
      return capToken;
    } catch (error) {
      console.error('Error al obtener el token CAP:', error);
      throw error;
    }
  }

  async getPassengerId(searchfilter: string, ghostToken: string) {
    const headers = {
      'Authentication-Token': ghostToken,
    };

    try {
      console.log(
        'Enviando solicitud para obtener el ID del pasajero desde Ghost...',
      );
      const response = await this.httpService
        .get(
          `https://app-30aedadca5434641afa97e56c141f06d.ghostapi.app:29003/api/v1/corporateaccounts/17/getpassengers?searchfilter=${searchfilter}&pagesize=10&lookup=false`,
          { headers },
        )
        .toPromise();

      const passengerArray = response.data as Array<any>;
      if (passengerArray.length > 0) {
        const passengerId = passengerArray[0].id; // Accedemos al primer objeto del arreglo
        console.log('ID del pasajero obtenido desde Ghost:', passengerId);
        return passengerId;
      } else {
        console.error('No se encontraron pasajeros en la respuesta de Ghost.');
        return null; // O puedes manejar esta situación de acuerdo a tus necesidades.
      }
    } catch (error) {
      console.error('Error al obtener el ID del pasajero desde Ghost:', error);
      throw error;
    }
  }

  async getPersonDetails(capToken: string, passengerId: string) {
    const headers = {
      Authorization: `Bearer ${capToken}`,
    };

    try {
      console.log(
        'Enviando solicitud para obtener los detalles de la persona desde CAP...',
      );
      const response = await this.httpService
        .get(`https://capapi.autocab.net/api/persons/${passengerId}`, {
          headers,
        })
        .toPromise();

      console.log('Detalles de la persona obtenidos desde CAP:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener los detalles de la persona desde CAP:',
        error,
      );
      throw error;
    }
  }

  async getDepartment(capToken: string, departmentId: number) {
    const headers = {
      Authorization: `Bearer ${capToken}`,
    };

    try {
      console.log(
        'Enviando solicitud para obtener el departamento desde CAP...',
      );
      const response = await this.httpService
        .get(`https://capapi.autocab.net/api/departments/${departmentId}`, {
          headers,
        })
        .toPromise();

      console.log(
        'Detalles del departamento obtenidos desde CAP:',
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener los detalles del departamento desde CAP:',
        error,
      );
      throw error;
    }
  }

  async getCustomAddresses(ghostToken: string) {
    const headers = {
      'Authentication-Token': ghostToken,
    };

    try {
      console.log(
        'Enviando solicitud para obtener Custom Addresses desde Ghost...',
      );
      const response = await this.httpService
        .get(
          'https://ghost-main-static-4466116591644d61aca9e493190e3297.ghostapi.app:29003/api/ghostcompanion/v1/customaddresses',
          { headers },
        )
        .toPromise();

      console.log('Custom Addresses obtenidos desde Ghost:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener Custom Addresses desde Ghost:', error);
      throw error;
    }
  }
}
