// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ReferringPhysicianService } from '../_services';
import { EditReferringPhysicianModalComponent } from './components/edit-referring-physician-modal/edit-referring-physician-modal.component';
let $: any = jQuery;
@Component({
  selector: 'app-referring-physician-list',
  templateUrl: './referring-physician-list.component.html',
})
export class ReferringPhysicianListComponent
  implements
  OnInit,
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
  //public sampleBatchesState: typeof SampleBatchesState = SampleBatchesState;
  constructor(
    private fb: FormBuilder,
    public referringPhysicianService: ReferringPhysicianService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.referringPhysicianService.fetch();
    this.grouping = this.referringPhysicianService.grouping;
    this.paginator = this.referringPhysicianService.paginator;
    this.sorting = this.referringPhysicianService.sorting;
    const sb = this.referringPhysicianService.isLoading$.subscribe(res => this.isLoading = res);
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
    this.referringPhysicianService.patchState({ filter });
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
    this.referringPhysicianService.patchState({ searchTerm });
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
    this.referringPhysicianService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.referringPhysicianService.patchState({ paginator });
  }

  
  create() {
    this.edit(undefined);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(EditReferringPhysicianModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) =>
    {
      this.referringPhysicianService.fetch();
      if (result.status === CrudOperation.SUCCESS) {
        $.notify({
          title: '<strong>Registro exitoso.</strong>',
          message: 'Se ha registrado los datos del médico derivante exitosamente'
        }, {
          type: 'success'
        }),
      () => { }
      }  
    },
      () => { }
    );
  }
}
