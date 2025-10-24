"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Target,
  AlertTriangle,
  Trophy,
  Mail,
  CheckCircle,
  Calendar,
  MessageCircle,
  Presentation,
  Star,
  ArrowRight,
  Play,
  Download,
  Monitor,
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [joinedCommunity, setJoinedCommunity] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "landing-page",
        }),
      });

      if (response.ok) {
        setSubmittedEmail(email);
        setIsSubmitted(true);
        setShowThankYou(true);
      } else {
        throw new Error("Failed to submit email");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinCommunity = () => {
    setJoinedCommunity(true);
    const whatsappNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "your-whatsapp-number";
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const storyTypes = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "The Customer Hero",
      description:
        "Make your customer the star of their own transformation story",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "The Trusted Guide",
      description:
        "Position yourself as the mentor who's been there and knows the way",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "The Proven Path",
      description:
        "Show them exactly how to get from where they are to where they want to be",
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "The Honest Truth",
      description:
        "Share real struggles and failures that make you more relatable and trustworthy",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "The Success Proof",
      description:
        "Show real results from real people who've used your approach",
    },
  ];

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#073D93] via-[#0D60D8] to-[#1781FF] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#073D93] to-[#0D60D8] p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Check Your Email!
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#ABCDFF] rounded-lg flex items-center justify-center">
                <span className="text-[#073D93] font-bold">@</span>
              </div>
              <p className="text-[#ABCDFF] text-lg">
                We&apos;ve sent your download link to{" "}
                <span className="font-semibold text-white">
                  {submittedEmail}
                </span>
              </p>
            </div>
            <p className="text-[#ABCDFF] text-sm">While you wait...</p>
          </div>

          {/* CTA Cards Section */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Book Consultation Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#1781FF] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1781FF]/10">
                  <Calendar className="w-6 h-6 text-[#0D60D8] group-hover:text-[#1781FF]" />
                </div>
                <h3 className="text-xl font-bold text-[#073D93] mb-3">
                  Book a Free Consultation
                </h3>
                <p className="text-[#4B5563] mb-4">
                  Get personalized guidance on implementing storytelling in your
                  business
                </p>
                <button className="w-full bg-[#0D60D8] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#1781FF] transition-colors">
                  Schedule Now
                </button>
              </motion.div>

              {/* WhatsApp Community Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#1781FF] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1781FF]/10">
                  <MessageCircle className="w-6 h-6 text-[#0D60D8] group-hover:text-[#1781FF]" />
                </div>
                <h3 className="text-xl font-bold text-[#073D93] mb-3">
                  Join Our WhatsApp Community
                </h3>
                <p className="text-[#4B5563] mb-4">
                  Daily tips, peer support, exclusive content
                </p>
                <button
                  onClick={handleJoinCommunity}
                  className="w-full bg-[#0D60D8] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#1781FF] transition-colors"
                >
                  Join Now
                </button>
              </motion.div>

              {/* Workshop Waitlist Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#1781FF] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1781FF]/10">
                  <Monitor className="w-6 h-6 text-[#0D60D8] group-hover:text-[#1781FF]" />
                </div>
                <h3 className="text-xl font-bold text-[#073D93] mb-3">
                  Join Workshop Waitlist
                </h3>
                <p className="text-[#4B5563] mb-4">
                  Be first to know about our upcoming storytelling workshops
                </p>
                <button className="w-full bg-[#0D60D8] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#1781FF] transition-colors">
                  Get on the Waitlist
                </button>
              </motion.div>
            </div>

            {/* Back to Home Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => setShowThankYou(false)}
                className="text-[#073D93] hover:text-[#0D60D8] font-medium transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0D60D8] to-[#1781FF] rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-[#073D93]">
                StorySell
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a
                href="#framework"
                className="text-[#073D93] hover:text-[#0D60D8] transition-colors"
              >
                Framework
              </a>
              <a
                href="#testimonials"
                className="text-[#073D93] hover:text-[#0D60D8] transition-colors"
              >
                Results
              </a>
              <a
                href="#pricing"
                className="text-[#073D93] hover:text-[#0D60D8] transition-colors"
              >
                Pricing
              </a>
              <button
                onClick={() =>
                  document
                    .getElementById("hero")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-[#0D60D8] text-white px-4 sm:px-6 py-2 rounded-xl hover:bg-[#1781FF] transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center bg-white"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmM2Y0ZjYiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Strategic Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Social Proof Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-[#073D93] rounded-full text-sm font-medium text-white shadow-lg"
              >
                <div className="w-2 h-2 bg-[#1781FF] rounded-full mr-3 animate-pulse"></div>
                Trusted by 2,500+ entrepreneurs worldwide
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#073D93] leading-tight">
                  Turn Your
                  <br />
                  <span className="text-[#1781FF]">Story Into Sales</span>
                </h1>
                <p className="text-lg sm:text-xl text-[#4B5563] leading-relaxed max-w-lg">
                  The proven framework that transformed a struggling startup
                  into a $2M business in 18 months. Stop losing customers to
                  competitors who know how to tell stories.
                </p>
              </motion.div>

              {/* Value Props */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#0D60D8]" />
                  </div>
                  <span className="text-[#4B5563] font-medium">
                    5 Proven Frameworks
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-[#0D60D8]" />
                  </div>
                  <span className="text-[#4B5563] font-medium">
                    Real Case Studies
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#0D60D8]" />
                  </div>
                  <span className="text-[#4B5563] font-medium">
                    Ready Templates
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#0D60D8]" />
                  </div>
                  <span className="text-[#4B5563] font-medium">
                    Community Access
                  </span>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6 relative z-10"
              >
                <form
                  onSubmit={handleEmailSubmit}
                  className="flex flex-col sm:flex-row gap-4 w-full"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-[#E5E7EB] text-[#073D93] placeholder-[#4B5563] focus:ring-4 focus:ring-[#1781FF]/20 focus:border-[#1781FF] focus:outline-none transition-all text-sm sm:text-base bg-white shadow-sm"
                    required
                    autoComplete="email"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#0D60D8] to-[#1781FF] text-white font-semibold rounded-xl hover:from-[#1781FF] hover:to-[#0D60D8] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Get The Framework"
                    )}
                  </button>
                </form>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-xs sm:text-sm text-[#4B5563]">
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Free forever
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    No spam
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Instant access
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Premium Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Ebook Card */}
                <div className="w-80 sm:w-96 h-[450px] sm:h-[500px] bg-white rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700 border border-gray-100 mx-auto lg:mx-0">
                  <div className="p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#1781FF] to-[#0D60D8] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <BookOpen className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#073D3] mb-2">
                        The Story That Sells
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        The complete framework for conversion-focused
                        storytelling
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-[#1781FF]/10 rounded-lg flex items-center justify-center mr-4">
                          <CheckCircle className="w-5 h-5 text-[#1781FF]" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            5 Story Frameworks
                          </div>
                          <div className="text-sm text-gray-600">
                            Proven templates that convert
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-[#1781FF]/10 rounded-lg flex items-center justify-center mr-4">
                          <Trophy className="w-5 h-5 text-[#1781FF]" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Real Case Studies
                          </div>
                          <div className="text-sm text-gray-600">
                            $2M+ in proven results
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-[#1781FF]/10 rounded-lg flex items-center justify-center mr-4">
                          <Target className="w-5 h-5 text-[#1781FF]" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Ready Templates
                          </div>
                          <div className="text-sm text-gray-600">
                            Copy-paste frameworks
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Instant Download
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900">
                            2,500+ downloads
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#ABCDFF] to-[#1781FF] rounded-2xl flex items-center justify-center shadow-xl transform rotate-12 hover:rotate-0 transition-all duration-500">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    FREE
                  </span>
                </div>

                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl border-2 border-[#1781FF]/20">
                  <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#1781FF]" />
                </div>

                {/* Stats Badge */}
                <div className="absolute top-1/2 -left-4 sm:-left-8 bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-gray-100 hidden sm:block">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-[#073D3]">
                      40%
                    </div>
                    <div className="text-xs text-gray-600">
                      Conversion Increase
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="framework" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-[#073D93] rounded-full text-sm font-medium text-white mb-6 shadow-lg"
            >
              <Star className="w-4 h-4 mr-2" />
              The 5 Stories That Actually Convert
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#073D93] mb-6">
              Stop Losing Sales to Better Storytellers
            </h2>
            <p className="text-lg sm:text-xl text-[#4B5563] max-w-3xl mx-auto">
              Master the frameworks that turn browsers into buyers. These
              aren&apos;t just theories—they&apos;re battle-tested strategies
              that have generated millions in revenue.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {storyTypes.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-[#E5E7EB] hover:border-[#1781FF] hover:shadow-lg transition-all duration-300 group shadow-sm"
              >
                <div className="text-[#0D60D8] mb-6 group-hover:text-[#1781FF] transition-colors duration-300">
                  {story.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#073D93] mb-4">
                  {story.title}
                </h3>
                <p className="text-[#4B5563] leading-relaxed">
                  {story.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-24 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#073D93] mb-6">
              Join 2,500+ Entrepreneurs Who Stopped Losing Sales
            </h2>
            <p className="text-lg sm:text-xl text-[#4B5563]">
              Real results from real people using our storytelling framework
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E7EB]"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1781FF] to-[#0D60D8] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  SC
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-gray-600">E-commerce Founder</div>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                &ldquo;I was losing customers to competitors who just &apos;got
                it&apos; better. This framework showed me exactly how to tell
                stories that actually convert. My sales increased 40% in 3
                months.&rdquo;
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  Verified Purchase
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E7EB]"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1781FF] to-[#0D60D8] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  MR
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    Marcus Rodriguez
                  </div>
                  <div className="text-gray-600">Marketing Director</div>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                &ldquo;I was skeptical about another marketing guide, but this
                one actually works. The storytelling frameworks are so clear and
                practical. My team&apos;s conversion rate doubled.&rdquo;
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  Verified Purchase
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#073D93] via-[#0D60D8] to-[#1781FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Stop Losing Sales to Better Storytellers?
            </h2>
            <p className="text-lg sm:text-xl text-[#ABCDFF] mb-8 sm:mb-12 max-w-3xl mx-auto">
              Get the framework that&apos;s already helped 2,500+ entrepreneurs
              turn browsers into buyers. Join the community of successful
              storytellers.
            </p>

            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-white/30 text-[#073D93] placeholder-[#4B5563] focus:ring-4 focus:ring-white/20 focus:outline-none transition-all text-sm sm:text-base bg-white/95 shadow-lg"
                required
                autoComplete="email"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#073D93] font-semibold rounded-xl hover:bg-[#ABCDFF] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center text-sm sm:text-base whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#073D3] mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Get The Framework
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-xs sm:text-sm text-white/80">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Free forever
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                No spam
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Instant access
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#073D93] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#073D93]" />
                </div>
                <span className="ml-2 text-xl font-bold">StorySell</span>
              </div>
              <p className="text-[#E0E7FF]">
                The framework that turns stories into sales.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Framework</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#1781FF] transition-colors"
                  >
                    5 Story Types
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#1781FF] transition-colors"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#1781FF] transition-colors"
                  >
                    Templates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#1781FF] transition-colors"
                  >
                    WhatsApp Group
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#1781FF] transition-colors"
                  >
                    Workshops
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#1781FF] transition-colors"
                  >
                    Consultations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#1781FF] transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#1781FF] transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#1781FF] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#E0E7FF]/30 mt-8 pt-8 text-center text-[#E0E7FF]">
            <p>&copy; 2024 StorySell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
