import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default async function DashboardPage() {
  // In a real app, you would fetch this data server-side
  const stats = {
    totalScans: { value: 128, change: "+14%" },
    vulnerabilities: { value: 23, breakdown: "Critical: 5, High: 8, Medium: 10" },
    resolvedIssues: { value: 89, change: "+23%" },
    pendingReviews: { value: 12, responseTime: "2.4" }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalScans.value}</div>
            <p className="text-xs text-muted-foreground">{stats.totalScans.change} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vulnerabilities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vulnerabilities.value}</div>
            <p className="text-xs text-muted-foreground">{stats.vulnerabilities.breakdown}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resolvedIssues.value}</div>
            <p className="text-xs text-muted-foreground">{stats.resolvedIssues.change} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews.value}</div>
            <p className="text-xs text-muted-foreground">Average response: {stats.pendingReviews.responseTime} days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}