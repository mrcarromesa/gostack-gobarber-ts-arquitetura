import { Request, response, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id });
    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;

      const { name, email, old_password, password } = req.body;
      const updateProfile = container.resolve(UpdateProfileService);
      const user = await updateProfile.execute({
        user_id: id,
        name,
        email,
        old_password,
        password,
      });
      delete user.password;
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new ProfileController();
