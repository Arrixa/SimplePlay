import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default async function ReportsPage() {
  // In a real app, you would fetch reports data server-side
  const reports = {
    total: 45,
    thisWeek: 12,
    pending: 3
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Security Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="mt-2 text-2xl font-bold">{reports.total}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground">Generated This Week</p>
                <p className="mt-2 text-2xl font-bold">{reports.thisWeek}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="mt-2 text-2xl font-bold">{reports.pending}</p>
              </div>
            </div>
            <p className="text-muted-foreground">Access and generate detailed security reports and analyses.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}