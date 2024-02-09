import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  place: string;

  description: string;

  @IsNotEmpty()
  started_at: Date;

  @IsNotEmpty()
  ended_at: Date;
}
