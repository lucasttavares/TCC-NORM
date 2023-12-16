import jwt from 'jsonwebtoken';
const authConfig = require('../../config/auth.json');

export default (request: any, response: any, next: any) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({ error: 'Token não informado' });
  }
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return response.status(401).send({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).send({ error: 'Token incompleto' });
  }

  jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
    if (err) {
      return response.status(401).send({ error: 'Token inválido' });
    }

    request.userId = decoded.id;
    return next();
  });
};
