import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import process from 'process';
import { v4 as uuidv4 } from 'uuid';

function generateUniqueId() {
    return uuidv4();
}

dotenv.config();

function initSupBase() {

    const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string);
    return supabase;
}

function readOutputFile(dirPath: string) {
    return fs.readdirSync(dirPath).filter(file => path.extname(file) === '.txt').map(file => {
        const filePath = path.join(dirPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        console.log("After results "+ fileContent.split('\n')[0]);
        return fileContent.split('\n')[0];
    });
}

function readJsonFiles(dirPath : string) {
    return fs.readdirSync(dirPath).filter(file => path.extname(file) === '.json').map(file => {
        const filePath = path.join(dirPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    });
}

function fetchReports() {
    const directoryPath = `${process.cwd()}/playwright-testing/allure-results/`;
    const all_files = readJsonFiles(directoryPath);
    return all_files;
}

function fetchText() {
    const directoryPath = `${process.cwd()}/playwright-testing/allure-results/`;
    const all_files = readOutputFile(directoryPath);
    return all_files;
}
export async function POST(request: NextRequest) {
    const uniqueRunID = generateUniqueId();
    const reports = (fetchReports());
    const sapID = fetchText();
    const sup = initSupBase();
    try {
        reports.forEach(async report => {
            const { data, error } = await sup
                .from('playwright')
                .insert([{ run_id: uniqueRunID, report: report, test_case_ids: report.testCaseId, test_status: report.status, sap_sales_id: sapID }]);   
        })
       
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Error uploading file: ' + error.message });
    }
    fs.rm(`${process.cwd()}/playwright-testing/allure-results`, { recursive: true }, (err) => {
            if (err) {
                console.error('Error deleting the directory:', err);
            } else {
                console.log('Directory deleted successfully!');
            }
        });
    return NextResponse.json({ status: 200, message: "Report uploaded successfully", runID: uniqueRunID, salesOrderId: sapID });
}