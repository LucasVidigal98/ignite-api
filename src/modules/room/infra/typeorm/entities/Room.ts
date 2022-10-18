import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

import { User } from "@modules/user/infra/typeorm/entities/User";

@Entity("rooms")
class Room {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;
  
  @OneToOne(() => User)
  @JoinColumn({ name: 'users' })
  users!: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'users_admin' })
  usersAdmin!: User;

  @CreateDateColumn()
  created_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.created_at = new Date();
    }
  }
}

export { Room };