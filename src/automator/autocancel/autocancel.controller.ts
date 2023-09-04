import { Controller } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import ApiService from './autocancel.service';

@Controller()
export class CronController {
  constructor(private readonly apiService: ApiService) {}

  @Cron('0 */1 * * * *') // Ejecuta el método cada 5 minutos
  async handleCron() {
    const data = await this.apiService.getData_v1();
    if (data) {
      console.log(data);
      await this.apiService.deleteData_v1(data);
      return;
      /* const data = await this.apiService.postData();
      if (data) {
        console.log(data);
        await this.apiService.deleteData(data);
        return; */
    }
  }
}
