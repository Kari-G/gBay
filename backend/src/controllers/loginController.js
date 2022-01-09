import { loginService } from '../services';

export const loginController = {
  async post(req, res) {
    try {
      const response = await loginService.authenticateUser(req.body);
      res.status(response.status).json(response.data);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err.status ? err.message : 'Internal server error');
    }
  },
};
