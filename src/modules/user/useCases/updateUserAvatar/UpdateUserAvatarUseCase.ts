import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../entities/User";
import { deleteFile } from "../../../../utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}


  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id) as User;
    
    if(user.avatar)
      await deleteFile(`./tmp/avatar/${user.avatar}`);

    if(!user) {
      throw new Error("User not found");
    }
    
    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}

export {  UpdateUserAvatarUseCase };