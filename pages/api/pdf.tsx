import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import type { NextApiRequest, NextApiResponse } from "next";

interface PdfRequest extends NextApiRequest {
  body: {
    url: string;
    name: string;
    street: string;
    area: string;
    city: string;
    postcode: string;
    email: string;
  };
}
export default async (req: PdfRequest, res: NextApiResponse) => {
  const { name, street, area, city, postcode, email } = req.body;
  const letterhead = [name, street, area, city, postcode].filter((val) => val);
  if (email) {
    letterhead.push("", email);
  }
  const code = await QRCode.toDataURL(req.body.url);
  const doc = new PDFDocument({
    size: "A4",
    margin: 20,
  });
  doc.pipe(res);
  doc
    .text(letterhead.join("\n"), 10, 40, {
      align: "right",
    })
    .image(code, doc.page.width - 85, doc.page.height - 85, {
      width: 75,
      align: "right",
      valign: "bottom",
    });
  res.status(200);
  doc.end();
};
