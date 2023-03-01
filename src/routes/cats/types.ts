import {
  IsInt,
  IsBoolean,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  readonly name: string;
  @IsInt()
  readonly age: number;
}

export class UpdateCatDto {
  id: string;
}

export class DeleteCatDto {
  id: string;
}

export class ListQueryDto {
  page: number;
  pageSize: number;
}

export interface Cat {
  name: string;
  age: number;
}
