/**
 * Design philosophy: Tactile Storybook Quiet — world-first composition, contextual
 * navigation, quiet presence, and user-controlled adaptation.
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WorldProvider } from "@/contexts/WorldContext";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <WorldProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </WorldProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
