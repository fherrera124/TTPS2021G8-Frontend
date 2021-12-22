import { AuthService } from "src/app/modules/auth";
import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as jQuery from "jquery";
import "bootstrap-notify";
import { CrudOperation } from "src/app/modules/shared/utils/crud-operation.model";
import { StudyService } from "../../../_services/study.service";

let $: any = jQuery;
@Component({
  selector: "app-reject-payment-receipt-modal",
  templateUrl: "./reject-payment-receipt-modal.html",
})
export class RejectPaymentReceiptModalComponent {
  constructor(
    public modal: NgbActiveModal,
    private studyService: StudyService
  ) {}
  @Input() idStudy: number;

  send(): void {
    this.studyService
      .rejectPaymentReceipt(this.idStudy)
      .subscribe((rpta) => this.modal.close({ status: CrudOperation.SUCCESS }));
  }
}
