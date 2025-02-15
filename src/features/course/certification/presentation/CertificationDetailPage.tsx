import React, { useEffect, useState } from 'react';
import { RouteObject, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../common/context/store';
import { getCertificationDetail } from '../data/handleGetCertificationDetail';
import { Certification } from '../../../../common/entities/Certification';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const CourseDetailPage: React.FC = () => {
    const { certificationId } = useParams<{ certificationId: string }>();
    const dispatch = useAppDispatch();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const { data, status, error } = useAppSelector(
        (state) => state.certificationSlice.certificationDetailPage
    );

    useEffect(() => {
        dispatch(getCertificationDetail(Number(certificationId)));
    }, [dispatch, certificationId]);

    useEffect(() => {
        if (data) {
            generatePdf(data).then((pdfBlobUrl) => {
                setPdfUrl(pdfBlobUrl);
            });
        }
    }, [data]);

    const handleDownload = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `Certification-${data?.nftTokenId || 'document'}.pdf`;
            link.click();
        }
    };

    if (status === 'pending') {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
    }

    if (!data) {
        return <div className="text-center mt-4">No Certification found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            {pdfUrl ? (
                <div className="mt-8">
                    <div className="pdf-container border rounded-lg overflow-hidden" style={{ width: '100%' }}>
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={pdfUrl} />
                        </Worker>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Download PDF
                    </button>
                </div>
            ) : (
                <div className="text-center mt-4">Generating PDF...</div>
            )}
        </div>
    );
};

const generatePdf = async (certification: Certification): Promise<string> => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const { userDto, courseDTO, status, nftTokenId, transactionHash, comments, issueDate } = certification;

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontSize = 12;
    const textColor = rgb(0, 0, 0);

    page.drawText(`Certification Details`, {
        x: 50,
        y: 750,
        size: 18,
        font: timesRomanFont,
        color: textColor,
    });

    page.drawText(`User: ${userDto?.firstName} ${userDto?.lastName}`, {
        x: 50,
        y: 700,
        size: fontSize,
        font: timesRomanFont,
        color: textColor,
    });
    page.drawText(`Course: ${courseDTO?.title}`, {
        x: 50,
        y: 680,
        size: fontSize,
        font: timesRomanFont,
        color: textColor,
    });
    page.drawText(`Issue Date: ${Certification.getDateString(issueDate || [])}`, {
        x: 50,
        y: 660,
        size: fontSize,
        font: timesRomanFont,
        color: textColor,
    });
    page.drawText(`Status: ${status}`, {
        x: 50,
        y: 640,
        size: fontSize,
        font: timesRomanFont,
        color: textColor,
    });
    page.drawText(`NFT Token ID: ${nftTokenId}`, {
        x: 50,
        y: 620,
        size: fontSize,
        font: timesRomanFont,
        color: textColor,
    });
    page.drawText(`Transaction Hash: ${transactionHash}`, {
        x: 50,
        y: 600,
        size: fontSize,
        font: timesRomanFont,
        color: textColor,
    });
    page.drawText(`Comments: ${comments ?? 'No comments'}`, {
        x: 50,
        y: 580,
        size: fontSize,
        font: timesRomanFont,
        color: textColor,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(pdfBlob);
};

export const route: () => RouteObject = () => {
    return {
        path: 'certification/:certificationId',
        element: <CourseDetailPage />,
    };
};

export default CourseDetailPage;
