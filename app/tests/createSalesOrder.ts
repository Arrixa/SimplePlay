// tests/createSalesOrder.ts
import { chromium, Browser, Page } from 'playwright';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

export interface CreateSalesOrderResult {
    success: boolean;
    details: string;
    sapOrderNumber?: string;
    screenshotBase64?: string;
}

// // Dummy helper to simulate fetching CSV data from a database.
// async function getFileFromDatabase(filename: string): Promise<any[]> {
//     if (filename === 'login.csv') {
//         return [{ username: 'user1', password: 'pass1' }];
//     } else if (filename === 'salesOrder.csv') {
//         return [{
//             sales_order_type: 'Type A',
//             sales_organization: 'Org 1',
//             distribution_channel: 'Channel X',
//             division: 'Div 1',
//             sold_to_party: 'Party 123'
//         }];
//     } else if (filename === 'items.csv') {
//         return [{ product: 'Product ABC', requested_quantity: '10' }];
//     }
//     return [];
// }

export async function runCreateSalesOrderTest(): Promise<CreateSalesOrderResult> {
    let browser: Browser | undefined;
    
    try {
        // Launch browser
        browser = await chromium.launch();
        const context = await browser.newContext({ ignoreHTTPSErrors: true });
        const page: Page = await context.newPage();
        

        const loginDetails = parse(fs.readFileSync("./public/login.csv", 'utf8'), {
            columns: true,
            skip_empty_lines: true
        });

        const salesOrder = parse(fs.readFileSync("./public/salesOrder.csv", 'utf8'), {
            columns: true,
            skip_empty_lines: true
        });

        const itemDetails = parse(fs.readFileSync("./public/items.csv", 'utf8'), {
            columns: true,
            skip_empty_lines: true
        });
        // Load CSV data
        // const loginDetails = await getFileFromDatabase('login.csv');
        // const salesDetails = await getFileFromDatabase('salesOrder.csv');
        // const itemDetails = await getFileFromDatabase('items.csv');

        // --- Begin Test Steps ---
        // 1. Login
        await page.goto('https://stsrvr.mynetgear.com:44300/sap/bc/ui2/flp?sap-client=100&sap-language=EN#Shell-home');
        await page.getByRole('textbox', { name: 'User' }).fill(loginDetails[0].username);
        await page.getByRole('textbox', { name: 'User' }).press('Tab');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill(loginDetails[0].password);
        await page.getByRole('button', { name: 'Log On' }).click();
        await page.waitForSelector('#__header0-overflow', { state: 'visible' });
        ///

        /// Navigate to internal sales overview
        await page.locator('.sapMITHShowSubItemsIcon').nth(0).click();
        await page.locator('.sapMITBSelectListTextOnly li').nth(49).click();
        ////

        /// Create sales order 
        await page.locator('#__tile153-title').click(); //Click Manage sales order

        ///Create a sales order
        await page.getByRole('button', { name: 'Create ' }).click();
        await page.getByText('Create Sales Order', { exact: true }).click();
        await page.getByRole('dialog', { name: 'Create' }).click();
        await page.waitForTimeout(2000);

        //Fill create order form
        //1. Sales Order Type
        await page.locator('#APD_\\:\\:SalesOrderType-inner-inner').fill(salesOrder[0].sales_order_type);
        await page.keyboard.press('Enter');

        //2. Sales Organization
       // await page.getByRole('textbox', { name: 'Sales Organization' }).click();
        await page.locator('#APD_\\:\\:SalesOrganization-inner-inner').fill(salesOrder[0].sales_organization);
        await page.keyboard.press('Enter');
        //3. Distribution Channel
        await page.locator('#APD_\\:\\:DistributionChannel-inner-inner').fill(salesOrder[0].distribution_channel);
        await page.keyboard.press('Enter');
        //4. Divisoin Options
        await page.locator('#APD_\\:\\:OrganizationDivision-inner-inner').fill(salesOrder[0].division);
        await page.keyboard.press('Enter');
        //5. Confirm
        await page.getByRole('button', { name: 'Continue' }).click();

        //General Overview Page
        await page.locator('[id="cus\\.sd\\.salesorderv2\\.manage\\:\\:SalesOrderManageObjectPage--fe\\:\\:FormContainer\\:\\:OrderData\\:\\:FormElement\\:\\:DataField\\:\\:SoldToParty\\:\\:Field-edit-inner-vhi"]').click();
        
        // 4. Fill General Sales Information
        await page.locator('#cus\\.sd\\.salesorderv2\\.manage\\:\\:SalesOrderManageObjectPage--fe\\:\\:FormContainer\\:\\:OrderData\\:\\:FieldValueHelp\\:\\:SoldToParty\\:\\:Dialog\\:\\:qualifier\\:\\:-search-inner-I').fill(salesOrder[0].sold_to_party);
        await page.keyboard.press('Enter');
        await page.locator('#cus\\.sd\\.salesorderv2\\.manage\\:\\:SalesOrderManageObjectPage--fe\\:\\:FormContainer\\:\\:OrderData\\:\\:FieldValueHelp\\:\\:SoldToParty\\:\\:Dialog\\:\\:qualifier\\:\\:\\:\\:Table-innerTable-rows-row0-col1').click();
        // await page.waitForTimeout(500);

        // // 5. Navigate to Items section and fill item details
        await page.locator('#cus\\.sd\\.salesorderv2\\.manage\\:\\:SalesOrderManageObjectPage--fe\\:\\:ObjectPage-anchBar-cus\\.sd\\.salesorderv2\\.manage\\:\\:SalesOrderManageObjectPage--fe\\:\\:FacetSection\\:\\:SalesOrderItems-anchor').click();
        // await page.waitForTimeout(500);
        for (let i = 0; i < itemDetails.length; i++) {
            await page.locator('#__field7-__clone465-__clone484-inner-content > div').click();
            await page.fill(`#cus\\.sd\\.salesorderv2\\.manage\\:\\:SalesOrderManageObjectPage--fe\\:\\:table\\:\\:_Item\\:\\:LineItem\\:\\:TableValueHelp\\:\\:_Item\\:\\:Product\\:\\:Dialog\\:\\:qualifier\\:\\:-search-inner-I`, itemDetails[i].product);
            await page.keyboard.press('Enter');
            await page.waitForTimeout(500);
            await page.locator('#cus\\.sd\\.salesorderv2\\.manage\\:\\:SalesOrderManageObjectPage--fe\\:\\:table\\:\\:_Item\\:\\:LineItem\\:\\:TableValueHelp\\:\\:_Item\\:\\:Product\\:\\:Dialog\\:\\:qualifier\\:\\:\\:\\:Table-innerTable-rows-row0-col2').click();
            await page.locator('#__field9-__clone467-__clone485-inner-inner').fill(itemDetails[i].requested_quantity); 
            await page.keyboard.press('Enter');
            await page.waitForTimeout(500);
         }
        // await page.waitForTimeout(1000);

        // 6. Save the sales order using keyboard shortcuts
        await page.keyboard.press('ControlOrMeta+S');
        await page.waitForTimeout(2000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);

        // 7. Confirm and fetch SAP Order Number
        await page.click('#__button512');
        await page.waitForTimeout(2000);
        const sapOrderNumber = await page.locator('#__title26').innerText();
        console.log('SAP Order Number:', sapOrderNumber);
        await page.waitForTimeout(4000);

        // Capture a screenshot of the final page
        const screenshotBuffer = await page.screenshot();
        const screenshotBase64 = screenshotBuffer.toString('base64');

        // --- End Test Steps ---

        await browser.close();

        return {
            success: true,
            details: 'Sales order created successfully.',
            sapOrderNumber,
            screenshotBase64,
        };

    } catch (error: any) {
        if (browser) await browser.close();
        return {
            success: false,
            details: error.message,
        };
    }
}
