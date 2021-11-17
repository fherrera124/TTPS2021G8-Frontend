import { BaseModel } from '../../../_metronic/shared/crud-table';

export class Employee implements BaseModel {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  password: string;
  retrypassword: string;

  public static getEmpty():Employee {
    return new Employee();
  }

  public prepare(formData: any): Employee {
    this.username = formData.username;
    this.first_name = formData.first_name;
    this.last_name = formData.last_name;
    this.password = formData.password;
    this.retrypassword = formData.retrypassword;
    return this;
  }
}
