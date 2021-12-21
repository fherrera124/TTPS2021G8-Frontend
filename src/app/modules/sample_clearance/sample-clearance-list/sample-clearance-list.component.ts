import { SampleClearanceService } from '../_service/sample-clearance.service';
// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  GroupingState,
  PaginatorState,
  SortState,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
} from '../../../_metronic/shared/crud-table';

import * as jQuery from 'jquery';
import 'bootstrap-notify';
import { CrudOperation } from '../../shared/utils/crud-operation.model';
import { SampleClearanceConfirmModalComponent } from './components/sample-batches-process-modal/sample-clearance-confirm-modal';
import { SampleClearance } from '../_model/sample-clearance.model';
let $: any = jQuery;
@Component({
  selector: 'app-sample-clearance-list',
  templateUrl: './sample-clearance-list.component.html',
})
export class SampleClearanceListComponent  
  implements
  OnInit,
  AfterViewInit,
  OnDestroy,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
  IFilterView {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  public selectedIds:number[] = [];
  private subscriptions: Subscription[] = [];
  public samplesClearance:SampleClearance[];
  //public sampleBatchesState: typeof SampleBatchesState = SampleBatchesState;
  constructor(
    private fb: FormBuilder,
    public sampleClearanceService: SampleClearanceService,
    private modalService: NgbModal,
  ) { }
  ngAfterViewInit(): void {
    this.sampleClearanceService.items$.subscribe(
      clearance => this.samplesClearance = clearance
    );
  }

  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.sampleClearanceService.fetch();
    
    this.grouping = this.sampleClearanceService.grouping;
    this.paginator = this.sampleClearanceService.paginator;
    this.sorting = this.sampleClearanceService.sorting;
    const sb = this.sampleClearanceService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      status: [''],
      type: [''],
      searchTerm: [''],
    });
    this.subscriptions.push(
      this.filterGroup.controls.status.valueChanges.subscribe(() =>
        this.filter()
      )
    );
    this.subscriptions.push(
      this.filterGroup.controls.type.valueChanges.subscribe(() => this.filter())
    );
  }

  filter() {
    const filter = {};
    const status = this.filterGroup.get('status').value;
    if (status) {
      filter['status'] = status;
    }

    const type = this.filterGroup.get('type').value;
    if (type) {
      filter['type'] = type;
    }
    this.sampleClearanceService.patchState({ filter });
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        /*
      The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
      we are limiting the amount of server requests emitted to a maximum of one every 150ms
      */
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {
    this.sampleClearanceService.patchState({ searchTerm });
  }

  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.sampleClearanceService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.sampleClearanceService.patchState({ paginator });
  }

  process() {
   
    const modalRef = this.modalService.open(SampleClearanceConfirmModalComponent, { size: 'xs' });
    modalRef.componentInstance.samplesIds = this.selectedIds;
    modalRef.result.then((result) =>
      {
        this.sampleClearanceService.fetch();
        if (result.status === CrudOperation.SUCCESS) {
          $.notify({
            title: '<strong>Registro exitoso.</strong>',
            message: 'Se ha procesado correctamente las extraciones como pagas'
          }, {
            type: 'success'
          }),
        () => { }
      }
      }).catch((res) => {});
  }
  
  changeSample(e, id) {
    if (e.currentTarget.checked) {
      this.selectedIds.push(id)
    } else {
      this.selectedIds = this.selectedIds.filter(idItem => idItem !== id);
    }
  }
}
