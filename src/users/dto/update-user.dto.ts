import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  @IsNotEmpty()
  readonly username: string;
}
