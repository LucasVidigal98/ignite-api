import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { User } from "@modules/user/infra/typeorm/entities/User";
import { Room } from "./Room";

@Entity('action_log')
class Log {
  @PrimaryColumn()
  id!: string ;

  @Column()
  description!: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userid' })
  user!: User;

  @OneToOne(() => Room)
  @JoinColumn({ name: 'roomid' })
  room!: Room;

  @CreateDateColumn()
  created_at!: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Log };