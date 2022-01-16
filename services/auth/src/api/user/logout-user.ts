import { Session } from "model/session/session";

export async function logoutUser(session: Session) {
  await session.delete();
}