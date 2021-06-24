import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { compare } from 'bcryptjs';
import {sign} from 'jsonwebtoken';
//Service para autenticar os dados de usuário
interface IAuthenticateRequest{
  email:string;
  password:string;

}
class AutheticateUserService{
  async execute({email,password}: IAuthenticateRequest){
    const usersRepositories = getCustomRepository(UsersRepositories)
    // Verificar se email existe
    const user = await  usersRepositories.findOne({
      email
    });
    //Caso usuário não exista.
    if(!user){
      throw new Error ("Email/Password is incorrect");
    }
    //verificar se a senha está correta.
    const passwordMatch = await compare(password,user.password);
    if(!passwordMatch){
      throw new Error ("Email/Password is incorrect");
    }
    //Gerar token. 
    //Sempre que uma função retorna uma promisse precisa de um await.
    const token =  sign({
      email:user.email,
      //chave secreta
    }, "5b9800dcb962fef9625b7764dc965969", {
      subject:user.id,
      expiresIn:  "1d",
    });
    return token;
    }
}
export {AutheticateUserService}