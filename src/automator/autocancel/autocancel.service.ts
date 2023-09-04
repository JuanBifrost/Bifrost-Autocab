import { Injectable } from '@nestjs/common';
import axios from 'axios';
import moment from 'moment';

const API_URL =
  'https://ghost-main-static-c18cc7d1e62e4c62a7d49d420c4a6e99.ghostapi.app:29003/api/v1';

@Injectable()
export default class ApiService {
  // Metodo de Web API / Ghost - METODO - POST
  async getToken(): Promise<any> {
    const body = {
      username: 'automator',
      password: 'Autocabad1*',
    };

    const response = await axios.post(`${API_URL}/authenticate`, body);
    return response.data;
  }
  // Metodo de Web API / Ghost - METODO - GET
  async getData_v1(): Promise<any> {
    const token = await this.getToken();
    const headers = {
      'Authentication-Token': token.secret,
    };
    const response = await axios.get(`${API_URL}/bookings/active`, { headers });
    console.log(response.data);
    return response.data;
  }

  // Cancelacion de reservas por Web API / Ghost - METODO - DELETE
  async deleteData_v1(bookings: any[]): Promise<void> {
    const token = await this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      'Authentication-Token': token.secret,
    };
    await Promise.all(
      bookings.map(async (booking) => {
        // Set the reference datetime
        const referenceDatetime = moment(booking.bookedAtTime);
        // Get the current datetime
        const currentDatetime = moment();
        // Calculate the time difference between the reference datetime and the current datetime
        const timeDifference = moment.duration(
          currentDatetime.diff(referenceDatetime),
        );
        // Check if more than 5 minutes have passed
        if (timeDifference.asMinutes() >= 5) {
          try {
            await axios.delete(`${API_URL}/bookings/${booking.id}`, {
              headers,
            });
          } catch (err) {
            console.log(err);
          }
          console.log('Voy a Borrar el ID: ', booking.id);
        } else {
          console.log('NO eliminar!');
        }
      }),
    );
  }
  async postData(): Promise<any> {
    const body = {
      types: ['Active'],
    };
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': '5018266f057b4ce093e247b73944350a',
    };
    const response = await axios.post(
      'https://autocab-api.azure-api.net/booking/v1/1.2/search',
      body,
      {
        headers,
      },
    );
    console.log(response.data.bookings.bookedAtTime);
    return response.data.bookings;
  }
  async deleteData(bookings: any[]): Promise<void> {
    const headers = {
      'Ocp-Apim-Subscription-Key': '5018266f057b4ce093e247b73944350a',
    };

    await Promise.all(
      bookings.map(async (booking) => {
        // Set the reference datetime
        const referenceDatetime = moment(booking.bookedAtTime);

        // Get the current datetime
        const currentDatetime = moment();

        // Calculate the time difference between the reference datetime and the current datetime
        const timeDifference = moment.duration(
          currentDatetime.diff(referenceDatetime),
        );

        // Check if more than 5 minutes have passed
        if (timeDifference.asMinutes() >= 1) {
          try {
            await axios.delete(
              `https://autocab-api.azure-api.net/booking/v1/booking/${booking.id}`,
              {
                headers,
              },
            );
          } catch (err) {
            console.log(err);
          }
          console.log('Voy a Borrar el ID: ', booking.id);
        } else {
          console.log('NO eliminar!');
        }
      }),
    );
  }
}
