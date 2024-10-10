import { CreateUserInputDto } from './createUserInput.dto';

export type createUserDataDto = {
  id: string;
  createdAt: Date;
} & CreateUserInputDto;
