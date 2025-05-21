export default function printForm({ container }) {
  const iframe = document.createElement("iframe");
  iframe.onload = setPrint;
  iframe.style.display = "block";
  let style = `
                @font-face {
                font-family: vazirmatn;
                src:
                    url("/fonts/Vazirmatn-Regular.woff2") format("woff2"),
                    url('/fonts/Vazirmatn-Regular.woff') format('woff');
                font-display: swap;
                }

                @page {

                    size: a4;
                    margin: 0;
                    padding: 0;
                    break-inside: avoid;
                    height: 100%;
                }

                @media print {

                    header,
                    footer {
                        display: none;
                    }

                    button {
                        display: none !important;
                    }

                    svg {
                        margin: 0;
                        padding: 0;
                        break-inside: avoid;
                    }

                    body {
                        margin: 0;
                        padding: 0;
                        break-inside: avoid;
                    }

                    html {
                        margin: 0;
                        padding: 0;
                        break-inside: avoid;
                    }
                    .no-print {
                      display: none;
                    }

                }

                .text-box {
                    font-size: 0.8mm;
                    direction: rtl !important;
                    user-select: none;
                }

                .persian {
                    font-family: "Vazirmatn";
                 

                }

                .align {
                    text-anchor: start;
                }

                .bold {
                    font-weight: bold;
              }

  `;
  iframe.srcdoc = `
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${style}</style>
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