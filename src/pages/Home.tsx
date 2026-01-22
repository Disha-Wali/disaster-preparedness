import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Shield, BookOpen, GraduationCap, Phone, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import heroImage from "@/assets/hero-preparedness.jpg";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description: "Engage with region-specific disaster preparedness modules",
    link: "/learn",
  },
  {
    icon: GraduationCap,
    title: "MCQ Training",
    description: "Test your knowledge with interactive quizzes and scenarios",
    link: "/quiz",
  },
  {
    icon: Phone,
    title: "Emergency Contacts",
    description: "One-tap access to police, ambulance, and fire services",
    link: "/emergency",
  },
  {
    icon: MapPin,
    title: "GPS Integration",
    description: "Location-based rescue assistance during emergencies",
    link: "/emergency",
  },
];

export default function Home() {
  const [showGPSDialog, setShowGPSDialog] = useState(false);

  useEffect(() => {
    // Check if GPS permission was already handled
    const gpsPermissionAsked = localStorage.getItem("gpsPermissionAsked");
    
    if (!gpsPermissionAsked) {
      // Show dialog after a short delay for better UX
      const timer = setTimeout(() => {
        setShowGPSDialog(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleGPSRequest = async () => {
    if ("geolocation" in navigator) {
      try {
        await navigator.geolocation.getCurrentPosition(
          () => {
            toast.success("GPS Access Granted", {
              description: "Your location can now be shared in emergencies",
            });
            localStorage.setItem("gpsPermissionAsked", "true");
            setShowGPSDialog(false);
          },
          () => {
            toast.info("GPS Access Denied", {
              description: "You can enable it later in settings",
            });
            localStorage.setItem("gpsPermissionAsked", "true");
            setShowGPSDialog(false);
          }
        );
      } catch (error) {
        localStorage.setItem("gpsPermissionAsked", "true");
        setShowGPSDialog(false);
      }
    } else {
      toast.error("GPS Not Available", {
        description: "Your device doesn't support location services",
      });
      localStorage.setItem("gpsPermissionAsked", "true");
      setShowGPSDialog(false);
    }
  };

  const handleGPSDecline = () => {
    localStorage.setItem("gpsPermissionAsked", "true");
    setShowGPSDialog(false);
    toast.info("You can enable GPS later from the Emergency page");
  };
  return (
    <>
      <AlertDialog open={showGPSDialog} onOpenChange={setShowGPSDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Enable GPS for Emergency Assistance
            </AlertDialogTitle>
            <AlertDialogDescription>
              Allow SafeGuard to access your location so we can help emergency responders find you faster during a crisis. Your location is only shared when you activate the SOS button.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleGPSDecline}>Maybe Later</AlertDialogCancel>
            <AlertDialogAction onClick={handleGPSRequest}>Enable GPS</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Interactive Disaster Preparedness</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Be Prepared,
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Stay Safe</span>
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Learn life-saving skills through interactive training, access emergency services instantly, 
                and get location-based rescue assistance when you need it most.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/learn">
                  <Button variant="hero" size="lg">
                    Start Learning
                    <BookOpen className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/emergency">
                  <Button variant="outline" size="lg">
                    Emergency Contacts
                    <Phone className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={heroImage}
                alt="Students learning disaster preparedness"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-emergency text-emergency-foreground px-6 py-3 rounded-xl shadow-emergency">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-semibold">24/7 Emergency Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SafeGuard?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlike static guidelines, we provide hands-on training and real-time emergency support
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.link}>
                <Card className="h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-muted-foreground">Emergency Access</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                100+
              </div>
              <div className="text-muted-foreground">Training Scenarios</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                Region-Based
              </div>
              <div className="text-muted-foreground">Local Disaster Info</div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
