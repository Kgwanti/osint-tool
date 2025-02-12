
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: number;
  userId: number;
  type: string;
  target: string;
  timestamp: string;
}

export const ActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch('http://0.0.0.0:3000/api/activity', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <p className="text-sm">
                {activity.type === 'profile_view' ? 'Viewed' : 'Searched for'} {activity.target}
              </p>
              <span className="text-xs text-gray-500">
                {new Date(activity.timestamp).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
