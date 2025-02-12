
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ActivityFeed = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm">No recent activity</div>
      </CardContent>
    </Card>
  );
};
