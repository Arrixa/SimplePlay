// app/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';


interface CreateSalesOrderResult {
    success: boolean;
    details: string;
    sapOrderNumber?: string;
    screenshotBase64?: string;
}

interface ApiResponse {
    testCase: string;
    result: CreateSalesOrderResult;
}

export default function Home() {
    const [selectedTest, setSelectedTest] = useState<string>('createSalesOrder');
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const runTest = async () => {
        setLoading(true);
        setApiResponse(null);
        setError(null);
        setShowDetails(false);

        try {
            const res = await fetch('/api/run-tests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ testCase: selectedTest }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Test failed');
            setApiResponse(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 font-sans">
            <h1 className="mb-4 text-3xl font-bold">Run Playwright Test</h1>

            <div className="mb-4 flex items-center space-x-2">
                <label htmlFor="test-select" className="text-gray-700">
                    Choose a test case:
                </label>
                <select
                    id="test-select"
                    value={selectedTest}
                    onChange={(e) => setSelectedTest(e.target.value)}
                    className="rounded border border-gray-300 p-2"
                >
                    <option value="createSalesOrder">Create Sales Order</option>
                    {/* Add more test cases as needed */}
                </select>
            </div>

            <Button onClick={runTest} disabled={loading}>
                {loading ? 'Running...' : 'Run Test'}
            </Button>

            {apiResponse && (
                <div className="mt-6 rounded-lg border border-green-400 bg-green-50 p-4 text-green-700">
                    <h3 className="mb-2 text-xl font-semibold">Basic Result:</h3>
                    <pre className="whitespace-pre-wrap">
                        {JSON.stringify({ success: apiResponse.result.success, details: apiResponse.result.details }, null, 2)}
                    </pre>
                    <Button
                        onClick={() => setShowDetails((prev) => !prev)}
                        className="mt-4 bg-gray-600 hover:bg-gray-700"
                    >
                        {showDetails ? 'Hide Detailed Result' : 'Show Detailed Result'}
                    </Button>

                    {showDetails && (
                        <div className="mt-6 rounded-lg border border-blue-400 bg-blue-50 p-4 text-blue-700">
                            <h4 className="mb-2 text-lg font-semibold">Detailed Result:</h4>
                            {apiResponse.result.sapOrderNumber && (
                                <p>
                                    <strong>SAP Order Number:</strong> {apiResponse.result.sapOrderNumber}
                                </p>
                            )}
                            {apiResponse.result.screenshotBase64 && (
                                <div className="mt-4">
                                    <h5 className="mb-2 text-md font-semibold">Screenshot:</h5>
                                    <img
                                        src={`data:image/png;base64,${apiResponse.result.screenshotBase64}`}
                                        alt="Test Screenshot"
                                        className="max-w-md rounded-md border"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="mt-6 rounded-lg border border-red-400 bg-red-50 p-4 text-red-700">
                    <p>Error: {error}</p>
                </div>
            )}
        </main>
    );
}
