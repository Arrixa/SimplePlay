import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

function readJsonFiles(dirPath : string) {
    return fs.readdirSync(dirPath).filter(file => path.extname(file) === '.json').map(file => {
        const filePath = path.join(dirPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    });
}

export async function GET(request: NextRequest) {
    const directoryPath = './playwright-testing/allure-results/';
    const all_files = readJsonFiles(directoryPath);
    return NextResponse.json({ report: all_files });
}
