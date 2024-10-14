import { FileDto } from 'src/modules/users/dto/createUserData.dto';

export abstract class IStorage {
  abstract upload(file: FileDto, folder: string): Promise<any>;
}
