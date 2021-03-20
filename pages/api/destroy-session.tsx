import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import withSession from "../../lib/session";

interface Request extends NextApiRequest {
  session: Session;
}
export default withSession(async (req: Request, res: NextApiResponse) => {
  req.session.destroy();
  res.status(204).end();
});
