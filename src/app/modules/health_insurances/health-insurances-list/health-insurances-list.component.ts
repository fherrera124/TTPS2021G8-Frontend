// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  GroupingState,
  PaginatorState,
  SortState,
  ICreateAction,
  IEditAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
} from '../../../_metronic/shared/crud-table';

import { EditHealthInsurancesModalComponent } from './components/edit-health-insurances-modal/edit-health-insurances-modal.component';
import { HealthInsurancesService } from '../_services';

@Component({
  selector: 'app-health-insurances-list',
  templateUrl: './health-insurances-list.component.html',
})
export class HealthInsurancesListComponent
  implements
  OnInit,
  OnDestroy,
  ICreateAction,
  IEditAction,
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
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public healthInsurancesService: HealthInsurancesService
  ) { }

  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.healthInsurancesService.fetch();
    this.grouping = this.healthInsurancesService.grouping;
    this.paginator = this.healthInsurancesService.paginator;
    this.sorting = this.healthInsurancesService.sorting;
    const sb = this.healthInsurancesService.isLoading$.subscribe(res => this.isLoading = res);
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
    this.healthInsurancesService.patchState({ filter });
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
    this.healthInsurancesService.patchState({ searchTerm });
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
    this.healthInsurancesService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.healthInsurancesService.patchState({ paginator });
  }

  // form actions
  create() {
    this.edit(undefined);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(EditHealthInsurancesModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      this.healthInsurancesService.fetch(),
      () => { }
    );
  }
}
