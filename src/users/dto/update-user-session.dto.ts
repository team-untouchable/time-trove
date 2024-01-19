import { IsJWT, IsOptional, IsUUID } from 'class-validator';

export class UpdateUserSessionDto {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsJWT()
  readonly token: string;
}
