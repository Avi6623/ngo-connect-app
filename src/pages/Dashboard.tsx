import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-xl text-foreground">NGO Connect Portal</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Welcome Back!</Badge>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your NGO operations from here</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-elegant">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Volunteers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">245</div>
              <p className="text-sm text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">89</div>
              <p className="text-sm text-muted-foreground">+5 this month</p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₹2,45,000</div>
              <p className="text-sm text-muted-foreground">+₹25,000 this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>👥</span>
                <span>Volunteer Management</span>
              </CardTitle>
              <CardDescription>
                Register, manage, and coordinate volunteers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  View All Volunteers
                </Button>
                <Button className="w-full bg-gradient-primary">
                  Add New Volunteer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>💝</span>
                <span>Donor Management</span>
              </CardTitle>
              <CardDescription>
                Track donors and manage contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  View All Donors
                </Button>
                <Button className="w-full bg-gradient-primary">
                  Add New Donor
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>📊</span>
                <span>Donation History</span>
              </CardTitle>
              <CardDescription>
                View and track all donation records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  View History
                </Button>
                <Button className="w-full bg-gradient-primary">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>📞</span>
                <span>Contact Support</span>
              </CardTitle>
              <CardDescription>
                Get help and support for your NGO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  📧 avneesh.amity@gmail.com
                </p>
                <p className="text-sm text-muted-foreground">
                  📞 +91 7307890041
                </p>
                <p className="text-sm text-muted-foreground">
                  📍 Lucknow, UP
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>⚙️</span>
                <span>Settings</span>
              </CardTitle>
              <CardDescription>
                Configure your account and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Account Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>📈</span>
                <span>Analytics</span>
              </CardTitle>
              <CardDescription>
                View insights and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-primary">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Card className="shadow-elegant bg-gradient-accent">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ready to expand your functionality?
              </h3>
              <p className="text-muted-foreground mb-4">
                Connect to Supabase to enable full authentication, database storage, and advanced features.
              </p>
              <Button variant="outline">
                Learn More About Supabase Integration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;