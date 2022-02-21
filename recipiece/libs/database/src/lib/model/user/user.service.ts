import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService extends ModelService<UserDocument, User> {
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }

  public async getByUsername(name: string): Promise<User> {
    return this.model.findOne({username: name});
  }

  public async getByEmail(email: string): Promise<User> {
    return this.model.findOne({email: email});
  }
}
