export default function printForm({ container }) {
  const iframe = document.createElement("iframe");
  iframe.onload = setPrint;
  iframe.style.display = "block";
  let style = `
                @font-face {
                font-family: 'Vazir';
                src: url('/fonts/Vazir-Black-UI.woff2') format('woff2'),
                    url('/fonts/Vazir-Black-UI.woff') format('woff'),
                    url('/fonts/Vazir-Black-UI.eot') format('embedded-opentype');
                font-weight: 900;
                font-style: normal;
                font-display: swap;
                }

                @font-face {
                font-family: 'Vazir';
                src: url('/fonts/Vazir-Bold-UI.woff2') format('woff2'),
                    url('/fonts/Vazir-Bold-UI.woff') format('woff'),
                    url('/fonts/Vazir-Bold-UI.eot') format('embedded-opentype');
                font-weight: 700;
                font-style: normal;
                font-display: swap;
                }

                @font-face {
                font-family: 'Vazir';
                src: url('/fonts/Vazir-Medium-UI.woff2') format('woff2'),
                    url('/fonts/Vazir-Medium-UI.woff') format('woff'),
                    url('/fonts/Vazir-Medium-UI.eot') format('embedded-opentype');
                font-weight: 500;
                font-style: normal;
                font-display: swap;
                }

                @font-face {
                font-family: 'Vazir';
                src: url('/fonts/Vazir-Regular-UI.woff2') format('woff2'),
                    url('/fonts/Vazir-Regular-UI.woff') format('woff'),
                    url('/fonts/Vazir-Regular-UI.eot') format('embedded-opentype');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
                }

                @font-face {
                font-family: 'Vazir';
                src: url('/fonts/Vazir-Light-UI.woff2') format('woff2'),
                    url('/fonts/Vazir-Light-UI.woff') format('woff'),
                    url('/fonts/Vazir-Light-UI.eot') format('embedded-opentype');
                font-weight: 300;
                font-style: normal;
                font-display: swap;
                }

                @font-face {
                font-family: 'Vazir';
                src: url('/fonts/Vazir-Thin-UI.woff2') format('woff2'),
                    url('/fonts/Vazir-Thin-UI.woff') format('woff'),
                    url('/fonts/Vazir-Thin-UI.eot') format('embedded-opentype');
                font-weight: 100;
                font-style: normal;
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
                    font-family: "Vazir";
                 

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