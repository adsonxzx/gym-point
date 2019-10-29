import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Validation
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error!' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User does exists' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password is incorrect' });
    }
    const { id, name, provider } = user;

    const token = await jwt.sign({ id }, authConfig.secrete, {
      expiresIn: authConfig.expireIn,
    });

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
      },
      token,
    });
  }
}

export default new SessionController();
