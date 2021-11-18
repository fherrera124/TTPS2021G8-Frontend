import { SampleSelected } from './../../../../../../../.history/src/app/modules/sample_clearance/_model/sample-clearance.model_20211118143701';
import { AuthService } from 'src/app/modules/auth';
import {  Component,  Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as jQuery from 'jquery';
import 'bootstrap-notify';
import { CrudOperation } from 'src/app/modules/shared/utils/crud-operation.model';
import { SampleClearanceService } from '../../../_service';

let $: any = jQuery;
@Component({
    selector: "app-sample-clearance-confirm-modal",
    templateUrl: "./sample-clearance-confirm-modal.html"
  })
 
  export class SampleClearanceConfirmModalComponent {
    constructor(public modal: NgbActiveModal, private sampleClearanceService: SampleClearanceService) 
    {}
    @Input() samplesIds: number[];
    
    process(): void {
        this.sampleClearanceService.registerSampleClearanceAsPay(this.samplesIds).subscribe(
            rpta => this.modal.close({status:CrudOperation.SUCCESS})
        )
    };
       }
    