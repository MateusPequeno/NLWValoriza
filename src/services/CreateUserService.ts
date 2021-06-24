import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email incorrect');
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }
    //Criptografando a senha com o bcrypt
    //Passando a senha já criptografada pro banco de dados

    const passwordHash = await hash(password,8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      //Passando o valor criptgrafado para password
      password : passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}
