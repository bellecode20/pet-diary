import { getSession } from "next-auth/react";
export async function getIdBySession({ req }) {
  const session = await getSession({ req });
  const idOfSession = session.user.userId;
  return idOfSession;
}
