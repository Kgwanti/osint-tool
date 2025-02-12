import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://0.0.0.0:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to sign in");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen"> {/* Adopted container styling */}
      <Card className="w-[400px]"> {/* Adopted card width */}
        <CardHeader>
          <CardTitle>Welcome Back, Kgwanti</CardTitle> {/* Kept original title */}
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button
            className="w-full"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}