import { AuthService } from 'src/app/modules/auth';
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

import { EditStudyModalComponent } from './components/edit-study-modal/edit-study-modal.component';
import { StudyListService, StudyService } from '../_services/study.service';
import { StudyList, StudyState } from '../_models/study.model';
import { ConsentUploadModalComponent } from './components/consent-upload-modal/consent-upload-modal.component';
import * as jQuery from 'jquery';
import 'bootstrap-notify';
import { CrudOperation } from '../../shared/utils/crud-operation.model';
import { PaymentUploadModalComponent } from './components/payment-upload-modal/payment-upload-modal.component';
import { ShiftReservationModalComponent } from './components/shift-reservation-modal/shift-reservation-modal.component';
import { RegisterSamplePickupModalComponent } from './components/register-sample-pickup-modal/register-sample-pickup-modal';
import { RegisterReportModalComponent } from './components/register-report-modal/register-report-modal.component';
import { RegisterSampleModalComponent } from './components/register-sample-modal/register-sample-modal.component';
import { ConfirmSendReportModalComponent } from './components/confirm-send-report-modal/confirm-send-rerport-modal';
import { DetailStudyModalComponent } from './components/detail-study-modal/detail-study-modal.component';
let $: any = jQuery;
@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
})
export class StudyListComponent
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
  public userRol:string;
  private subscriptions: Subscription[] = [];
  public studyState: typeof StudyState = StudyState;
  public filterState:string="Seleccione un estado";
  public isSearchingByState = false;
  public searchData:string="";
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public studyListService: StudyListService,
    public studyService: StudyService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRol = this.authService.getAuthFromLocalStorage().role;
    this.filterForm();
    this.searchForm();
    this.studyListService.fetch();
    this.grouping = this.studyListService.grouping;
    this.paginator = this.studyListService.paginator;
    this.sorting = this.studyListService.sorting;
    const sb = this.studyListService.isLoading$.subscribe(res => this.isLoading = res);
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
    this.studyListService.patchState({ filter });
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
    this.studyListService.patchState({ searchTerm });
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
    this.studyListService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.studyListService.patchState({ paginator });
  }

  // form actions
  create() {
    this.edit(undefined);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(EditStudyModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) =>
      {
        this.studyListService.fetch();
        if (result.status === CrudOperation.SUCCESS) {
          $.notify({
            title: '<strong>Registro exitoso.</strong>',
            message: 'Estudio registrado. Correo electrónico enviado con el presupuesto.'
          }, {
            type: 'success'
          }),
        () => { }
      }
      }).catch((res) => {});;
  }

  uploadConsent(idStudy: number) {
    const modalRef = this.modalService.open(ConsentUploadModalComponent, { size: 'xl',keyboard: false});
    modalRef.componentInstance.idStudy = idStudy;
    modalRef.result.then((result) =>
      {
        if (result.status === CrudOperation.SUCCESS) {
          setTimeout(()=>{this.studyListService.fetch()}, 3000);
          $.notify({
            title: '<strong>Registro exitoso.</strong>',
            message: 'Se ha registrado correctamente el consentimiento firmado'
          }, {
            type: 'success'
          }),
        () => { }
      }
      }).catch((res) => {});
  }

  uploadPaymentReceipt(idStudy: number) {
    const modalRef = this.modalService.open(PaymentUploadModalComponent, { size: 'xl',keyboard: false});
    modalRef.componentInstance.idStudy = idStudy;
    modalRef.result.then((result) => {
        this.studyListService.fetch()}
        ,
        () => { }
      ).catch((res) => {});
  }
  
  showShiftReservation(idStudy: number) {
    const modalRef = this.modalService.open(ShiftReservationModalComponent, { size: 'xl',keyboard: false});
    modalRef.componentInstance.idStudy = idStudy;
    modalRef.result.then((result) =>{
        this.studyListService.fetch();
        if (result.status === CrudOperation.SUCCESS) {
          $.notify({
            title: '<strong>Registro exitoso.</strong>',
            message: 'Se ha registrado el turno'
          }, {
            type: 'success'
          }),
        () => { }
      }
    },
        () => { }
      ).catch((res) => {});
  }
  
  registerSample(idStudy: number) {
    const modalRef = this.modalService.open(RegisterSampleModalComponent, { size: 'xl',keyboard: false});
    modalRef.componentInstance.idStudy = idStudy;
    modalRef.result.then((result) =>{
        this.studyListService.fetch();
        if (result.status === CrudOperation.SUCCESS) {
          $.notify({
            title: '<strong>Registro exitoso.</strong>',
            message: 'Se ha registrado una muestra exitosamente'
          }, {
            type: 'success'
          }),
        () => { }
      }
    },
        () => { }
      ).catch((res) => {});
  }
  registerReport (idStudy: number) {
    const modalRef = this.modalService.open(RegisterReportModalComponent
      , { size: 'xl',keyboard: false});
    modalRef.componentInstance.idStudy = idStudy;
    modalRef.result.then((result) =>{
        this.studyListService.fetch();
        if (result.status === CrudOperation.SUCCESS) {
          $.notify({
            title: '<strong>Registro exitoso.</strong>',
            message: 'Se ha registrado el reporte exitosamente'
          }, {
            type: 'success'
          }),
        () => { }
      }
    },
        () => { }
      ).catch((res) => {});
  }

  detail(study: StudyList) {
    const modalRef = this.modalService.open(DetailStudyModalComponent
      , { size: 'xl',keyboard: false});
    modalRef.componentInstance.study = study;
  }

  registerSamplePickup(idStudy: number) {
    const modalRef = this.modalService.open(RegisterSamplePickupModalComponent
      , { size: 'xl',keyboard: false});
    modalRef.componentInstance.idStudy = idStudy;
    modalRef.result.then((result) =>{
        this.studyListService.fetch();
        if (result.status === CrudOperation.SUCCESS) {
          $.notify({
            title: '<strong>Registro exitoso.</strong>',
            message: 'Se ha registrado el retiro de la muestra exitosamente'
          }, {
            type: 'success'
          }),
        () => { }
      }
    },
        () => { }
      ).catch((res) => {});
  }
  
  confirmSendReport(idStudy: number) {
    const modalRef = this.modalService.open(ConfirmSendReportModalComponent
      , { size: 'xs',keyboard: false});
    modalRef.componentInstance.idStudy = idStudy;
    modalRef.result.then((result) =>{
        this.studyListService.fetch();
        if (result.status === CrudOperation.SUCCESS) {
          $.notify({
            title: '<strong>Registro exitoso.</strong>',
            message: 'Se ha registrado ha enviado el reporte exitosamente'
          }, {
            type: 'success'
          }),
        () => { }
      }
    },
        () => { }
      ).catch((res) => {});
  }

  downloadBudget(idStudy: number) {
      this.studyService.downloadBudget(idStudy).subscribe(blobConsent => {
      const fileURL = URL.createObjectURL(blobConsent);
      window.open(fileURL, '_blank');
      });
  }

}
