import { getCustomRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { UsersRepositories } from '../repositories/UsersRepositories';
//Middleware para verificar se o usuário que vai inserir a tag é um admin
export async function ensureAdmin(
  //Parametros 
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { user_id } = request;

  const usersRepositories = getCustomRepository(UsersRepositories);

  const {admin} = await usersRepositories.findOne(user_id)
  //  verificando se o usuário é um admin

  if (admin) {
    //Se for admin ele pode seguir o fluxo e entrar no controller
    return next();
  }
  //Caso não seja admin, 401 = Unauthorized
  return response.status(401).json({
    error: 'Unauthorized',
  });
}
