import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { User } from "@modules/user/infra/typeorm/entities/User";

@Entity("rooms")
class Room {
  @PrimaryColumn()
  id: string = '';

  @Column()
  name: string = '';

  @Column()
  description: string = '';
  
  @OneToMany(() => User, user => user.id)
  @JoinColumn({ name: 'id' })
  users: User | undefined;

  @OneToMany(() => User, user => user.id)
  @JoinColumn({ name: 'id' })
  usersAdmin: User | undefined;

  @CreateDateColumn()
  created_at: Date = new Date();

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.created_at = new Date();
    }
  }
}

export { Room };