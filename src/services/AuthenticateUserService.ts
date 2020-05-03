import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authCOnfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface ResponseAutenticate {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<ResponseAutenticate> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination.', 401);
    }

    // user.password - senha criptografada
    // password - senha nao criptografacda
    const passwordMathed = await compare(password, user.password);
    if (!passwordMathed) {
      throw new AppError('Incorrect e-mail/password combination.', 401);
    }

    const { secret, expiresIn } = authCOnfig.jwt;

    /**
     * payload = coloca informacoes do usuario ex: tipo de usuario, permissao
     * assinatura = pode ser uma string unica tipo um md5
     * configuracoes do token
     *  - subject = usuario saber quem gerou
     *  - tempo de duracao do token
     */
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    // User autenticate
    return { user, token };
  }
}

export default AuthenticateUserService;
