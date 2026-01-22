import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const SOSButton = () => {
  const handleSOS = () => {
    toast.error("SOS Alert Activated", {
      description: "Emergency services are being notified. Stay safe!",
      duration: 5000,
    });
    // In a real app, this would trigger GPS location sharing and emergency contacts
  };

  return (
    <Button
      variant="emergency"
      size="xl"
      onClick={handleSOS}
      className="fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full p-0 shadow-emergency hover:scale-110 transition-transform"
      aria-label="Emergency SOS Button"
    >
      <AlertCircle className="h-8 w-8" />
    </Button>
  );
};
