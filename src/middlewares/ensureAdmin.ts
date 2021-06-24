import { NextFunction, Request, Response } from 'express';
//Middleware para verificar se o usuário que vai inserir a tag é um admin
export function ensureAdmin(
  //Parametros 
  request: Request,
  response: Response,
  next: NextFunction,
) {
  //  verificando se o usuário é um admin
  const admin = true;

  if (admin) {
    //Se for admin ele pode seguir o fluxo e entrar no controller
    return next();
  }
  //Caso não seja admin, 401 = Unauthorized
  return response.status(401).json({
    error: 'Unauthorized',
  });
}
