import { BaseModel } from '../../../_metronic/shared/crud-table';

export class Patient implements BaseModel {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  email: string;
  dni: string;
  birth_date: any;
  health_insurance_id: number;
  health_insurance_number: number;
  clinical_history: string;
  password: string;
  first_name_tutor: string;
  last_name_tutor: string;
  address: string;
  phone_number: string;

  public static getEmpty():Patient {
    return new Patient();
  }

  public prepare(formData: any): Patient {
    this.username = formData.username !== undefined ? formData.username : formData.dni;
    this.first_name = formData.first_name;
    this.last_name = formData.last_name;
    this.email = formData.email
    this.dni = formData.dni;
    this.birth_date = formData.birth_date.year + "-" + formData.birth_date.month + "-" + formData.birth_date.day;
    this.health_insurance_number = formData.health_insurance_number !== null && formData.health_insurance_number !== undefined && formData.health_insurance_number !== "" ? Number(formData.health_insurance_number) : 0;
    this.health_insurance_id = formData.health_insurance_id !== null && formData.health_insurance_id !== undefined && formData.health_insurance_id !== "" ? formData.health_insurance_id.value.id : null;
    this.clinical_history = formData.clinical_history !== null && formData.clinical_history !== undefined ? formData.clinical_history : "";
    this.first_name_tutor = formData.first_name_tutor
    this.last_name_tutor = formData.last_name_tutor
    this.address = formData.address !== null && formData.address !== undefined ? formData.address : '';
    this.phone_number = formData.phone_number !== null && formData.phone_number !== undefined ? formData.phone_number : '';
    this.password = "asd";

    return this;
  }
}

export interface HealthInsurance {
  id: number,
  name: string
}
