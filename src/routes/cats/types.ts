import { IsInt, IsString, MaxLength, MinLength, IsUUID } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  readonly name: string;
  @IsInt()
  readonly age: number;
}

export class UpdateCatDto extends CreateCatDto {
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
