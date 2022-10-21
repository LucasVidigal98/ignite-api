import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { UserTokensRepository } from "@modules/user/infra/typeorm/repositories/UserTokensRepository";
import auth from "@config/auth";
import { LuxonDateProvider } from "@shared/providers/DateProvider/implementations/LuxonDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: UserTokensRepository,
    @inject("LuxonDateProvider")
    private luxonDateProvider: LuxonDateProvider
  ){}


  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new Error("Email or password incorrect");
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token
    });

    await this.userTokensRepository.create({
      user_id: user.id as string,
      refresh_token,
      expires_date: this.luxonDateProvider.getNext30Day()
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token
    }
  }
}

export { AuthenticateUserUseCase };