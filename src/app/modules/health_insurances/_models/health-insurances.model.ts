import { BaseModel } from '../../../_metronic/shared/crud-table';

export class HealthInsurances implements BaseModel {
  id: number;
  name: string;
  email: string;
  telephone: string;

  public static getEmpty():HealthInsurances {
    return new HealthInsurances();
  }

  public prepare(formData: any): HealthInsurances {
    this.name = formData.name;
    this.email = formData.email
    this.telephone = formData.telephone;
    return this;
  }
}

export interface HealthInsurance {
  id: number,
  name: string
}
