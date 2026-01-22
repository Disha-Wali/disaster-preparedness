import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Play } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const moduleContent = {
  earthquake: {
    title: "Earthquake Safety",
    lessons: [
      {
        title: "Understanding Earthquakes",
        duration: "3 min",
        description: "Learn what causes earthquakes and how they affect buildings",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/RqqqSnaTfQo",
      },
      {
        title: "Drop, Cover, and Hold On",
        duration: "4 min",
        description: "Master the essential earthquake response technique",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/I0ureVMVzP8",
      },
      {
        title: "Safe Spots in Your Home",
        duration: "3 min",
        description: "Identify the safest locations during an earthquake",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/NhVv0iMvzuc",
      },
      {
        title: "Emergency Kit Preparation",
        duration: "5 min",
        description: "Build your earthquake emergency supply kit",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/KKN7Ewht1DQ",
      },
      {
        title: "After the Shaking Stops",
        duration: "4 min",
        description: "What to do immediately after an earthquake",
        completed: false,
      },
      {
        title: "Aftershocks and Recovery",
        duration: "3 min",
        description: "Understanding aftershocks and long-term recovery",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/kNKj0q7Ixww",
      },
    ],
  },
  flood: {
    title: "Flood Preparedness",
    lessons: [
      {
        title: "Types of Floods",
        duration: "3 min",
        description: "Flash floods, river floods, and coastal flooding",
        completed: false,
      },
      {
        title: "Flood Warning Systems",
        duration: "4 min",
        description: "How to interpret flood alerts and warnings",
        completed: false,
      },
      {
        title: "Evacuation Planning",
        duration: "5 min",
        description: "Creating your family flood evacuation plan",
        completed: false,
      },
      {
        title: "Water Safety Rules",
        duration: "3 min",
        description: "Never walk or drive through flooded areas",
        completed: false,
      },
      {
        title: "Protecting Your Property",
        duration: "4 min",
        description: "Sandbags, barriers, and flood-proofing techniques",
        completed: false,
      },
    ],
  },
  fire: {
    title: "Fire Safety",
    lessons: [
      {
        title: "Fire Prevention Basics",
        duration: "3 min",
        description: "Common fire hazards and how to prevent them",
        completed: false,
      },
      {
        title: "Smoke Alarms and Detectors",
        duration: "4 min",
        description: "Installation, testing, and maintenance",
        completed: false,
      },
      {
        title: "Stop, Drop, and Roll",
        duration: "3 min",
        description: "What to do if your clothes catch fire",
        completed: false,
      },
      {
        title: "Fire Escape Planning",
        duration: "5 min",
        description: "Creating and practicing your home escape plan",
        completed: false,
      },
      {
        title: "Using Fire Extinguishers",
        duration: "4 min",
        description: "PASS technique and when to fight or flee",
        completed: false,
      },
      {
        title: "Kitchen Fire Safety",
        duration: "3 min",
        description: "Preventing and responding to cooking fires",
        completed: false,
      },
    ],
  },
};

type Lesson = {
  title: string;
  duration: string;
  description: string;
  completed: boolean;
  videoUrl?: string;
};

export default function LearnModule() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = moduleContent[moduleId as keyof typeof moduleContent];
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card>
          <CardHeader>
            <CardTitle>Module Not Found</CardTitle>
            <CardDescription>The requested learning module doesn't exist</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/learn">
              <Button variant="hero">Back to Learning Modules</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedLessons = module.lessons.filter((l) => l.completed).length;
  const progress = (completedLessons / module.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        <Link to="/learn" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Learning Modules
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">{module.title}</span>
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-muted-foreground">
              {completedLessons} of {module.lessons.length} lessons completed
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid gap-4">
          {module.lessons.map((lesson, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">{lesson.title}</CardTitle>
                    </div>
                    <CardDescription>{lesson.description}</CardDescription>
                  </div>
                  {lesson.completed ? (
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                  ) : (
                    <Button 
                      variant="hero" 
                      size="sm"
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <Play className="h-4 w-4" />
                      Start
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">{lesson.duration}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Ready to Test Your Knowledge?</CardTitle>
            <CardDescription>
              Complete the training quiz to earn your certification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/quiz">
              <Button variant="hero" size="lg">
                Take the Quiz
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Video Lesson Dialog */}
      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl">{selectedLesson?.title}</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            {selectedLesson?.videoUrl ? (
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedLesson.videoUrl}
                  title={selectedLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Video content coming soon</p>
              </div>
            )}
            <p className="text-muted-foreground mt-4">{selectedLesson?.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
