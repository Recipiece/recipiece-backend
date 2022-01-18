import { DatabaseConstants } from '../../constants/database-constants';
import { DatabaseModel } from '../database-model';
import { ISession } from './session.i';

export class Session extends DatabaseModel<ISession> implements ISession {
  owner: string;

  constructor(model?: Partial<ISession>) {
    super(DatabaseConstants.collections.sessions);
    this.owner = model?.owner || '';
  }

  public asModel(): ISession {
    return {
      owner: this.owner,
      _id: this._id,
      created: this.created,
    };
  }

  public serialize(): string {
    const valToEncode = `${this._id}.${this.owner}.${this.created}`;
    return Buffer.from(valToEncode).toString('base64');
  }

  public static deserialize(token: string): Session {
    const buffer = Buffer.from(token, 'base64');
    const decoded = buffer.toString('utf-8');
    const parts = decoded.split('.');
    return new Session({
      _id: parts[0],
      owner: parts[1],
      created: +parts[3],
    });
  }
}
