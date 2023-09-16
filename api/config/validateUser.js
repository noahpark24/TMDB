import { validateToken } from './token.js';

function validateUser(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;
  console.log('soy req user :', req.user);

  next();
}

export default validateUser;
