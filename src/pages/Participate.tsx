import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";

const Participate = () => {
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [report, setReport] = useState<any>(null);
  const [donationForm, setDonationForm] = useState({ donorName: "", donorEmail: "", amount: "", campaignId: "" });
  const [volunteerForm, setVolunteerForm] = useState({ name: "", email: "", skills: "", availability: "weekends" });
  const [eventJoinForm, setEventJoinForm] = useState({ participantName: "", participantEmail: "", eventId: "" });
  const [trackEmail, setTrackEmail] = useState("");

  const loadBase = async () => {
    const [eventList, campaignList] = await Promise.all([api.events.list(), api.campaigns.list()]);
    setEvents(eventList);
    setCampaigns(campaignList);
  };

  useEffect(() => {
    loadBase().catch(() => null);
  }, []);

  const donate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.donations.create({ ...donationForm, amount: Number(donationForm.amount), campaignId: donationForm.campaignId || null });
      setMessage("Donation submitted. You can now track where your contribution is being mapped.");
      setDonationForm({ donorName: "", donorEmail: "", amount: "", campaignId: "" });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to donate");
    }
  };

  const volunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.volunteers.create({
        name: volunteerForm.name,
        email: volunteerForm.email,
        skills: volunteerForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
        availability: volunteerForm.availability,
      });
      setMessage("Volunteer request submitted.");
      setVolunteerForm({ name: "", email: "", skills: "", availability: "weekends" });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to register volunteer");
    }
  };

  const joinEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.events.join(eventJoinForm.eventId, {
        participantName: eventJoinForm.participantName,
        participantEmail: eventJoinForm.participantEmail,
      });
      setMessage("Event participation confirmed.");
      setEventJoinForm({ participantName: "", participantEmail: "", eventId: "" });
      loadBase();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to join event");
    }
  };

  const trackDonations = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.public.donorReport(trackEmail);
      setReport(data);
      setMessage("");
    } catch (error) {
      setReport(null);
      setMessage(error instanceof Error ? error.message : "Failed to load donation report");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 md:p-8">
      <div className="container mx-auto space-y-5">
        <div>
          <h1 className="text-3xl font-bold">NGOConnect Participation Hub</h1>
          <p className="text-muted-foreground">Donate, join events, volunteer, and track contribution usage.</p>
          {message && <p className="text-sm text-primary mt-2">{message}</p>}
        </div>

        <Tabs defaultValue="donate" className="space-y-4">
          <TabsList className="grid grid-cols-4 max-w-3xl">
            <TabsTrigger value="donate">Donate</TabsTrigger>
            <TabsTrigger value="join">Join Event</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
            <TabsTrigger value="track">Track Money</TabsTrigger>
          </TabsList>

          <TabsContent value="donate">
            <Card>
              <CardHeader><CardTitle>Make a Donation</CardTitle><CardDescription>Donor + email required for traceability</CardDescription></CardHeader>
              <CardContent>
                <form className="space-y-2" onSubmit={donate}>
                  <Input placeholder="Full name" value={donationForm.donorName} onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })} required />
                  <Input type="email" placeholder="Email for tracking" value={donationForm.donorEmail} onChange={(e) => setDonationForm({ ...donationForm, donorEmail: e.target.value })} required />
                  <Input type="number" placeholder="Amount" value={donationForm.amount} onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })} required />
                  <select className="w-full p-2 border border-border rounded-md bg-background" value={donationForm.campaignId} onChange={(e) => setDonationForm({ ...donationForm, campaignId: e.target.value })}>
                    <option value="">General Support</option>
                    {campaigns.map((campaign) => <option key={campaign.id} value={campaign.id}>{campaign.title}</option>)}
                  </select>
                  <Button className="w-full bg-gradient-primary">Donate Now</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="join">
            <Card>
              <CardHeader><CardTitle>Join an Event</CardTitle></CardHeader>
              <CardContent>
                <form className="space-y-2" onSubmit={joinEvent}>
                  <Input placeholder="Your name" value={eventJoinForm.participantName} onChange={(e) => setEventJoinForm({ ...eventJoinForm, participantName: e.target.value })} required />
                  <Input type="email" placeholder="Email" value={eventJoinForm.participantEmail} onChange={(e) => setEventJoinForm({ ...eventJoinForm, participantEmail: e.target.value })} required />
                  <select className="w-full p-2 border border-border rounded-md bg-background" value={eventJoinForm.eventId} onChange={(e) => setEventJoinForm({ ...eventJoinForm, eventId: e.target.value })} required>
                    <option value="">Select event</option>
                    {events.map((event) => <option key={event.id} value={event.id}>{event.title} - {event.location}</option>)}
                  </select>
                  <Button className="w-full bg-gradient-primary">Join Event</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteer">
            <Card>
              <CardHeader><CardTitle>Volunteer Registration</CardTitle></CardHeader>
              <CardContent>
                <form className="space-y-2" onSubmit={volunteer}>
                  <Input placeholder="Name" value={volunteerForm.name} onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })} required />
                  <Input type="email" placeholder="Email" value={volunteerForm.email} onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })} required />
                  <Input placeholder="Skills" value={volunteerForm.skills} onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })} />
                  <Input placeholder="Availability" value={volunteerForm.availability} onChange={(e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value })} />
                  <Button className="w-full bg-gradient-primary">Submit Volunteer Form</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track">
            <Card>
              <CardHeader><CardTitle>Track My Money</CardTitle><CardDescription>See where your donations are mapped (campaign and linked events)</CardDescription></CardHeader>
              <CardContent className="space-y-3">
                <form className="flex gap-2" onSubmit={trackDonations}>
                  <Input type="email" placeholder="Enter donor email" value={trackEmail} onChange={(e) => setTrackEmail(e.target.value)} required />
                  <Button variant="outline">Track</Button>
                </form>

                {report && (
                  <div className="space-y-2">
                    <p className="text-sm">Total Donations: <span className="font-semibold">₹{Number(report.totalAmount || 0).toLocaleString("en-IN")}</span> ({report.donationCount})</p>
                    {report.trace.map((item: any) => (
                      <div key={item.donationId} className="border rounded-md p-3">
                        <p className="text-sm font-medium">₹{Number(item.amount || 0).toLocaleString("en-IN")} donated on {new Date(item.donatedAt).toLocaleDateString()}</p>
                        {item.campaign && <p className="text-xs text-muted-foreground">Campaign: {item.campaign.title} • {item.campaign.location}</p>}
                        {item.mappedEvent && <p className="text-xs text-muted-foreground">Mapped Event: {item.mappedEvent.title} • {item.mappedEvent.location} ({item.mappedEvent.status})</p>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Participate;
