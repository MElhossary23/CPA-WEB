
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Wallet, Bitcoin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const paymentMethods = [
  {
    id: "paypal",
    name: "PayPal",
    icon: <CreditCard className="h-5 w-5" />,
    placeholder: "Enter PayPal email",
    inputType: "email"
  },
  {
    id: "payeer",
    name: "Payeer",
    icon: <CreditCard className="h-5 w-5" />,
    placeholder: "Enter Payeer ID",
    inputType: "text"
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: <Bitcoin className="h-5 w-5" />,
    placeholder: "Enter Bitcoin wallet address",
    inputType: "text"
  },
  {
    id: "eth",
    name: "Ethereum",
    icon: <Wallet className="h-5 w-5" />,
    placeholder: "Enter Ethereum wallet address",
    inputType: "text"
  }
];

export default function Withdraw() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [recipientInfo, setRecipientInfo] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    
    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive"
      });
      return;
    }
    
    if (isNaN(amountValue) || amountValue < 0.5) {
      toast({
        title: "Error",
        description: "Minimum withdrawal amount is $0.5",
        variant: "destructive"
      });
      return;
    }
    
    if (!recipientInfo) {
      toast({
        title: "Error",
        description: "Please enter recipient information",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Withdrawal Requested",
      description: `Your withdrawal of $${amountValue.toFixed(2)} via ${
        paymentMethods.find(method => method.id === selectedMethod)?.name
      } has been submitted.`
    });
    
    // Reset form
    setAmount("");
    setRecipientInfo("");
    setSelectedMethod(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary/95 backdrop-blur-md text-white shadow-md">
        <Container>
          <div className="flex items-center py-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white mr-2" 
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-2xl font-bold">ElHossary</span>
          </div>
        </Container>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 py-8">
        <Container size="small">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Withdraw Funds</h1>
              <p className="text-muted-foreground">Minimum withdrawal amount: $0.5</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
                <CardDescription>Choose how you want to receive your funds</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {paymentMethods.map((method) => (
                    <Button
                      key={method.id}
                      variant={selectedMethod === method.id ? "default" : "outline"}
                      className="flex flex-col items-center justify-center h-24 gap-2"
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      {method.icon}
                      <span>{method.name}</span>
                    </Button>
                  ))}
                </div>
                
                {selectedMethod && (
                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (USD)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        min="0.5"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="recipient">
                        {paymentMethods.find(method => method.id === selectedMethod)?.name} Details
                      </Label>
                      <Input
                        id="recipient"
                        type={paymentMethods.find(method => method.id === selectedMethod)?.inputType || "text"}
                        placeholder={paymentMethods.find(method => method.id === selectedMethod)?.placeholder}
                        value={recipientInfo}
                        onChange={(e) => setRecipientInfo(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Withdraw Funds
                    </Button>
                  </form>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col items-start border-t pt-6">
                <p className="text-sm text-muted-foreground">
                  Withdrawals are typically processed within 24-48 hours. 
                  Contact support if you have any issues.
                </p>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </main>
    </div>
  );
}
