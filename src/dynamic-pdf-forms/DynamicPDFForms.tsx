import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Container, Row, Col } from "react-bootstrap";

// Set the worker script for PDF.js to the path of the pdf.worker.min.js file relative to the current module
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

// Configuration options for react-pdf, specifying the paths for character maps and standard fonts
const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

type PDFFile = { data: Uint8Array } | null;

// reference: https://pspdfkit.com/demo/forms
const DynamicPDFForms: React.FC = () => {
  const [file, setFile] = useState<PDFFile>(null);
  const [numPages, setNumPages] = useState<number>();

  useEffect(() => {
    const modifyPdf = async (pdfUrl: string) => {
      const url = pdfUrl;
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer(),
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      firstPage.drawText("This text was added with JavaScript!", {
        x: 5,
        y: height / 2 + 300,
        size: 50,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(-45),
      });
      const pdfBytes = await pdfDoc.save();
      setFile({ data: pdfBytes });
    };

    modifyPdf("./sample.pdf");
  }, []);

  // Function to update the state with the number of pages when the PDF document has successfully loaded
  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <Container className="text-center vh-100">
      <Row className="m-4">
        <Col>
          <h1>Dynamic PDF Form</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div
            className="border border-3"
            style={{ height: "600px", overflowY: "auto" }}
          >
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={600}
                />
              ))}
            </Document>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DynamicPDFForms;
