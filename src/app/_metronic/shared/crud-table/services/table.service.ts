// tslint:disable:variable-name
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { PaginatorState } from '../models/paginator.model';
import { ITableState, TableResponseModel } from '../models/table.model';
import { BaseModel } from '../models/base.model';
import { SortState } from '../models/sort.model';
import { GroupingState } from '../models/grouping.model';
import { environment } from '../../../../../environments/environment';
import { baseFilter } from './http-extenstions';

const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined
};

export abstract class TableService<T> {
  // Private fields
  private _items$ = new BehaviorSubject<T[]>([]);
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _isFirstLoading$ = new BehaviorSubject<boolean>(true);
  private _tableState$ = new BehaviorSubject<ITableState>(DEFAULT_STATE);
  private _errorMessage = new Subject<string>();
  private _subscriptions: Subscription[] = [];

  // Getters
  get items$() {
    return this._items$.asObservable();
  }
  get isLoading$() {
    return this._isLoading$.asObservable();
  }
  get isFirstLoading$() {
    return this._isFirstLoading$.asObservable();
  }
  get errorMessage$() {
    return this._errorMessage.asObservable();
  }
  get subscriptions() {
    return this._subscriptions;
  }
  // State getters
  get paginator() {
    return this._tableState$.value.paginator;
  }
  get filter() {
    return this._tableState$.value.filter;
  }
  get sorting() {
    return this._tableState$.value.sorting;
  }
  get searchTerm() {
    return this._tableState$.value.searchTerm;
  }
  get grouping() {
    return this._tableState$.value.grouping;
  }

  protected http: HttpClient;
  // API URL has to be overrided
  API_URL = `${environment.apiUrl}/endpoint`;
  constructor(http: HttpClient) {
    this.http = http;
  }

  // CREATE
  // server should return the object with ID
  create(item: BaseModel): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.post<BaseModel>(this.API_URL, item).pipe(
      catchError(err => {
        this._errorMessage.next(err.error.detail);
        console.error('CREATE ITEM', err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  find(tableState: ITableState): Observable<TableResponseModel<T>> {
    return this.http.get<T[]>(this.API_URL).pipe(
      map((response: T[]) => {
        const filteredResult = baseFilter(response, tableState);
        const result: TableResponseModel<T> = {
          items: filteredResult.items,
          total: filteredResult.total
        };
        return result;
      })
    );
  }

  getItemById(id: number): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}`;
    return this.http.get<BaseModel>(url).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', id, err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // UPDATE
  update(item: BaseModel): Observable<any> {
    const url = `${this.API_URL}/${item.id}`;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.put(url, item).pipe(
      catchError(err => {
        this._errorMessage.next(err.error.detail);
        console.error('UPDATE ITEM', item, err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // DELETE
  delete(id: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('DELETE ITEM', id, err);
        return of({});
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // public fetch() {
  //   this._isLoading$.next(true);
  //   this._errorMessage.next('');
  //   const request = this.find()
  //     .pipe(
  //       tap((res) => {
  //         this._items$.next(res);
  //         this.patchStateWithoutFetch({
  //           paginator: this._tableState$.value.paginator.recalculatePaginator(
  //             res.total
  //           ),
  //         });
  //       }),
  //       catchError((err) => {
  //         this._errorMessage.next(err);
  //         return of({
  //           items: [],
  //           total: 0
  //         });
  //       }),
  //       finalize(() => {
  //         this._isLoading$.next(false);
  //         const itemIds = this._items$.value.map((el: T) => {
  //           const item = (el as unknown) as BaseModel;
  //           return item.id;
  //         });
  //         this.patchStateWithoutFetch({
  //           grouping: this._tableState$.value.grouping.clearRows(itemIds),
  //         });
  //       })
  //     )
  //     .subscribe();
  //   this._subscriptions.push(request);
  // }

  public fetch() {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find(this._tableState$.value)
      .pipe(
        tap((res: TableResponseModel<T>) => {
          this._items$.next(res.items);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              res.total
            ),
          });
        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            items: [],
            total: 0
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._items$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item.id;
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public setDefaults() {
    this.patchStateWithoutFetch({ filter: {} });
    this.patchStateWithoutFetch({ sorting: new SortState() });
    this.patchStateWithoutFetch({ grouping: new GroupingState() });
    this.patchStateWithoutFetch({ searchTerm: '' });
    this.patchStateWithoutFetch({
      paginator: new PaginatorState()
    });
    this._isFirstLoading$.next(true);
    this._isLoading$.next(true);
    this._tableState$.next(DEFAULT_STATE);
    this._errorMessage.next('');
  }

  // Base Methods
  public patchState(patch: Partial<ITableState>) {
    this.patchStateWithoutFetch(patch);
    this.fetch();
  }

  public patchStateWithoutFetch(patch: Partial<ITableState>) {
    const newState = Object.assign(this._tableState$.value, patch);
    this._tableState$.next(newState);
  }
}
