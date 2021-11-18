import { AuthService } from 'src/app/modules/auth';
// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as jQuery from 'jquery';
import 'bootstrap-notify';
import { GroupingState, IFilterView, IGroupingView, ISearchView, ISortView, PaginatorState, SortState } from 'src/app/_metronic/shared/crud-table';
import { StudyList, StudyState } from '../../../_models/study.model';
import { StudyDelayedListService, StudyListService } from '../../../_services/study.service';
import { DetailStudyModalComponent } from '../detail-study-modal/detail-study-modal.component';

let $: any = jQuery;
@Component({
  selector: 'app-study-delayed-list',
  templateUrl: './study-delayed-list.component.html',
})
export class StudyDelayedListComponent
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
  public userRol:string;
  private subscriptions: Subscription[] = [];
  public studyState: typeof StudyState = StudyState;
  public filterState:string="Seleccione un estado";
  public isSearchingByState = false;
  public searchData:string="";
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public studyDelayedListService: StudyDelayedListService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRol = this.authService.getAuthFromLocalStorage().role;
    this.filterForm();
    this.searchForm();
    this.studyDelayedListService.fetch();
    this.grouping = this.studyDelayedListService.grouping;
    this.paginator = this.studyDelayedListService.paginator;
    this.sorting = this.studyDelayedListService.sorting;
    const sb = this.studyDelayedListService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb);
    
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      status: [''],
      type: [''],
      searchTerm: ['']
     

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
    this.studyDelayedListService.patchState({ filter });
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
      .subscribe((val) => {
        this.searchData = val;
      this.search(val)});
    this.subscriptions.push(searchEvent);
  }
  filterStatus(){
    if(this.filterState !== 'Seleccione un estado') {
        this.search(this.filterState);
        this.isSearchingByState = true
    }   
    else {
      this.search('');
      this.isSearchingByState = false;
    }
  }

  search(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();
    this.studyDelayedListService.patchState({ searchTerm });
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
    this.studyDelayedListService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.studyDelayedListService.patchState({ paginator });
  }

 

  detail(study: StudyList) {
    const modalRef = this.modalService.open(DetailStudyModalComponent
      , { size: 'xl',keyboard: false});
    modalRef.componentInstance.study = study;
  }

 
}
