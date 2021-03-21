import type { NextApiRequest, NextApiResponse } from "next";
import withSession from "../../lib/session";
import { Session } from "next-iron-session";
import { Settings } from "../../lib/types";

interface PdfRequest extends NextApiRequest {
  session: Session;
}
export default withSession(
  async (req: PdfRequest, res: NextApiResponse<Settings>) => {
    const settings: Settings = {
      street: req.session.get("street"),
      state: req.session.get("state"),
      city: req.session.get("city"),
      postcode: req.session.get("postcode"),
      email: req.session.get("email"),
      font: req.session.get("font"),
      save: req.session.get("save"),
    };
    res.json(settings);
  }
);
