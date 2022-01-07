import { registerService } from '../services';

export const registerController = {
  async post(req, res) {
    try {
      const data = await registerService.createNewUser(req.body);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err.status ? err.message : 'Internal server error');
    }
  },
};
