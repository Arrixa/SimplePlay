import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug } from "lucide-react"

export default async function VulnerabilitiesPage() {
  // In a real app, you would fetch vulnerabilities data server-side
  const vulnerabilities = {
    critical: 5,
    high: 8,
    medium: 10,
    low: 15
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Vulnerabilities</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Detected Vulnerabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg border p-4 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50">
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Critical</p>
                <p className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">{vulnerabilities.critical}</p>
              </div>
              <div className="rounded-lg border p-4 border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/50">
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">High</p>
                <p className="mt-2 text-2xl font-bold text-orange-600 dark:text-orange-400">{vulnerabilities.high}</p>
              </div>
              <div className="rounded-lg border p-4 border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/50">
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Medium</p>
                <p className="mt-2 text-2xl font-bold text-yellow-600 dark:text-yellow-400">{vulnerabilities.medium}</p>
              </div>
              <div className="rounded-lg border p-4 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Low</p>
                <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">{vulnerabilities.low}</p>
              </div>
            </div>
            <p className="text-muted-foreground">View and manage detected vulnerabilities across your applications.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}