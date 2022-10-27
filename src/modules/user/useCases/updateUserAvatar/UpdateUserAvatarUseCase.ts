import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { User } from "@modules/user/infra/typeorm/entities/User";
import { IStorageProvider } from "@shared/providers/StorageProvider/IStorageProvider";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject('LocalStorageProvider')
    private storageProvider: IStorageProvider
  ) {}


  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id) as User;
    
    if(!user) {
      throw new Error("User not found");
    }

    if(user.avatar)
      await this.storageProvider.delete('avatar', user.avatar);

    await this.storageProvider.save('avatar', avatar_file);
    
    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}

export {  UpdateUserAvatarUseCase };