export interface SearchDTO { }

export class IFilterDTO {
  Id: any;
  Page: number;
  PageSize: number;
  Sort: string;
  FilterText: string;
}

export class FilterDTO {
  Id: any;
  Page: number;
  PageSize: number;
  Sort: string;
  FilterText: string;
}

export interface IDto {
  Id: any;
  getDescription(): string;
}

export interface Data {
  isReadOnly: boolean;
  id: number;
}

export abstract class ADto implements IDto {
  abstract getDescription(): string;
  Id: any;
  constructor(data?: any) {

    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export abstract class Dto<T> extends ADto {
  abstract getDescription(): string;
  Id: T;
  Description: string;

  constructor(data?: any) {
    super(data);
  }
}

export class ItemDto extends Dto<number> {
  getDescription(): string {
    return this.Description;
  }

  Id: number;
  Description: string;
  IsSelected: boolean;
  animate: boolean;

  constructor(data?: any) {
    super(data);
    this.animate = false;
  }
}

export class GroupItemDto extends Dto<number> {
  getDescription(): string {
    return this.Description;
  }

  Id: number;
  Description: string;
  Items: ItemDto[];

  constructor(data?: any) {
    super(data);
    this.Items = [];
  }
}

export class PagedListResultDto<T>  {
  Items: T[];
  TotalCount: number;
}

export class PagedRequestDto {
  TotalCount: number;
}

export class ResponseModel<T>
{
  Messages: string[] = [];
  //TODO: poner en enum
  //status: Result;
  Status: StatusResponse;
  DataObject: T;
}

export class UserFilter extends FilterDTO {
}

export enum Result {
  Ok,
  Default
}

export enum ViewMode {
  Undefined,
  Add,
  Modify,
  Delete,
  List,
  View
}

export enum StatusResponse {
  Ok = "Ok",
  Fail = "Fail",
  Other = "Other"
}
