import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default async function AnalyticsPage() {
  // In a real app, you would fetch analytics data server-side
  const analytics = {
    scansThisMonth: 128,
    vulnerabilitiesFixed: 89,
    averageResponseTime: "2.4"
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Security Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground">Scans This Month</p>
                <p className="mt-2 text-2xl font-bold">{analytics.scansThisMonth}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground">Vulnerabilities Fixed</p>
                <p className="mt-2 text-2xl font-bold">{analytics.vulnerabilitiesFixed}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground">Average Response Time</p>
                <p className="mt-2 text-2xl font-bold">{analytics.averageResponseTime} days</p>
              </div>
            </div>
            <p className="text-muted-foreground">View detailed analytics and trends for your security posture.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}