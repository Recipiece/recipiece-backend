import { DatabaseConstants, DatabaseModel } from 'recipiece-common';
import { ISession } from './session.i';

export class Session extends DatabaseModel<ISession> implements ISession {
  owner: string;
  id: string;
  created: number;

  constructor(model?: Partial<ISession>) {
    super(DatabaseConstants.collections.sessions);
    this.owner = model?.owner || '';
    this.id = model?.id;
    this.created = model?.created;
  }

  public asModel(): Partial<ISession> {
    return {
      owner: this.owner,
      id: this.id,
      created: this.created,
    };
  }

  public serialize(): string {
    const valToEncode = `${this.id}.${this.owner}.${this.created}`;
    return Buffer.from(valToEncode).toString('base64');
  }

  public static deserialize(token: string): Session {
    const buffer = Buffer.from(token, 'base64');
    const decoded = buffer.toString('utf-8');
    const parts = decoded.split('.');
    return new Session({
      id: parts[0],
      owner: parts[1],
      created: +parts[3],
    });
  }
}
