
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Helper functions for local storage persistence (same as in Auth.tsx)
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

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Egypt",
  "Saudi Arabia",
  "UAE",
  "India",
  "China",
  "Japan",
  "Brazil",
  "Mexico",
  "South Africa",
];

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/auth");
      return;
    }

    // Set user data
    setUser(currentUser);
    setName(currentUser.name || "");
    setEmail(currentUser.email || "");
    setCountry(currentUser.country || "");
  }, [navigate]);

  const handleUpdateProfile = () => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Get all users
    const users = getUsers();
    
    // Update the current user's information
    const updatedUser = {
      ...user,
      name,
      country,
    };
    
    // Update the user in the users array
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? updatedUser : u
    );
    
    // Save the updated users array
    saveUsers(updatedUsers);
    
    // Update the current user
    saveCurrentUser(updatedUser);
    setUser(updatedUser);
    
    // Show success message
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully");
    }, 500);
  };

  const handleChangePassword = () => {
    if (!user) return;
    
    if (currentPassword !== user.password) {
      toast.error("Current password is incorrect");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Get all users
    const users = getUsers();
    
    // Update the current user's password
    const updatedUser = {
      ...user,
      password: newPassword,
    };
    
    // Update the user in the users array
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? updatedUser : u
    );
    
    // Save the updated users array
    saveUsers(updatedUsers);
    
    // Update the current user
    saveCurrentUser(updatedUser);
    setUser(updatedUser);
    
    // Reset password fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
    
    // Show success message
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password changed successfully");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
            
            <div className="space-y-8">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={email} 
                        disabled 
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleUpdateProfile} 
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Security</h2>
                
                {!isChangingPassword ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsChangingPassword(true)}
                  >
                    Change Password
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleChangePassword}
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Update Password"}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsChangingPassword(false);
                          setCurrentPassword("");
                          setNewPassword("");
                          setConfirmPassword("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
              
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <p className="text-muted-foreground mb-4">
                  Add your payment details to receive your earnings.
                </p>
                <Button disabled>
                  Coming Soon
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
