import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    question: "During an earthquake, what is the safest action to take indoors?",
    options: [
      "Run outside immediately",
      "Drop, Cover, and Hold On",
      "Stand in a doorway",
      "Use the elevator to evacuate",
    ],
    correct: 1,
    explanation: "Drop, Cover, and Hold On is the recommended action. Drop to your hands and knees, cover your head and neck, and hold on until the shaking stops.",
  },
  {
    id: 2,
    question: "What should you do if you receive a flood warning?",
    options: [
      "Wait to see how bad it gets",
      "Move to higher ground immediately",
      "Try to drive through flooded areas",
      "Stay in the basement",
    ],
    correct: 1,
    explanation: "Move to higher ground immediately. Even six inches of moving water can knock you down, and one foot can sweep away a vehicle.",
  },
  {
    id: 3,
    question: "If your clothes catch fire, you should:",
    options: [
      "Run to find water",
      "Stop, Drop, and Roll",
      "Wave your arms to put out the flames",
      "Remove the burning clothing quickly",
    ],
    correct: 1,
    explanation: "Stop, Drop, and Roll is the correct response. Running will only make the fire worse by feeding it oxygen.",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    setAnsweredQuestions(answeredQuestions + 1);
    
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(0);
    setQuizCompleted(false);
  };

  const progress = ((answeredQuestions) / quizQuestions.length) * 100;

  if (quizCompleted) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-success flex items-center justify-center">
              <Trophy className="h-10 w-10 text-success-foreground" />
            </div>
            <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
            <CardDescription>Great job on completing the training</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                {percentage}%
              </div>
              <div className="text-muted-foreground">
                You got {score} out of {quizQuestions.length} questions correct
              </div>
            </div>
            
            <div className="p-6 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Performance Feedback</h3>
              {percentage >= 80 ? (
                <p className="text-sm text-muted-foreground">
                  Excellent! You have a strong understanding of disaster preparedness. Keep practicing to maintain your skills.
                </p>
              ) : percentage >= 60 ? (
                <p className="text-sm text-muted-foreground">
                  Good effort! Review the learning modules to strengthen your knowledge in areas you missed.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  We recommend reviewing the learning modules again to better prepare for emergency situations.
                </p>
              )}
            </div>
            
            <Button onClick={resetQuiz} variant="hero" className="w-full" size="lg">
              Retake Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="container mx-auto max-w-3xl py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              Disaster Preparedness <span className="bg-gradient-hero bg-clip-text text-transparent">Training</span>
            </h1>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(parseInt(value))}
              disabled={showResult}
            >
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                    showResult
                      ? index === question.correct
                        ? "border-success bg-success/10"
                        : index === selectedAnswer
                        ? "border-destructive bg-destructive/10"
                        : "border-border"
                      : selectedAnswer === index
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                  {showResult && index === question.correct && (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correct && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              ))}
            </RadioGroup>

            {showResult && (
              <div className={`p-4 rounded-lg ${isCorrect ? "bg-success/10" : "bg-destructive/10"}`}>
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                  )}
                  <div>
                    <div className="font-semibold mb-1">
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {question.explanation}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {!showResult ? (
                <Button
                  onClick={handleAnswer}
                  disabled={selectedAnswer === null}
                  variant="hero"
                  className="w-full"
                  size="lg"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext} variant="hero" className="w-full" size="lg">
                  {currentQuestion + 1 < quizQuestions.length ? "Next Question" : "See Results"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
