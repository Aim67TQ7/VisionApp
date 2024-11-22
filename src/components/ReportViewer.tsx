// ReportViewer.tsx
import React from 'react';
import jsPDF from 'jspdf';

interface ReportViewerProps {
  reportData: any;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ reportData }) => {
  if (!reportData) {
    return <p>No report data available.</p>;
  }

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('AI Analysis Report', 10, 10);
    doc.setFontSize(12);
    const reportContent = JSON.stringify(reportData, null, 2);
    const lines = doc.splitTextToSize(reportContent, 180);
    doc.text(lines, 10, 30);

    // Adding image to the PDF if it exists in the reportData
    if (reportData.images && reportData.images.length > 0) {
      reportData.images.forEach((imageUrl: string, index: number) => {
        const imgYPosition = 50 + (index * 100); // Adjust position for each image
        doc.addImage(imageUrl, 'JPEG', 10, imgYPosition, 180, 90);
      });
    }

    doc.save('AI_Analysis_Report.pdf');
  };

  return (
    <div className="report-viewer">
      <h2>AI Analysis Report</h2>
      <div className="report-content">
        <pre>{JSON.stringify(reportData, null, 2)}</pre>
      </div>
      <button onClick={handleDownloadReport}>Download Report as PDF</button>
    </div>
  );
};

export default ReportViewer;

// Description:
// This file is the report viewer component that displays the AI analysis report returned from the API.
// It accepts `reportData` as a prop and displays it in a readable format, with an option to download the report as a PDF.
// The `handleDownloadReport` function generates a PDF that includes the report data and any images present in the report.
// Images are fetched from URLs stored in `reportData.images` and added to the PDF for a comprehensive report.
