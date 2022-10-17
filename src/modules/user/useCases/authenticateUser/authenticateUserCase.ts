import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { IUserRepository } from "@modules/user/repositories/IUserRepository";

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
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
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

    const token = sign({}, '16d25979826290c44af324ca0a33b3c9', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    }
  }
}

export { AuthenticateUserUseCase };