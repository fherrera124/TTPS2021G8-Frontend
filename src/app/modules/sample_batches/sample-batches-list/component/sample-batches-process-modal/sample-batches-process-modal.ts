import { Sample } from './../../../_model/sample-batches.model';
import { AuthService } from 'src/app/modules/auth';
import {  Component,  Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as jQuery from 'jquery';
import 'bootstrap-notify';
import { CrudOperation } from 'src/app/modules/shared/utils/crud-operation.model';
import { SampleBatchesService } from '../../../_service';

let $: any = jQuery;
@Component({
    selector: "sample-batches-process-modal",
    templateUrl: "./sample-batches-process-modal.html"
  })
 
  export class SampleBatchesModalProcessComponent implements OnInit {
    constructor(public modal: NgbActiveModal, private sampleBatchesService: SampleBatchesService) 
    {}
  
    @Input() batched_number: number;
    public url:string;
    public samples: Sample[];
    selectedSampleIds: number[];

    ngOnInit(): void {
        this.selectedSampleIds = new Array();
        this.sampleBatchesService.getSampleByBatchesId(this.batched_number).subscribe(
            batche => this.samples = batche.samples
        )
    }

    process(): void {
        this.sampleBatchesService.registerSampleBatcheProcess(this.batched_number,this.selectedSampleIds, this.url).subscribe(
            rpta => this.modal.close({status:CrudOperation.SUCCESS})
        )
};

    changeSelectedSample(e, id) {
        if (e.currentTarget.checked) {
          this.selectedSampleIds.push(id)
        } else {
          this.selectedSampleIds = this.selectedSampleIds.filter(idItem => idItem !== id);
        }
      }
}
    