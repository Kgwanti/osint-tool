
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const UserProfile = ({ userId }: { userId: number }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm">User ID: {userId}</div>
      </CardContent>
    </Card>
  );
};
