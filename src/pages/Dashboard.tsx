import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { api } from "@/lib/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);

  const stories = useMemo(
    () => [
      {
        id: "str_1",
        title: "Winter Supply Mission Reached 280 Families",
        story: "Cluster-based volunteer routing improved delivery speed and reduced emergency wait times.",
      },
      {
        id: "str_2",
        title: "School Access Drive Added 170 New Students",
        story: "Local coordinators and NGO teams expanded education kit reach across wards.",
      },
      {
        id: "str_3",
        title: "Community Health Camp Mobilized 19 Volunteers",
        story: "Medical support follow-up was mapped by neighborhood for faster outreach.",
      },
    ],
    [],
  );

  const loadOverview = async () => {
    try {
      setLoading(true);
      const data = await api.public.overview();
      setOverview(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
  }, []);

  if (loading) return <div className="min-h-screen p-8">Loading NGOConnect...</div>;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-background/85 backdrop-blur-sm border-b border-border sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">C</div>
            <div>
              <p className="font-bold text-lg">NGOConnect Explore</p>
              <p className="text-xs text-muted-foreground">See what is happening and where funding is going</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadOverview}>Refresh</Button>
            <Button className="bg-gradient-primary" onClick={() => (window.location.href = "/participate")}>Donate / Join / Track</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <Card className="border-0 shadow-elegant bg-gradient-to-r from-background to-accent/40">
          <CardContent className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Live NGO Activity Feed</h1>
              <p className="text-muted-foreground mt-2">Public transparency dashboard with anonymized donation insights.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>{overview?.totals?.organizations || 0} NGOs</Badge>
              <Badge variant="outline">{overview?.totals?.events || 0} Events</Badge>
              <Badge variant="outline">₹{Number(overview?.totals?.totalFunding || 0).toLocaleString("en-IN")}</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Campaigns</p><p className="text-3xl font-bold text-primary">{overview?.totals?.campaigns || 0}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Active Cases</p><p className="text-3xl font-bold text-primary">{overview?.totals?.activeCases || 0}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Events</p><p className="text-3xl font-bold text-primary">{overview?.totals?.events || 0}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Funding Mobilized</p><p className="text-3xl font-bold text-primary">₹{Number(overview?.totals?.totalFunding || 0).toLocaleString("en-IN")}</p></CardContent></Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="funding">Funding Feed</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader><CardTitle>Campaign Highlights</CardTitle><CardDescription>Track progress before you participate</CardDescription></CardHeader>
              <CardContent className="space-y-4 max-h-[430px] overflow-auto">
                {(overview?.campaigns || []).map((campaign: any) => {
                  const progress = campaign.goalAmount > 0 ? Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)) : 0;
                  return (
                    <div key={campaign.id} className="border rounded-lg p-3">
                      <p className="font-medium">{campaign.title}</p>
                      <p className="text-xs text-muted-foreground">{campaign.description}</p>
                      <Progress className="h-2 mt-2" value={progress} />
                      <p className="text-xs text-muted-foreground mt-1">₹{campaign.raisedAmount.toLocaleString("en-IN")} / ₹{campaign.goalAmount.toLocaleString("en-IN")}</p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader><CardTitle>NGO Event Calendar</CardTitle><CardDescription>Which organization is running what, where and when</CardDescription></CardHeader>
              <CardContent className="space-y-3 max-h-[430px] overflow-auto">
                {(overview?.events || []).map((event: any) => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.organization} • {event.location}</p>
                    <p className="text-xs text-muted-foreground">Date: {event.eventDate} • Status: {event.status}</p>
                    <p className="text-xs mt-1">Execution: {event.executionPlan || "Plan will be updated by NGO team."}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funding">
            <Card>
              <CardHeader><CardTitle>Anonymized Funding Feed</CardTitle><CardDescription>Donor names masked. No contact details shown.</CardDescription></CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-auto">
                {(overview?.fundingFeed || []).map((item: any) => (
                  <div key={item.id} className="border rounded-md p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.donor}</p>
                      <p className="text-xs text-muted-foreground">{item.campaignTitle}</p>
                    </div>
                    <p className="font-semibold text-primary">₹{Number(item.amount || 0).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories">
            <Card>
              <CardHeader><CardTitle>Community Stories</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {stories.map((story) => (
                  <div key={story.id} className="p-4 border rounded-lg">
                    <p className="font-semibold text-sm">{story.title}</p>
                    <p className="text-xs text-muted-foreground mt-2">{story.story}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
