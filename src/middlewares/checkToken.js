import jwt from '../utils/jwt.js';

export default (req, res, next) => {
  try {
    let { token } = req.headers;

    if (!token) {
      throw new Error("you have not administration")
    }

    let { userId } = jwt.verify(token);

    req.userId = userId;

    return next();
  } catch (error) {
    return res.status(403).json({ status: 403, message: "you have not administration"})
  }
};
