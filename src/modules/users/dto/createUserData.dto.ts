import { CreateUserInputDto } from './createUserInput.dto';

export type createUserDataDto = {
  id: string;
  createdAt: Date;
} & CreateUserInputDto;

export type FileDto = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export type AvatarDto = {
  idUser: string;
  file: FileDto;
};
