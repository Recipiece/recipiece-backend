import { DatabaseConstants, DbI, ISession } from 'recipiece-common';

export async function getSessionById(id: string): Promise<Partial<ISession>> {
  return await DbI.getEntityById(DatabaseConstants.collections.sessions, id);
}
