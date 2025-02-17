
import Home from "@/app/components/createSalesOrder"
import TestRunner from "@/app/components/existing"
import FileUploader from "@/app/components/files"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"

export default async function TestRunnerPage() {
    // In a real app, you would fetch targets data server-side
    const targets = {
        total: 15,
        active: 12,
        pending: 3
    }
    

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Test Runner</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Upload file to Test
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-4">
                                <FileUploader/>
                            </div>
                        </div>
                        <p className="text-muted-foreground">Configure and manage your scanning targets here.</p>
                    </div>
                </CardContent>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Run Existing Tests
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-4">
                                <Home />
                            </div>
                        </div>
                        <p className="text-muted-foreground">Configure and manage your scanning targets here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}