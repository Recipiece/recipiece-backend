import { Session } from 'recipiece-common';

export async function logoutUser(session: Session) {
  await session.delete();
}
