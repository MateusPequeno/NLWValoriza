import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}
//Middleware para verificar se o usuário que vai inserir a tag é um admin
export function ensureAuthenticated(
  //Parametros 
  request: Request,
  response: Response,
  next: NextFunction,
) {
  //  Receber o token
  const authToken = request.headers.authorization;
  
  //Validar se o token está preenchido
  if(!authToken){
    return response.status(401).end();  
  }
  const [, token] = authToken.split(" ");

  //Verificar se o token é válido
  try{
  const {sub} = verify( token, "5b9800dcb962fef9625b7764dc965969" ) as IPayload;
  request.user_id = sub;
  
  return next();

  }catch(err){
    return response.status(401).end();  
  }
  //Verificar informações do usuário

}
