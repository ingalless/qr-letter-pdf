import PDFDocument from "pdfkit";
import type { NextApiRequest, NextApiResponse } from "next";

interface Request extends NextApiRequest {
  query: { height: string };
}
const margin = 40;
export default async (req: Request, res: NextApiResponse) => {
  if (!req.query.height || !Number.isFinite(req.query.height)) {
    res.write("Invalid data provided!");
    return res.status(422).end();
  }
  const height = Number(req.query.height);
  const division = height / 3;
  const [divisionOne, divisionTwo] = [division, division + division];
  const doc = new PDFDocument({
    size: "A4",
    margin,
  });
  doc.pipe(res);
  for (
    let i = doc.page.margins.top;
    i <= doc.page.height - margin;
    i = i + height
  ) {
    doc
      .moveTo(margin, i)
      .lineTo(doc.page.width - margin, i)
      .stroke("#333");
    doc
      .moveTo(margin, i + divisionOne)
      .lineTo(doc.page.width - margin, i + divisionOne)
      .stroke("#999");
    doc
      .moveTo(margin, i + divisionTwo)
      .lineTo(doc.page.width - margin, i + divisionTwo)
      .stroke("#999");
  }
  res.status(200);
  doc.end();
};
