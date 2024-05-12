import { PDFDocument, PageSizes, StandardFonts } from "pdf-lib";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

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

const PDFWForm: React.FC = () => {
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

      const newPage = pdfDoc.addPage(PageSizes.Letter);

      newPage.drawText("Fill out following form", {
        x: 50,
        y: 700,
        size: 20,
        font: helveticaFont,
      });

      const form = pdfDoc.getForm();
      const firstNameField = form.createTextField("fullname");
      firstNameField.setText("First Name..."); // Set default text
      firstNameField.addToPage(newPage, {
        x: 50,
        y: 650,
        height: 30,
      });

      const lastNameField = form.createTextField("lastname");
      lastNameField.setText("Last Name..."); // Set default text
      lastNameField.addToPage(newPage, {
        x: 260,
        y: 650,
        height: 30,
        width: 200,
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
          <h1>PDF with form (not editable on browser)</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div
            className="border border-3"
            style={{ height: "70vh", overflowY: "auto" }}
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
      {file?.data && (
        <Row className="m-4 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <a
              href={URL.createObjectURL(
                new Blob([file.data], { type: "application/pdf" }),
              )}
              download="modified.pdf"
            >
              Download PDF
            </a>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PDFWForm;
