import User from '../models/user';

export const getUser = async (request: any, response: any) => {
  const user = await User.findById(request.userId);

  if (!user) {
    return response.status(400).send({ error: 'Usuário não encontrado' });
  }
  response.send({ user: user.name });
};
