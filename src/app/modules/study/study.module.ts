import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg";
import { CRUDTableModule } from "../../_metronic/shared/crud-table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  NgbDatepickerModule,
  NgbModalModule,
} from "@ng-bootstrap/ng-bootstrap";
import { MatTabsModule } from "@angular/material/tabs";
import { EditStudyModalComponent } from "./study-list/components/edit-study-modal/edit-study-modal.component";
import { StudyRoutingModule } from "./study-routing.module";
import { StudyComponent } from "./study.component";
import { StudyListComponent } from "./study-list/study-list.component";
import { SharedModule } from "../shared/shared.module";
import { ConsentUploadModalComponent } from "./study-list/components/consent-upload-modal/consent-upload-modal.component";
import { MatIconModule } from "@angular/material/icon";
import { PaymentUploadModalComponent } from "./study-list/components/payment-upload-modal/payment-upload-modal.component";
import { ShiftReservationModalComponent } from "./study-list/components/shift-reservation-modal/shift-reservation-modal.component";
import { RegisterSampleModalComponent } from "./study-list/components/register-sample-modal/register-sample-modal.component";
import { RegisterSamplePickupModalComponent } from "./study-list/components/register-sample-pickup-modal/register-sample-pickup-modal";
import { RegisterReportModalComponent } from "./study-list/components/register-report-modal/register-report-modal.component";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { ConfirmSendReportModalComponent } from "./study-list/components/confirm-send-report-modal/confirm-send-rerport-modal";
import { DetailStudyModalComponent } from "./study-list/components/detail-study-modal/detail-study-modal.component";
import { StudyDelayedListComponent } from "./study-list/components/study-delayed/study-delayed-list.component";
import { RejectPaymentReceiptModalComponent } from "./study-list/components/reject-payment-receipt-modal/reject-payment-receipt-modal";
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    StudyComponent,
    StudyListComponent,
    EditStudyModalComponent,
    ConsentUploadModalComponent,
    PaymentUploadModalComponent,
    ShiftReservationModalComponent,
    RegisterSampleModalComponent,
    RegisterSamplePickupModalComponent,
    RegisterReportModalComponent,
    ConfirmSendReportModalComponent,
    DetailStudyModalComponent,
    StudyDelayedListComponent,
    RejectPaymentReceiptModalComponent,
  ],
  imports: [
    CommonModule,
    StudyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    SharedModule,
    MatDatepickerModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  entryComponents: [
    EditStudyModalComponent,
    ConsentUploadModalComponent,
    PaymentUploadModalComponent,
    ShiftReservationModalComponent,
    RegisterSampleModalComponent,
    RegisterSamplePickupModalComponent,
    ConfirmSendReportModalComponent,
    DetailStudyModalComponent,
    StudyDelayedListComponent,
    RejectPaymentReceiptModalComponent,
  ],
  exports: [FroalaEditorModule, FroalaViewModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudyModule {}
