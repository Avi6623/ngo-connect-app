import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

const Index = () => {
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    api.public.overview().then(setOverview).catch(() => null);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Impact At A Glance</h2>
            <p className="text-muted-foreground mt-2">Live community metrics from active NGO operations</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Partner NGOs</p><p className="text-3xl font-bold text-primary">{overview?.totals?.organizations || 0}</p></CardContent></Card>
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Active Campaigns</p><p className="text-3xl font-bold text-primary">{overview?.totals?.campaigns || 0}</p></CardContent></Card>
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Live Events</p><p className="text-3xl font-bold text-primary">{overview?.totals?.events || 0}</p></CardContent></Card>
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Funding Mobilized</p><p className="text-3xl font-bold text-primary">₹{Number(overview?.totals?.totalFunding || 0).toLocaleString("en-IN")}</p></CardContent></Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Campaign Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(overview?.campaigns || []).slice(0, 3).map((campaign: any) => (
                  <div key={campaign.id} className="p-3 rounded-lg border">
                    <p className="font-medium">{campaign.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{campaign.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">Raised ₹{campaign.raisedAmount.toLocaleString("en-IN")} / ₹{campaign.goalAmount.toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-elegant bg-gradient-accent">
              <CardHeader>
                <CardTitle>Join As Volunteer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Participate in local events, case response, and fundraising support drives.</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">Event Participation</Badge>
                  <Badge variant="outline">Field Outreach</Badge>
                  <Badge variant="outline">Relief Operations</Badge>
                </div>
                <Button className="bg-gradient-primary" onClick={() => (window.location.href = "/dashboard")}>Go To NGOConnect Portal</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
