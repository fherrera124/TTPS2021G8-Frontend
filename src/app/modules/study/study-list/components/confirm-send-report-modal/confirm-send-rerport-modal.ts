import { AuthService } from 'src/app/modules/auth';
import {  Component,  Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as jQuery from 'jquery';
import 'bootstrap-notify';
import { CrudOperation } from 'src/app/modules/shared/utils/crud-operation.model';
import { StudyService } from '../../../_services/study.service';

let $: any = jQuery;
@Component({
    selector: "app-confirm-send-rerport-modal",
    templateUrl: "./confirm-send-rerport-modal.html"
  })
 
  export class ConfirmSendReportModalComponent {
    constructor(public modal: NgbActiveModal, private studyService: StudyService) 
    {}
    @Input() idStudy: number;
    
    send(): void {
        this.studyService.sendReport(this.idStudy).subscribe(
            rpta => this.modal.close({status:CrudOperation.SUCCESS})
        )
    };I
       }
    