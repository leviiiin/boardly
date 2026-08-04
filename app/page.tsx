import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { LayoutDashboard, ArrowRight, Sparkles, Zap, GitBranch, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/10 selection:text-primary">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-foreground/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-primary/40 rounded-full animate-float" />
        <div className="absolute top-[25%] right-[15%] w-3 h-3 bg-accent-foreground/30 rounded-full animate-float-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] left-[20%] w-1.5 h-1.5 bg-primary/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[70%] right-[25%] w-2 h-2 bg-accent-foreground/25 rounded-full animate-float-slow" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[40%] left-[70%] w-1 h-1 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[80%] left-[60%] w-2.5 h-2.5 bg-accent-foreground/20 rounded-full animate-float-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[10%] left-[50%] w-1.5 h-1.5 bg-primary/35 rounded-full animate-float" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[50%] right-[10%] w-2 h-2 bg-accent-foreground/30 rounded-full animate-float-slow" style={{ animationDelay: '0.8s' }} />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent-foreground/5 rounded-full blur-3xl pointer-events-none animate-float" />

      <Navbar />

      <main className="container relative mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 z-10">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide animate-fade-in-up">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Now with real-time collaboration</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05] animate-fade-in-up stagger-1">
              Organize work.
              <br />
              <span className="text-gradient">Ship faster.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed animate-fade-in-up stagger-2">
              Boardly brings your team's workflow into one elegant workspace.
              Create boards, track progress, and collaborate in real time —
              without the noise.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up stagger-3">
              <SignedIn>
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-base h-12 px-8 shadow-glow hover:shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" strokeWidth={2} />
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-base h-12 px-8 shadow-glow hover:shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                  </Button>
                </Link>
              </SignedOut>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 text-xs text-muted-foreground/70 animate-fade-in-up stagger-4">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>Secure & private</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span>Real-time sync</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitBranch className="h-3.5 w-3.5 text-primary" />
                <span>No credit card</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end relative mt-12 lg:mt-0">
            <div className="relative w-[280px] h-[560px] sm:w-[300px] sm:h-[600px] hover-lift">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-accent-foreground/5 rounded-[48px] -m-2 blur-xl opacity-60 animate-pulse-glow" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none animate-float" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent-foreground/8 rounded-full blur-2xl pointer-events-none animate-float-slow" />

              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-[48px] -m-2 pointer-events-none" />

              <div className="relative w-full h-full rounded-[40px] border-4 border-muted/50 bg-card overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 right-0 h-8 bg-muted/30 backdrop-blur-sm flex items-center px-4 gap-2 z-10">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="pt-10 px-4 pb-4 space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Boardly</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-primary/20 rounded-full w-3/4 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    <div className="h-2 bg-muted rounded-full w-1/2" />
                    <div className="h-2 bg-accent-foreground/10 rounded-full w-5/6" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="h-16 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary/20 rounded-md animate-bounce-subtle" />
                    </div>
                    <div className="h-16 bg-accent-foreground/5 rounded-lg border border-accent-foreground/10 flex items-center justify-center">
                      <div className="w-6 h-6 bg-accent-foreground/20 rounded-md animate-bounce-subtle" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <div className="h-16 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary/20 rounded-md animate-bounce-subtle" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/40">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent-foreground" />
                    <div className="flex-1 space-y-1">
                      <div className="h-1.5 bg-muted rounded-full w-full" />
                      <div className="h-1.5 bg-muted/50 rounded-full w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 sm:mt-32 max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Everything your team needs
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
              From idea to execution — Boardly keeps your workflow streamlined and your team aligned.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="h-5 w-5" />,
                title: "Lightning Fast",
                desc: "Real-time updates ensure every team member sees changes instantly. No refreshing, no delays.",
                delay: "stagger-1",
              },
              {
                icon: <GitBranch className="h-5 w-5" />,
                title: "Flexible Workflows",
                desc: "Custom boards and columns adapt to any process — from agile sprints to content calendars.",
                delay: "stagger-2",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "Secure by Default",
                desc: "Enterprise-grade security with Clerk authentication and Supabase row-level policies.",
                delay: "stagger-3",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group relative bg-card/80 backdrop-blur-md border border-border/40 rounded-2xl p-6 hover:bg-card hover:border-primary/20 transition-all duration-300 hover-lift animate-fade-in-up ${feature.delay}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-foreground/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 sm:mt-32 mb-16 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Ready to streamline your workflow?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto text-lg">
              Join thousands of teams who ship faster with Boardly.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignedOut>
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 shadow-glow hover:shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                    Start for free
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8">
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}