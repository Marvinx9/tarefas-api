import { createUserDataDto } from '../dto/createUserData.dto';
import { CreateUserInputDto } from '../dto/createUserInput.dto';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<createUserDataDto | null>;
  abstract save(data: CreateUserInputDto): Promise<createUserDataDto>;
  abstract findByUsername(username: string): Promise<createUserDataDto | null>;
  abstract findById(id: string): Promise<createUserDataDto | null>;
  abstract uploadAvatar(id: string, path: string): Promise<void>;
}
