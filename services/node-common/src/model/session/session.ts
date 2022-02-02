import { DatabaseConstants } from '../../constants/database-constants';
import { DatabaseModel } from '../database-model';
import { ISession } from './session.i';

export class Session extends DatabaseModel<ISession> implements ISession {
  public get owner(): string {
    return this.model.owner;
  }
  public set owner(value: string) {
    this.model.owner = value;
  }

  constructor(model: Partial<ISession>) {
    super(DatabaseConstants.collections.sessions, (d) => new Session(d), model);
  }

  public asJson(): ISession {
    return {
      ...this.model,
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
