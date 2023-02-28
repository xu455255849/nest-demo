export class CreateCatDto {
  readonly name: string;
  readonly age: number;
}


export class ListAllEntities {
  page: number;
  pageSize: number;
}