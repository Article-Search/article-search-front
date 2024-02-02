'use client'

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { ChevronRightIcon } from "@nextui-org/shared-icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


type PDFFile = string | File | null;

interface PdfReviewProps {
    filePath: string,
}

export default function PdfReview({ filePath }: PdfReviewProps) {
    const [file, setFile] = useState<PDFFile>(filePath)
    const [pdf, setPdf] = useState<PDFFile | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1); // start on first page
    const [loading, setLoading] = useState(true);
    const [pageWidth, setPageWidth] = useState(0);

    function onDocumentLoadSuccess({
        numPages: nextNumPages,
    }: {
        numPages: number;
    }) {
        setNumPages(nextNumPages);
    }

    function onPageLoadSuccess() {
        setPageWidth(window.innerWidth / 3);
        setLoading(false);
    }

    const options = {
        cMapUrl: "cmaps/",
        cMapPacked: true,
        standardFontDataUrl: "standard_fonts/",
    };

    // Go to next page
    function goToNextPage() {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }

    function goToPreviousPage() {
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }

    return (
        <div>
            <div
                hidden={loading}
                style={{ height: "calc(100vh - 64px)" }}
                className="flex items-center"
            >
                <div
                    className={`flex items-center justify-between w-1/3 absolute z-10 pr-5`}
                >
                    <button
                        onClick={goToPreviousPage}
                        disabled={pageNumber <= 1}
                        className="relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-800 focus:z-20"
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronRightIcon className="h-10 w-10 rotate-180" aria-hidden="true" />
                    </button>
                    <button
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages!}
                        className="relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-800 focus:z-20"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-10 w-10" aria-hidden="true" />
                    </button>
                </div>

                <div className="h-full flex justify-center mx-auto">
                    <Document
                        // file={{
                        //     url: file,
                        // }}
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={options}
                        renderMode="canvas"
                        className=""
                    >
                        <Page
                            className=""
                            key={pageNumber}
                            pageNumber={pageNumber}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            onLoadSuccess={onPageLoadSuccess}
                            onRenderError={() => setLoading(false)}
                            width={Math.max(pageWidth * 0.8, 390)}
                        />
                    </Document>
                </div>
            </div>
        </div>
    );
}


