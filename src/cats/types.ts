export class CreateCatDto {
  readonly name: string;
  readonly age: number;
}

export class UpdateCatDto {
  id: string;
}

export class DeleteCatDto {
  id: string;
}

export class ListQuery {
  page: number;
  pageSize: number;
}
export class OneQuery {
  id: string;
}

export interface Cat {
  name: string;
  age: number;
}