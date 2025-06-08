import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { NetworkCard } from "@/components/NetworkCard";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { getUserBalance, getUserEarnings, formatCurrency, type UserBalance, type Earning } from "@/utils/earningsService";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("offers");
  const [userData, setUserData] = useState<any>(null);
  const [userBalance, setUserBalance] = useState<UserBalance | null>(null);
  const [userEarnings, setUserEarnings] = useState<Earning[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("elhossary_currentUser");
    if (!currentUser) {
      navigate("/auth");
      return;
    }

    const user = JSON.parse(currentUser);
    setUserData(user);

    // Load user balance and earnings
    const balance = getUserBalance(user.id);
    const earnings = getUserEarnings(user.id);
    setUserBalance(balance);
    setUserEarnings(earnings);

    toast.info("Welcome! Offer completions will be tracked via the postback API.");
  }, [navigate]);

  const generateOfferLink = (baseUrl: string, userId: string) => {
    if (baseUrl.includes("monlix")) {
      return `${baseUrl}?appid=7212&userid=${userId}`;
    } else if (baseUrl.includes("adgate")) {
      return `${baseUrl}${userId}#loaded=true&hasOffers=true`;
    } else if (baseUrl.includes("torox")) {
      return `${baseUrl}/20323/${userId}/7977`;
    }
    return baseUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem("elhossary_currentUser");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!userData) {
    return null;
  }

  const userId = userData.id || "24a234d";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary/95 backdrop-blur-md text-white shadow-md">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">ElHossary</span>
              <nav className="hidden md:flex items-center space-x-6 ml-10">
                <button
                  onClick={() => setActiveTab("offers")}
                  className={`text-white/90 hover:text-white transition-colors px-2 py-1 ${activeTab === "offers"
                    ? "border-b-2 border-white font-medium"
                    : ""
                    }`}
                >
                  Offers
                </button>
                <button
                  onClick={() => setActiveTab("earnings")}
                  className={`text-white/90 hover:text-white transition-colors px-2 py-1 ${activeTab === "earnings"
                    ? "border-b-2 border-white font-medium"
                    : ""
                    }`}
                >
                  Earnings
                </button>
                <Link
                  to="/profile"
                  className="text-white/90 hover:text-white transition-colors px-2 py-1"
                >
                  Profile
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-white font-medium px-4 py-2 bg-white/10 rounded-md border border-white/20">
                Balance: {userBalance ? formatCurrency(userBalance.availableBalance) : '$0.00'}
              </div>
              <Button
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate("/withdraw")}
              >
                Withdraw
              </Button>
              <Button
                className="bg-white text-primary hover:bg-white/90"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main className="flex-1 py-8">
        <Container>
          {activeTab === "offers" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Available Offers</h1>
                <div className="flex items-center space-x-4">
                  <Button variant="outline">
                    Filter
                  </Button>
                  <Button variant="outline">
                    Sort
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <NetworkCard
                  name="Monlix"
                  description="Complete simple tasks and offers to earn cash and rewards."
                  imageUrl="https://offers.monlix.com/v1/icons/monlix-logo.svg"
                  offerUrl={generateOfferLink("https://offers.monlix.com", userId)}
                />
                <NetworkCard
                  name="Tyrads"
                  description="Earn through premium surveys and marketing research opportunities."
                  imageUrl="https://tyrads.com/wp-content/uploads/2022/07/Logo-1-e1682960338366.png"
                  isComingSoon={true}
                />
                <NetworkCard
                  name="AdGem"
                  description="Earn through app installs, surveys, and various trial offers."
                  imageUrl="https://adgem.com/wp-content/uploads/2019/03/AdGem_Logo_Large.png"
                  isComingSoon={true}
                />
                <NetworkCard
                  name="AdGate Media"
                  description="Complete surveys, watch videos, and more to earn rewards."
                  imageUrl="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_4491937cbde9368aa6f1511c51415021/adgate-media.png"
                  offerUrl={generateOfferLink("https://wall.adgaterewards.com/nqmTrg/", userId)}
                />
                <NetworkCard
                  name="Torox"
                  description="Get rewarded for watching video ads and completing simple tasks."
                  imageUrl="https://s3-eu-west-1.amazonaws.com/tpd/logos/6565ae1ff7fc2e73d9cd3925/0x0.png"
                  offerUrl={generateOfferLink("https://torox.io/ifr/show", userId)}
                />
              </div>
            </div>
          )}

          {activeTab === "earnings" && (
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Your Earnings</h1>

              {/* Balance Summary */}
              {userBalance && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-muted-foreground">Total Earnings</h3>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(userBalance.totalEarnings)}</p>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-muted-foreground">Available Balance</h3>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(userBalance.availableBalance)}</p>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-muted-foreground">Pending</h3>
                      <p className="text-2xl font-bold text-orange-600">{formatCurrency(userBalance.pendingBalance)}</p>
                    </div>
                  </Card>
                </div>
              )}

              {/* Earnings History */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Earnings History</h3>
                {userEarnings.length > 0 ? (
                  <div className="space-y-4">
                    {userEarnings.map((earning) => (
                      <div key={earning.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{earning.offerName || earning.appId}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(earning.timestamp).toLocaleDateString()} at {new Date(earning.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{formatCurrency(earning.amount)}</p>
                          <p className={`text-sm ${earning.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>
                            {earning.status === 'completed' ? 'Completed' : 'Pending'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <p className="text-lg text-muted-foreground">You haven't earned anything yet.</p>
                    <p>Complete offers to start earning!</p>
                    <Button
                      className="mt-4"
                      onClick={() => setActiveTab("offers")}
                    >
                      Browse Offers
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}
