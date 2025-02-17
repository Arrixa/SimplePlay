import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"

export default async function TargetsPage() {
  // In a real app, you would fetch targets data server-side
  const targets = {
    total: 15,
    active: 12,
    pending: 3
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Targets</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Active Targets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground">Total Targets</p>
                <p className="mt-2 text-2xl font-bold">{targets.total}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground">Active Scans</p>
                <p className="mt-2 text-2xl font-bold">{targets.active}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Setup</p>
                <p className="mt-2 text-2xl font-bold">{targets.pending}</p>
              </div>
            </div>
            <p className="text-muted-foreground">Configure and manage your scanning targets here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}