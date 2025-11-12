import { useState, type FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label"; 
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Header */}
        <Link
          to="/"
          className="text-[24px] font-black flex items-center  justify-center gap-1 mx-3 pt-2"
        >
          <span className="size-6 rounded-[4px] border text-black bg-lime-200 border-black shadow-[3px_3px_0_0_#000000] flex items-center justify-center">
            B
          </span>
          <span className="inline">rutalism</span>
        </Link>

        {/* Login Card */}
        <div className="bg-card flex flex-col gap-6 rounded-[12px] border p-6 space-y-3 shadow-md">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 border border-black text-red-900 text-sm flex items-center gap-2">
                <AlertCircle className="size-4" />
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="sarah.johnson@techcorp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="SecurePass123!"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
