import { ICreateUserTokenDTO } from "@modules/user/repositories/DTO/ICreateUserTokenDTO";
import { IUserTokensRepository } from "@modules/user/repositories/IUserTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

export class UserTokensRepository implements IUserTokensRepository {

  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return this.repository.findOne({
      user_id,
      refresh_token
    }) as unknown as UserTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByToken(token: string): Promise<UserTokens | undefined> {
    return this.repository.findOne({ refresh_token: token });
  }
}