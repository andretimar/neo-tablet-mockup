import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("test.operator@gmail.com");
  const [password, setPassword] = useState("********");
  const [plant, setPlant] = useState("SK - Komárno");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/warning");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="space-y-2 text-center">
          <img 
            src="/lovable-uploads/27cfb7e4-f2d9-49bc-916e-c23fab664e1e.png" 
            alt="NEO Industries" 
            className="h-12 mx-auto mb-8"
          />
          <p className="text-center text-white">
            Welcome to the NEO Operation application. Please select your plant below and click the login button below.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 text-white placeholder:text-white/70"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 text-white placeholder:text-white/70"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Plant</Label>
            <Select value={plant} onValueChange={setPlant}>
              <SelectTrigger className="bg-white/10 text-white border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SK - Komárno">SK - Komárno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-white text-blue hover:bg-white/90">
            Log In
          </Button>

          <p className="text-center text-sm text-white/70">
            If you don't have an account yet please contact your plant manager.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;