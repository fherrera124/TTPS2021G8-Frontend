import { AuthService } from 'src/app/modules/auth';
import {  Component,  Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as jQuery from 'jquery';
import 'bootstrap-notify';
import { CrudOperation } from 'src/app/modules/shared/utils/crud-operation.model';
import { StudyService } from '../../../_services/study.service';

let $: any = jQuery;
@Component({
    selector: 'app-confirm-cancel-payment-modal',
    templateUrl: './confirm-cancel-payment-modal.html'
  })
 
  export class ConfirmCancelPaymentModalComponent {
    constructor(public modal: NgbActiveModal, private studyService: StudyService) 
    {}
    @Input() idStudy: number;

    cancel(): void {
        this.studyService.cancelPaymentReceipt(this.idStudy).subscribe(
            rpta => this.modal.close({status: CrudOperation.SUCCESS})
        );
        }
       }
