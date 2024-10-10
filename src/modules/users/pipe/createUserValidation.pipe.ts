/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInputDto } from '../dto/createUserInput.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform(
    { name, email, username, password }: CreateUserInputDto,
    metadata: ArgumentMetadata,
  ) {
    if (!name || !email || !username || !password) {
      throw new UnprocessableEntityException(
        `[name, email, username, password] is required`,
      );
    }
    return { name, email, username, password };
  }
}
