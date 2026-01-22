import { Link, useLocation } from "react-router-dom";
import { Shield, BookOpen, Phone, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Shield },
  { path: "/learn", label: "Learn", icon: BookOpen },
  { path: "/quiz", label: "Training", icon: GraduationCap },
  { path: "/emergency", label: "Emergency", icon: Phone },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span className="bg-gradient-hero bg-clip-text text-transparent">SafeGuard</span>
          </Link>
          
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "hover:bg-secondary text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
