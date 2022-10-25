import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/user/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/providers/MailProvider/IMailProvider";
import { inject, injectable } from "tsyringe";

import { resolve } from 'path';

import { v4 as uuidV4 } from 'uuid';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('LuxonDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');

    if(!user) {
      throw new Error('User does not exists!');
    }

    const token = uuidV4();

    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date: this.dateProvider.addHours(3)
    });

    const variables = {
      name: user.name,
      link: `http://localhost:3333/password/reset?token=${token}`
    }

    await this.mailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath);
  }
}

export { SendForgotPasswordMailUseCase }