import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


// const pdfUrl = 'https://grand-tapir-706.convex.cloud/api/storage/3f0cef38-3408-4827-a0b1-f2da8b70dd72'

export async function GET(req) {

    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl)
    const pdfUrl = searchParams.get('pdfUrl')
    console.log(pdfUrl)

    // 1. load pdf
    const res = await fetch(pdfUrl)
    const data = await res.blob()
    const loader = new WebPDFLoader(data)
    const docs = await loader.load()

    let pdfTextContent = '';
    docs.forEach((doc) => {
        pdfTextContent += doc.pageContent;
    });

    // 2. split the text into smaller chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const output = await splitter.createDocuments([pdfTextContent]);
    let splitterList = []
    output.forEach(doc => { splitterList.push(doc.pageContent) })
    return NextResponse.json({ result: splitterList })
}