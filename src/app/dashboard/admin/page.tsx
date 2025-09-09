import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            This is where admin users will manage students, drivers, and union accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Admin tools and tables will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
