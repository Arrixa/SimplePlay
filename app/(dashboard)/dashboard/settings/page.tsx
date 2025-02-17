import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default async function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Application Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">General Settings</p>
                <p className="mt-1 text-sm text-muted-foreground">Configure application settings and preferences.</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">Notification Settings</p>
                <p className="mt-1 text-sm text-muted-foreground">Manage your notification preferences and alerts.</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">API Configuration</p>
                <p className="mt-1 text-sm text-muted-foreground">Configure API settings and access tokens.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}