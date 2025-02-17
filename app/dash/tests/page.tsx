
import Home from "@/app/components/createSalesOrder"
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
       
            
    
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-4">
                                <Home />
                            </div>
                        </div>
                    </div>
    )
}