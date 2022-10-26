import auth from '@config/auth';
import { UserTokensRepository } from '@modules/user/infra/typeorm/repositories/UserTokensRepository';
import { LuxonDateProvider } from '@shared/providers/DateProvider/implementations/LuxonDateProvider';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IPayLoad {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepository,
    @inject("LuxonDateProvider")
    private luxonDateProvider: LuxonDateProvider
  ) {}
  
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayLoad;

    const userId = sub;

    const userToken = await this.userTokensRepository.findByUserIdAndToken(userId, token);

    if(!userToken) {
      throw new Error('Refresh token not found!');
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: userId,
      expiresIn: auth.expires_in_refresh_token
    });

    await this.userTokensRepository.create({
      expires_date: this.luxonDateProvider.getNext30Day(),
      user_id: userId,
      refresh_token
    });

    const new_token = sign({ }, auth.secret_token, {
      subject: userId,
      expiresIn: auth.expires_in_token,
    });

    return {
      token: new_token,
      refresh_token
    };
  } 
}