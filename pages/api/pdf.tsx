import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import type { NextApiRequest, NextApiResponse } from "next";
import withSession from "../../lib/session";
import { Session } from "next-iron-session";

interface PdfRequest extends NextApiRequest {
  session: Session;
  body: {
    url: string;
    name: string;
    street: string;
    state: string;
    city: string;
    postcode: string;
    email: string;
    font: string;
    content: string;
    extra: string;
    save: string;
  };
}
export default withSession(async (req: PdfRequest, res: NextApiResponse) => {
  const {
    name,
    street,
    state,
    city,
    postcode,
    email,
    font = "Helvetica",
    extra,
    save,
    url,
    content,
  } = req.body;
  if (
    [name, street, state, city, postcode, email, url].filter(Boolean).length < 1
  ) {
    res.write("Invalid data provided! You must fill in at least 1 field");
    return res.status(422).end();
  }
  if (!["Courier", "Helvetica", "Times-Roman"].includes(font)) {
    res.write("Invalid data provided!");
    res.status(422).end();
  }
  if (save?.toLowerCase() === "on") {
    req.session.set("name", name);
    req.session.set("street", street);
    req.session.set("state", state);
    req.session.set("city", city);
    req.session.set("postcode", postcode);
    req.session.set("email", email);
    req.session.set("font", font);
    req.session.set("save", true);
    await req.session.save();
  } else {
    req.session.destroy();
  }
  const letterhead = [name, street, state, city, postcode].filter((val) => val);
  if (email) {
    letterhead.push("", email);
  }
  if (extra) {
    letterhead.push(extra);
  }
  const doc = new PDFDocument({
    size: "A4",
    margin: 40,
  });
  doc.pipe(res);
  doc.font(font);
  doc
    .fontSize(12)
    .text(letterhead.join("\n"), 10, 60, {
      align: "right",
    })
    .moveDown(4);

  if (content) {
    doc
      .fontSize(12)
      .text(
        content.replace(/\r\n|\r/g, "\n"),
        doc.page.margins.left,
        undefined,
        {
          lineGap: 1,
          paragraphGap: 2,
        }
      );
  }

  if (url) {
    const code = await QRCode.toDataURL(url);
    doc.image(code, doc.page.width - 85, doc.page.height - 85, {
      width: 75,
      align: "right",
      valign: "bottom",
    });
  }
  res.status(200);
  doc.end();
});
