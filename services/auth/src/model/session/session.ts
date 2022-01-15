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
}
