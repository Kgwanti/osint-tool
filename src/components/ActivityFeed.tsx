import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ActivityFeed = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div>No recent activity</div>
      </CardContent>
    </Card>
  );
};