import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateEventDto {
  title: string;

  place: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  started_at: Date;

  @IsNotEmpty()
  ended_at: Date;
}
