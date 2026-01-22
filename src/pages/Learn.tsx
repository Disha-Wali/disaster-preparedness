import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import earthquakeIcon from "@/assets/earthquake-icon.jpg";
import floodIcon from "@/assets/flood-icon.jpg";
import fireIcon from "@/assets/fire-icon.jpg";

const disasters = [
  {
    id: "earthquake",
    title: "Earthquake Safety",
    description: "Learn how to protect yourself during and after earthquakes",
    image: earthquakeIcon,
    color: "bg-primary/10",
    lessons: 8,
    duration: "25 min",
  },
  {
    id: "flood",
    title: "Flood Preparedness",
    description: "Essential flood safety measures and evacuation procedures",
    image: floodIcon,
    color: "bg-accent/10",
    lessons: 6,
    duration: "20 min",
  },
  {
    id: "fire",
    title: "Fire Safety",
    description: "Fire prevention, detection, and safe evacuation techniques",
    image: fireIcon,
    color: "bg-emergency/10",
    lessons: 7,
    duration: "22 min",
  },
];

export default function Learn() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interactive <span className="bg-gradient-hero bg-clip-text text-transparent">Learning Modules</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Choose a disaster type to start your interactive learning journey. Each module includes 
            region-specific information and practical activities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {disasters.map((disaster) => (
            <Card key={disaster.id} className="overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
              <div className={`h-48 ${disaster.color} flex items-center justify-center p-8`}>
                <img
                  src={disaster.image}
                  alt={disaster.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle>{disaster.title}</CardTitle>
                <CardDescription>{disaster.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <span>{disaster.lessons} lessons</span>
                  <span>{disaster.duration}</span>
                </div>
                <Link to={`/learn/${disaster.id}`}>
                  <Button className="w-full" variant="hero">
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-card p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Why Interactive Learning?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-primary">Hands-On Practice</h3>
              <p className="text-sm text-muted-foreground">
                Engage with real-world scenarios instead of just reading guidelines
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Region-Specific</h3>
              <p className="text-sm text-muted-foreground">
                Content tailored to local disaster risks in your area
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Better Retention</h3>
              <p className="text-sm text-muted-foreground">
                Active learning helps you remember critical information when it matters
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
