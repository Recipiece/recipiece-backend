import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';
import { UserPermissions, UserPermissionsDocument } from './user-permissions.schema';

@Injectable()
export class UserPermissionsService extends ModelService<UserPermissionsDocument, UserPermissions> {
  constructor(@InjectModel(UserPermissions.name) model: Model<UserPermissionsDocument>) {
    super(model);
  }
}
