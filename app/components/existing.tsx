"use client"

import {useState } from 'react';



export default function TestRunner() {
    const [response, setResponse] = useState('');
    const [onereport, setOneReport] = useState('');
    const [reports, setReports] = useState('');
    const [runStatus, setRunStatus] = useState<string>('');
    const [runId, setRunId] = useState<string>('');
    const [reportStatus, setReportStatus] = useState<string>('');

    const handleOnChange =  (event:any) => {
        setRunId(event.target.value);
    }

    const handleClick = async () => {
        setResponse('');
        const data = { testCaseName: "dem" }; // Example data to send
        try {
            setRunStatus("Running");
            const res = await fetch('/api/run-tests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            setResponse(result);
            setRunStatus("Completed Successfully");
            addReport();
        } catch (error) {
            console.error('Error:', error);
            setRunStatus("Run Failed");
        }
    };
    const fetchReports = async () => {
        setReports('');
        try {
            
            const res = await fetch('/api/fetch-report', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                //  body: JSON.stringify(data),
            });

            const result = await res.json();
            setReports(result);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const fetchReportById = async () => {
        setOneReport('');
        try {
            const res = await fetch('http://localhost:54321/api/get-report-based-on-run/'+runId, {
                
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                //  body: JSON.stringify(data),
            });

            const result = await res.json();
            setOneReport(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addReport = async () => {
        setReportStatus('');
        try {
            const res = await fetch('/api/add-report', {

              
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //  body: JSON.stringify(data),
            });

            const result = await res.json();
            setReportStatus(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };
        
    
    return (
        <div>
            <button onClick={handleClick}>Create Basic Sales Order</button><br />
            {runStatus && <p>{runStatus}</p>}
            {response && <div>{JSON.stringify(response)}</div>}
           
            <div>
                Enter run id to fetch your report : <input type='text'
                    onChange={handleOnChange}
                    />
                    <button type="submit" onClick={fetchReportById}>Submit</button>
                </div>
            <div>
                {onereport && <div>{JSON.stringify(onereport)}</div>}
            </div>
            <br/>
            <br />
            <button onClick={addReport}>Add Report</button><br /> 
            {reportStatus && <div>{JSON.stringify(reportStatus)}</div>}
           
        </div>
    );
}
