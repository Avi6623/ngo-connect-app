import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/ngo-hero.jpg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, saveAuth, type UserRole } from "@/lib/api";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", password: "", confirmPassword: "", userType: "volunteer", name: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const response = await api.auth.login(loginData);
      saveAuth({ token: response.token, user: response.user });
      navigate("/participate");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      const response = await api.auth.register({
        email: signupData.email,
        password: signupData.password,
        role: signupData.userType as UserRole,
        name: signupData.name || signupData.email.split("@")[0],
      });
      saveAuth({ token: response.token, user: response.user });
      navigate("/participate");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <img src={heroImage} alt="NGO community" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-emerald-900/60" />

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/25 rounded-2xl shadow-2xl animate-float relative z-10">
        <CardHeader className="text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">C</div>
            <span className="text-xl font-bold">NGOConnect</span>
          </div>
          <CardTitle className="text-2xl">Public Access Portal</CardTitle>
          <CardDescription className="text-white/80">For donors, volunteers, and community participants</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-3 mt-3">
              <form onSubmit={handleLogin} className="space-y-3 text-white">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required className="bg-white/10 border-white/20 text-white placeholder:text-white/60" placeholder="donor@ngoserve.local" />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required className="bg-white/10 border-white/20 text-white placeholder:text-white/60" placeholder="Enter password" />
                </div>
                <Button className="w-full bg-gradient-primary h-11" disabled={isLoading}>{isLoading ? "Signing in..." : "Continue"}</Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-3 mt-3">
              <form onSubmit={handleSignup} className="space-y-3">
                <select className="w-full p-2 border border-white/20 rounded-md bg-white/10 text-white" value={signupData.userType} onChange={(e) => setSignupData({ ...signupData, userType: e.target.value })}>
                  <option value="volunteer">Volunteer</option>
                  <option value="donor">Donor</option>
                  <option value="admin">NGO Admin</option>
                </select>
                <Input value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} placeholder="Name" className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
                <Input type="email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required placeholder="Email" className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
                <Input type="password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required placeholder="Password" className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
                <Input type="password" value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} required placeholder="Confirm password" className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
                <Button className="w-full bg-gradient-primary h-11" disabled={isLoading}>{isLoading ? "Creating..." : "Create Account"}</Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-xs text-white/85 space-y-1">
            <p>Sample password: password123</p>
            <p>admin@ngoserve.local | donor@ngoserve.local | volunteer@ngoserve.local</p>
            {message && <p className="text-red-300">{message}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
