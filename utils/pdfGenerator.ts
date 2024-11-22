// pdfGenerator.ts
import jsPDF from 'jspdf';
import { uploadReportToS3 } from './awsService';

interface ReportData {
  [key: string]: any;
}

export const generatePDF = async (reportData: ReportData, reportName: string = 'full_report.pdf') => {
  const doc = new jsPDF();

  // Set Title
  doc.setFontSize(18);
  doc.text('AI Analysis Report', 10, 10);

  // Set Content
  doc.setFontSize(12);
  const reportContent = JSON.stringify(reportData, null, 2);
  const lines = doc.splitTextToSize(reportContent, 180);
  doc.text(lines, 10, 30);

  // Adding images to the PDF if available in reportData
  if (reportData.images && reportData.images.length > 0) {
    reportData.images.forEach((imageUrl: string, index: number) => {
      const imgYPosition = 50 + (index * 100); // Adjust position for each image
      doc.addImage(imageUrl, 'JPEG', 10, imgYPosition, 180, 90);
    });
  }

  // Convert the document to a Blob and upload it to S3
  const pdfBlob = doc.output('blob');
  const uploadResult = await uploadReportToS3(pdfBlob, reportName);

  if (!uploadResult.success) {
    console.error('Error uploading PDF to S3:', uploadResult.message);
  }

  // Save PDF locally
  doc.save(reportName);
};

// Description:
// This file provides a utility function `generatePDF` to create a PDF document from the given report data.
// It uses the `jsPDF` library to generate a PDF that includes the AI analysis report and any images provided.
// After generating the PDF, it uploads the document to AWS S3 using `uploadReportToS3` and also saves a local copy.
// Proper error handling is included to ensure that both upload and local saving are properly managed.
