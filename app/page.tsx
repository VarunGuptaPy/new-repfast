"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Linkedin,
  Twitter,
  Zap,
  Brain,
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { HelpingAiBadge } from "@/components/helping-ai-badge";
import { Navbar } from "@/components/navbar";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[90vh] flex items-center pt-16">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">8
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
              }}
              animate={{
                x: [
                  Math.random() * dimensions.width,
                  Math.random() * dimensions.width,
                  Math.random() * dimensions.width,
                ],
                y: [
                  Math.random() * dimensions.height,
                  Math.random() * dimensions.height,
                  Math.random() * dimensions.height,
                ],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-32 h-32 bg-primary/5 rounded-full blur-xl" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <div className="text-center">
            <motion.div variants={fadeIn} className="inline-block">
              <Badge
                variant="secondary"
                className="mb-4 py-2 px-4 text-lg backdrop-blur-sm bg-secondary/50"
              >
                <Sparkles className="w-4 h-4 mr-2 inline-block" />
                Now in Beta
              </Badge>
            </motion.div>

            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.2 },
              }}
              className="relative"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 pb-2">
                Your AI-Powered Social Media Response Agent
              </h1>
              <div className="absolute -inset-x-4 -inset-y-2 bg-primary/5 blur-3xl -z-10" />
            </motion.div>

            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              RepFast learns your engagement style and automatically responds to
              relevant posts in your feed, maintaining your authentic voice
              across social media.
            </motion.p>

            <motion.div variants={fadeIn} className="space-x-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 transition-all duration-300 text-lg h-14 px-8"
              >
                Start Free Trial
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 hover:bg-primary/5 transition-all duration-300 text-lg h-14 px-8 backdrop-blur-sm"
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="mt-12 flex justify-center items-center space-x-8"
            >
              {[
                { text: "24/7 Response", icon: Bot },
                { text: "AI-Powered", icon: Brain },
                { text: "Human-like", icon: Target },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center text-muted-foreground"
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Intelligent Engagement Features
            </h2>
            <p className="text-muted-foreground">
              Powered by advanced AI to maintain your authentic online presence
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Brain,
                title: "Smart Learning",
                description:
                  "Analyzes your past interactions to understand your engagement patterns and preferences",
              },
              {
                icon: Target,
                title: "Targeted Responses",
                description:
                  "Identifies and engages with posts that match your usual interaction patterns",
              },
              {
                icon: Bot,
                title: "Authentic Voice",
                description:
                  "Maintains your unique communication style in every interaction",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="transform transition-all duration-300"
              >
                <Card className="p-6 bg-gradient-to-br from-background via-background to-background/80 hover:shadow-xl hover:shadow-primary/5 border border-primary/10">
                  <feature.icon className="h-12 w-12 mb-4 text-primary animate-glow" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How RepFast Works</h2>
            <p className="text-muted-foreground">
              Three simple steps to automated engagement
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative flex items-center gap-8">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary relative">
                  <span className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                    1
                  </span>
                  <Twitter className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Connect Your Profile
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Link your X (Twitter) account to RepFast. It's quick,
                    secure, and only takes a few clicks.
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              <div className="w-0.5 h-12 bg-primary/20 ml-10"></div>

              {/* Step 2 */}
              <div className="relative flex items-center gap-8">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary relative">
                  <span className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                    2
                  </span>
                  <Brain className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    AI Learning Phase
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    RepFast analyzes your past interactions to understand your
                    engagement style, tone, and preferences.
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              <div className="w-0.5 h-12 bg-primary/20 ml-10"></div>

              {/* Step 3 */}
              <div className="relative flex items-center gap-8">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary relative">
                  <span className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                    3
                  </span>
                  <Bot className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Automatic Engagement
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    RepFast begins responding to relevant posts in your feed,
                    maintaining your authentic voice.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button size="lg">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div className="py-24 bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">See RepFast in Action</h2>
            <p className="text-muted-foreground mb-8">
              Watch how RepFast transforms your social media engagement
            </p>

            <div className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="RepFast Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground">
              Choose the plan that works for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 bg-card">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-muted-foreground mb-4">
                  Perfect for individuals and creators
                </p>
                <div className="text-4xl font-bold mb-4">
                  $29<span className="text-lg text-muted-foreground">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "1 social media account per platform",
                  "AI-powered response learning",
                  "Basic engagement analytics",
                  "Pattern recognition",
                  "Email support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>

            <Card className="p-8 bg-card relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary px-4 py-1 rounded-bl-lg text-primary-foreground">
                Popular
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <p className="text-muted-foreground mb-4">
                  For teams and businesses
                </p>
                <div className="text-4xl font-bold mb-4">
                  $79<span className="text-lg text-muted-foreground">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "5 social media accounts per platform",
                  "Advanced learning customization",
                  "Detailed engagement analytics",
                  "Custom response templates",
                  "Priority support",
                  "Team collaboration features",
                  "Advanced pattern recognition",
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant="default">
                Get Started
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Platform Support */}
      <div className="py-16 bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-8">Supported Platforms</h2>
          <div className="flex justify-center items-center gap-8">
            <div className="flex items-center">
              <Twitter className="h-8 w-8 mr-2" />
              <span className="text-xl">X (Twitter)</span>
            </div>
            <div className="flex items-center opacity-50">
              <Linkedin className="h-8 w-8 mr-2" />
              <span className="text-xl">LinkedIn</span>
              <Badge variant="secondary" className="ml-2">
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <HelpingAiBadge />
    </div>
  );
}
