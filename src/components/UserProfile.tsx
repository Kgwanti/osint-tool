
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  image: string;
}

export const UserProfile = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`http://0.0.0.0:3000/api/users/${userId}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </CardContent>
    </Card>
  );
};
