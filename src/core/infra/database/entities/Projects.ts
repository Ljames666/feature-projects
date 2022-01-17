import { IProject } from "./../../../../features/project/domain/model/project";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Project implements IProject {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({
    length: 30,
  })
  name: string;

  @Column({
    length: 300,
    nullable: true,
  })
  description?: string;

  @Column({
    nullable: true,
  })
  startDate?: Date;

  @Column({
    nullable: true,
  })
  endDate?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.nome, {
    // eager: true,
  })
  user?: string;
}
