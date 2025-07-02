import cssText from '../../styles.css?inline'
import cssFont from '../../style-font.css?raw'

export default function printForm({ container }) {
    const iframe = document.createElement("iframe");
    iframe.onload = setPrint;
    iframe.srcdoc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${cssFont + cssText}</style>
      </head>
      <body>${container.outerHTML}</body>
      </html>
    `;
    document.body.appendChild(iframe);
}

function setPrint() {
    const closePrint = () => { document.body.removeChild(this); };
    this.contentWindow.onbeforeunload = closePrint;
    this.contentWindow.onafterprint = closePrint;
    this.contentWindow.print();
}