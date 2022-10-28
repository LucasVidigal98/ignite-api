import { User } from "@modules/user/infra/typeorm/entities/User";
import { UserMap } from "@modules/user/mapper/UserMap";
import { IUserResponseDTO } from "@modules/user/repositories/DTO/IUserResponseDTO";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRespository: IUserRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRespository.findById(id);

    return UserMap.toDTO(user as User);
  }
}

export { ProfileUserUseCase };