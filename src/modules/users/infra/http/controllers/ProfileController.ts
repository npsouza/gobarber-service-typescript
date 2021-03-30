import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, password, old_password } = request.body;

      const updateProfilse = container.resolve(UpdateProfileService);

      const user = await updateProfilse.execute({
        user_id,
        name,
        email,
        old_password,
        password,
      });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
