# PDFs for Letters

A simple tool that generates some useful printable PDFs for handwritten letters.

## PDF Kit Conversions

> Thanks to [this](https://stackoverflow.com/questions/51540144/pdfkit-node-js-measurement-unit) SO post!

- `1pt` is `~0.35mm`, or `~0.04cm`
- `10pt` is `~3.53mm`, or `~0.35cm`
- `100pt` is `~35.28mm`, or `~3.53cm`
- `148.75pt` (quarter page width) is `~52.48mm` or `~5.25cm`
- `297.5pt` (half page width) is `~104.95mm` or `~10.50cm`

### Useful script

```js
function mmToPt(mm) {
  return mm * 2.83465;
}

function cmToPt(cm) {
  return cm * 28.3465;
}

function inchToPt(inch) {
  return inch * 72;
}

const units = [1, 2, 3, 5, 10, 15, 20, 25, 50, 100, 150, 250, 500, 1000];

function convert(unit) {
  let name;
  let converter;

  switch (unit) {
    case "mm":
      name = "millimeters";
      converter = mmToPt;
      break;

    case "cm":
      name = "centimeters";
      converter = cmToPt;
      break;

    case "inch":
      name = "inches";
      converter = inchToPt;
      break;
  }

  console.log(`Convert ${name} to points:`);

  units.forEach((u) => {
    let converted = converter(u).toFixed(2);

    // get rid of unneeded .00 decimals
    if (+converted === parseInt(converted, 10)) {
      converted = +converted;
    }

    console.log(
      `${u}${unit} is ${converted}pt, so in doc.text(${converted}, ${converted}, 'Message')`
    );
  });

  console.log("--------------------------------------------");
}
```
