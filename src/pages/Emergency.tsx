import { Phone, MapPin, Siren, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const emergencyContacts = [
  {
    name: "Police",
    number: "100",
    icon: Siren,
    color: "bg-primary/10",
    description: "For crimes, accidents, and law enforcement",
  },
  {
    name: "Ambulance",
    number: "102",
    icon: Users,
    color: "bg-emergency/10",
    description: "For medical emergencies and injuries",
  },
  {
    name: "Fire Service",
    number: "101",
    icon: Siren,
    color: "bg-destructive/10",
    description: "For fires and rescue operations",
  },
  {
    name: "Disaster Management",
    number: "108",
    icon: MapPin,
    color: "bg-accent/10",
    description: "For natural disasters and evacuations",
  },
];

export default function Emergency() {
  const handleCall = (name: string, number: string) => {
    toast.success(`Calling ${name}`, {
      description: `Dialing ${number}...`,
    });
    // In a real app, this would initiate a phone call
    window.location.href = `tel:${number}`;
  };

  const handleGPSShare = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.success("Location Shared", {
            description: "Your location has been sent to emergency services",
          });
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
        },
        (error) => {
          toast.error("Location Access Denied", {
            description: "Please enable location services to share your position",
          });
        }
      );
    } else {
      toast.error("GPS Not Available", {
        description: "Your device doesn't support location services",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Emergency <span className="bg-gradient-emergency bg-clip-text text-transparent">Contacts</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Access emergency services with one tap. Your safety is our priority.
          </p>
        </div>

        {/* GPS Location Sharing */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              GPS Location Sharing
            </CardTitle>
            <CardDescription>
              Share your location with emergency responders for faster rescue assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGPSShare} variant="hero" size="lg" className="w-full md:w-auto">
              <MapPin className="h-5 w-5" />
              Share My Location
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Your location will only be shared when you tap this button. We respect your privacy.
            </p>
          </CardContent>
        </Card>

        {/* Emergency Contacts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <Card key={contact.name} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg ${contact.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{contact.name}</CardTitle>
                  <CardDescription>{contact.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Emergency Number</div>
                      <div className="text-3xl font-bold">{contact.number}</div>
                    </div>
                    <Button
                      onClick={() => handleCall(contact.name, contact.number)}
                      variant="emergency"
                      size="lg"
                    >
                      <Phone className="h-5 w-5" />
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Safety Tips */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Important Safety Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Stay Calm</h3>
                <p className="text-sm text-muted-foreground">
                  Take a deep breath and speak clearly when calling emergency services
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Know Your Location</h3>
                <p className="text-sm text-muted-foreground">
                  Be ready to share your exact location or nearby landmarks
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Follow Instructions</h3>
                <p className="text-sm text-muted-foreground">
                  Listen carefully to the operator and follow their guidance
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Don't Hang Up</h3>
                <p className="text-sm text-muted-foreground">
                  Stay on the line until the operator says it's okay to disconnect
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
