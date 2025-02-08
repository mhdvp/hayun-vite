export default function printForm({ container }) {
  // const paperForm = document.getElementById(elementID);
  const paperForm = container;

  console.log("Print!");
  console.log(paperForm);
  print(paperForm);

  function print(paperForm) {
    iframePrint(paperForm);
    return new Date().toLocaleString("fa-IR");
  }

  function iframePrint(paperForm) {
    const hideFrame = document.createElement("iframe");
    let printDateTime;
    hideFrame.onload = setPrint;
    hideFrame.style.display = "none"; // hide iframe
    // hideFrame.src = "page-print.html";
    let style = `
              @page {
  
                  size: a4;
                  margin: 0;
  
                  padding: 0;
                  break-inside: avoid;
                  
                  /* width: 100%; */
                  height: 100%;
                  /* max-width: 800px; */
                  /* margin: auto; */
  
              }
              @media print {
                  /* All your print styles go here */
                  header, footer {
                      display: none; /* Hide header and footer when printing */
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
                 
              }        
          `;
    hideFrame.srcdoc = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title></title><style>${style}</style></head><body>${paperForm.outerHTML}</body></html>`;
    document.body.appendChild(hideFrame);
    // setTimeout(() => console.log(printDateTime), 2000)
    // console.log(printDateTime);
    return printDateTime;
    function setPrint() {
      const closePrint = () => { document.body.removeChild(this); };
      this.contentWindow.onbeforeunload = () => closePrint();
      this.contentWindow.onafterprint = () => {
        closePrint();
        printDateTime = (new Date().toLocaleString("fa-IR"));
      }
      this.contentWindow.print();
    }
  }
}