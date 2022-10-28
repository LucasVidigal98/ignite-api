
import { User } from "../infra/typeorm/entities/User";
import { IUserResponseDTO } from "../repositories/DTO/IUserResponseDTO";

export class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
  }: User): IUserResponseDTO {
    let avatar_url = '';

    switch (process.env.disk) {
      case 'local':
        avatar_url = `${process.env.APP_API_URL}/avatar/${avatar}`;
        break;
      case 's3':
        avatar_url = `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`;
        break;
      default:
        avatar_url = '';
        break;
    }

    return {
      id,
      name,
      email,
      avatar,
      avatar_url
    }
  };
}