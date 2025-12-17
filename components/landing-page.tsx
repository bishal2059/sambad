"use client";

import Link from "next/link";
import { MessageCircle, Video, Users, Shield, Zap, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.refresh();
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#404EED] to-[#313338]">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">Sambad</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-white text-[#404EED] hover:bg-gray-100">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
          Imagine a place...
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
          ...where you can belong to a school club, a gaming group, or a worldwide art community.
          Where just you and a handful of friends can spend time together. A place that makes it
          easy to talk every day and hang out more often.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/sign-up">
            <Button size="lg" className="bg-white text-[#404EED] hover:bg-gray-100 px-8 py-6 text-lg">
              <Zap className="mr-2 h-5 w-5" />
              Open Sambad in your browser
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              Already have an account?
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#313338] py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Everything you need to communicate
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-[#2B2D31] hover:bg-[#383A40] transition-colors">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Text Chat</h3>
              <p className="text-gray-400">
                Send messages, share files, and create channels for any topic. Keep your
                conversations organized and accessible.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-[#2B2D31] hover:bg-[#383A40] transition-colors">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Video & Voice</h3>
              <p className="text-gray-400">
                Crystal clear video and voice calls. Jump into a channel and start chatting
                with your friends instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-[#2B2D31] hover:bg-[#383A40] transition-colors">
              <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Communities</h3>
              <p className="text-gray-400">
                Create your own server, invite friends, and build your community. Manage
                roles and permissions with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#404EED] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users already using Sambad to stay connected with their communities.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-white text-[#404EED] hover:bg-gray-100 px-10 py-6 text-lg">
              <Shield className="mr-2 h-5 w-5" />
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#23272A] py-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageCircle className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold text-white">Sambad</span>
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Sambad. Connect, communicate, collaborate.
          </p>
        </div>
      </footer>
    </div>
  );
}
