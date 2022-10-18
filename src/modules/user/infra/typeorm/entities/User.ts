import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity("users_tmg")
class User {
  @PrimaryColumn()
  id: string = '';

  @Column()
  name: string = "";

  @Column()
  email: string = "";

  @Column()
  password: string = "";
  
  @CreateDateColumn()
  created_at: Date = new Date();

  @Column()
  avatar: string = "";

  @Column()
  is_admin!: boolean;

  constructor() {
    if(this.id === '') {
      this.id = uuidV4();
    }
  }
}

export { User };