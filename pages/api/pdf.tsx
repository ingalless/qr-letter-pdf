import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import type { NextApiRequest, NextApiResponse } from "next";

interface PdfRequest extends NextApiRequest {
  query: {
    url: string;
  };
}
export default async (req: PdfRequest, res: NextApiResponse) => {
  const code = await QRCode.toDataURL(req.query.url);
  const doc = new PDFDocument({ size: "A4" });
  doc.pipe(res);
  doc.image(code, doc.page.width - 85, doc.page.height - 85, {
    width: 75,
    align: "right",
    valign: "bottom",
  });
  res.status(200);
  doc.end();
};
