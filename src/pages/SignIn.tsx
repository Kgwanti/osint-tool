
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full"
            onClick={() => {
              fetch('http://0.0.0.0:3000/api/auth/signin', {
                method: 'POST',
                credentials: 'include'
              })
              .then(res => {
                if (res.ok) {
                  window.location.href = '/';
                }
              });
            }}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
