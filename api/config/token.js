import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

export const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: '4d' });
  return token;
};

export const validateToken = (token) => {
  return jwt.verify(token, SECRET);
};
