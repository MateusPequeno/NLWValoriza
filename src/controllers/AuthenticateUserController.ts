import { Request, Response } from 'express';
import { AutheticateUserService } from '../services/AuthenticateUserService';

class AutheticateUserController{
  async handle(request: Request, response: Response){
    const {email,password} = request.body;

    const authenticateUserService = new AutheticateUserService();

    //Recebendo o token
    const token = await authenticateUserService.execute({
      email,
      password,
    });
    //Retornadno o token como json
    return response.json(token);
  }
}
export {AutheticateUserController}