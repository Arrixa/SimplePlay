// app/api/run-test/route.ts
import { runCreateSalesOrderTest } from '@/app/tests/createSalesOrder';
import type { NextRequest } from 'next/server';

interface RequestBody {
    testCase?: string;
}

export async function POST(request: NextRequest) {
    try {
        const { testCase }: RequestBody = await request.json();

        let result: any;
        if (testCase === 'createSalesOrder') {
            result = await runCreateSalesOrderTest();
        } else {
            result = { success: false, details: 'Test case not recognized' };
        }

        return new Response(
            JSON.stringify({
                testCase: testCase ?? 'unknown',
                result,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error: any) {
        console.error('Test execution failed:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
