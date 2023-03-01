import {
  IsInt,
  IsBoolean,
  IsString,
  MaxLength,
  MinLength, IsUUID,
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
  @IsUUID()
  id: string;
}

export class IdCatDto {
  @IsUUID()
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
