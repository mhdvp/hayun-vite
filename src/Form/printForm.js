// import '../style.css'
// import '../fonts/Vazirmatn-Regular.woff2'


export default function printForm({ container }) {
  // const paperForm = document.getElementById(elementID);
  const paperForm = container;

  print(paperForm);

  function print(paperForm) {
    iframePrint(paperForm);
    return new Date().toLocaleString("fa-IR");
  }

  function iframePrint(paperForm) {
    const hideFrame = document.createElement("iframe");
    let printDateTime;
    hideFrame.onload = setPrint;
    hideFrame.style.display = "block"; // hide iframe

    let style = `
                @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap');

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
                    .non-print {
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
                    
                    font-weight: 200;
                    font-style: normal;
                    font-size: 0.8mm;

                }

                .align {
                    text-anchor: start;
                }

                .bold {
                    font-weight: bold;
              }

          `;
    hideFrame.srcdoc = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>

       
        
        <style>${style}</style>
    </head>

    <body>${paperForm.outerHTML}</body>

    <script type="module">
      console.log('fdfd')
    </script>

    </html>
    `;
    document.body.appendChild(hideFrame);
   
    return 1;
    function setPrint() {
      const closePrint = () => { document.body.removeChild(this); };
      this.contentWindow.onbeforeunload = () => closePrint();
      this.contentWindow.onafterprint = () => {
        closePrint();
      }
      this.contentWindow.print();
    }
  }
}