
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Reveal } from "@/components/ui/reveal";
import { toast } from "sonner";

// Helper functions for local storage persistence
const getUsers = () => {
  try {
    const usersJSON = localStorage.getItem("elhossary_users");
    return usersJSON ? JSON.parse(usersJSON) : [];
  } catch (error) {
    console.error("Error parsing users from localStorage:", error);
    return [];
  }
};

const saveUsers = (users: any[]) => {
  localStorage.setItem("elhossary_users", JSON.stringify(users));
};

const getCurrentUser = () => {
  try {
    const userJSON = localStorage.getItem("elhossary_currentUser");
    return userJSON ? JSON.parse(userJSON) : null;
  } catch (error) {
    console.error("Error parsing current user from localStorage:", error);
    return null;
  }
};

const saveCurrentUser = (user: any) => {
  localStorage.setItem("elhossary_currentUser", JSON.stringify(user));
};

export default function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Password validation
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get users from localStorage
    const users = getUsers();
    
    // Find the user with the provided email
    const user = users.find((u: any) => u.email === loginEmail);
    
    if (user && user.password === loginPassword) {
      // Set the current user in localStorage
      saveCurrentUser(user);
      
      setTimeout(() => {
        setIsLoading(false);
        toast.success("You have been logged in successfully.");
        navigate("/dashboard");
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast.error("Invalid email or password.");
      }, 1000);
    }
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate password
    if (!validatePassword(registerPassword)) {
      return;
    }
    
    setIsLoading(true);
    
    // Get existing users from localStorage
    const users = getUsers();
    
    // Check if the email already exists
    const emailExists = users.some((user: any) => user.email === registerEmail);
    
    if (emailExists) {
      setTimeout(() => {
        setIsLoading(false);
        toast.error("Email already exists. Please use a different email.");
      }, 1000);
      return;
    }
    
    // Create a new user
    const newUser = {
      id: Date.now().toString(),
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      country: "", // Default empty country
    };
    
    // Add the new user to the array
    users.push(newUser);
    
    // Save the updated users array in localStorage
    saveUsers(users);
    
    setTimeout(() => {
      setIsLoading(false);
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      toast.success("Account created successfully. Please login.");
      setActiveTab("login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-16">
        <Container size="small">
          <Reveal>
            <div className="max-w-md mx-auto bg-card rounded-2xl overflow-hidden border border-border/50 shadow-xl">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="login" className="p-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot Password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-white rounded-full h-12"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="p-6">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={registerPassword}
                        onChange={(e) => {
                          setRegisterPassword(e.target.value);
                          validatePassword(e.target.value);
                        }}
                      />
                      {passwordError && (
                        <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Password must be at least 8 characters long.
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-white rounded-full h-12"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>

                    <p className="text-sm text-center text-muted-foreground">
                      By registering, you agree to our{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </Reveal>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
