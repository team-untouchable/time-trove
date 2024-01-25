// eslint-disable-next-line import/no-cycle
import { User } from '@src/users';
import { type } from 'node:os';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // eslint-disable-next-line no-import-assign
  @Column('uuid')
  user_id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  place: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  started_at: Date;

  @Column()
  ended_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => User)
  user: User;

  // @ManyToOne(() => Notification, (notification) => notification.events, {
  //   createForeignKeyConstraints: false,
  // })
  // @JoinColumn({
  //   name: 'user_id',
  // })
  // notification: Notification;
}
