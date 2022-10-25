import { User } from "@modules/user/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/user/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('LuxonDateProvider')
    private dateProvider: IDateProvider,
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute({ token, password }: IRequest) {
    const userToken = await this.userTokensRepository.findByToken(token);

    if(!userToken) {
      throw new Error('Token Invalid');
    }

    console.log(this.dateProvider.getTodayDate());

    if(!this.dateProvider.comapareIfBefore(this.dateProvider.getTodayDate(), userToken.expires_date)) {
      throw new Error('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.user_id) as User;

    const newPassord = await hash(password, 8);

    await this.usersRepository.update({ ...user, password: newPassord });

    await this.userTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };