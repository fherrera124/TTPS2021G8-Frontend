import { Patient } from "./../../patient/_models/patient.model";
import { BaseModel } from "../../../_metronic/shared/crud-table";
import { ReferringPhysician } from "../../referring_physician/_models/referring-physician.model";
import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { NumericLiteral } from "typescript";
import { SampleClearance } from "../../sample_clearance/_model/sample-clearance.model";

export enum StudyState {
  STATE_ONE = "Esperando comprobante de pago",
  STATE_TWO = "Esperando consentimiento firmado",
  STATE_THREE = "Esperando selección de turno",
  STATE_FOUR = "Esperando toma de muestra",
  STATE_FIVE = "Esperando retiro de muestra",
  STATE_SIX = "Esperando lote de muestra",
  STATE_SEVEN = "Esperando resultado biotecnológico",
  STATE_EIGHT = "Esperando interpretación de resultados e informes",
  STATE_NINE = "Esperando ser entregado a médico derivante",
  STATE_ENDED = "Resultado entregado",
  STATE_ONE_ERROR = "Anulado por falta de pago",
}

export interface TypeStudy {
  id: number;
  name: string;
}

export interface Diagnosis {
  id: number;
  name: string;
}

export class Study implements BaseModel {
  id: number;
  presumptive_diagnosis_id: number;
  patient_id: number;
  referring_physician_id: number;
  type_study_id: number;
  budget: number;
  current_state?: string;

  public static getEmpty(): Study {
    return new Study();
  }

  public prepare(formData: any): Study {
    this.presumptive_diagnosis_id = formData.presumptive_diagnosis.value.id;
    this.patient_id = formData.patient.value.id;
    (this.referring_physician_id = formData.referring_physician.value.id),
      (this.type_study_id = formData.type_study.value.id),
      (this.budget = formData.budget);
    return this;
  }
}

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}
export interface Employee {
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}
export interface State {
  id: number;
  updated_by: User;
  state: string;
  state_entered_date: string;
  state_patient_view: string;
}
export interface AppointmentList {
  date_appointment: string;
  description: string;
}
export interface StudyList {
  id: number;
  referring_physician: ReferringPhysician;
  patient: Patient;
  type_study: TypeStudy;
  presumptive_diagnosis: Diagnosis;
  budget: number;
  report: string;
  current_state: string;
  states: State[];
  employee: Employee;
  appointment: AppointmentList;
  sample: SampleClearance;
  current_state_patient_view: string;
}
