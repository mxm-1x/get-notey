import React from 'react'

const PdfViewer = ({ fileUrl }) => {
    console.log("PDF URL:", fileUrl);
    
    if (!fileUrl) {
        return <div>No PDF URL provided</div>;
    }
    
    return (
        <div className="h-full w-full border rounded-lg overflow-hidden">
            <iframe 
                src={fileUrl+'#toolbar=0'} 
                height="100%" 
                width="100%" 
                className="h-full w-full" 
                title="PDF Viewer"
            />
        </div>
    )
}

export default PdfViewer