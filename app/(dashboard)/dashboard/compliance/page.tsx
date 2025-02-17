import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default async function CompliancePage() {
  // In a real app, you would fetch compliance data server-side
  const compliance = {
    compliant: 85,
    inProgress: 10,
    nonCompliant: 5
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Compliance</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4 border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/50">
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Compliant</p>
                <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">{compliance.compliant}%</p>
              </div>
              <div className="rounded-lg border p-4 border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/50">
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">In Progress</p>
                <p className="mt-2 text-2xl font-bold text-yellow-600 dark:text-yellow-400">{compliance.inProgress}%</p>
              </div>
              <div className="rounded-lg border p-4 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50">
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Non-Compliant</p>
                <p className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">{compliance.nonCompliant}%</p>
              </div>
            </div>
            <p className="text-muted-foreground">Monitor and manage compliance requirements and standards.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}