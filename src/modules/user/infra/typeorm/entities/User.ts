import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';

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

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string {
    switch(process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return '';
    }
  }

  constructor() {
    if(this.id === '') {
      this.id = uuidV4();
    }
  }
}

export { User };