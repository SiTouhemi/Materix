import React from "react";
import type { Route } from "../../+types/root";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Materix - Team Project Management" },
    { name: "description", content: "Welcome to Materix - Where friends collaborate, projects thrive, and tasks get done together!" },
  ];
}

const Homepage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background with earth tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-amber-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-200/20 rounded-full blur-lg"></div>
      
      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 px-6">
        {/* Logo/Brand */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl shadow-lg mb-6">
            <span className="text-2xl font-bold text-white">M</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-800 via-orange-800 to-rose-800 bg-clip-text text-transparent">
            Materix
          </h1>
          <p className="text-xl md:text-2xl text-amber-700/80 max-w-2xl mx-auto leading-relaxed">
            Where friends collaborate, projects thrive, and tasks get done together
          </p>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 shadow-lg">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-amber-600 text-xl">👥</span>
            </div>
            <h3 className="font-semibold text-amber-800 mb-2">Team Collaboration</h3>
            <p className="text-amber-700/70 text-sm">Work together seamlessly with role-based permissions</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50 shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-orange-600 text-xl">📊</span>
            </div>
            <h3 className="font-semibold text-orange-800 mb-2">Smart Analytics</h3>
            <p className="text-orange-700/70 text-sm">Track progress with beautiful charts and insights</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-rose-200/50 shadow-lg">
            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-rose-600 text-xl">⚡</span>
            </div>
            <h3 className="font-semibold text-rose-800 mb-2">Lightning Fast</h3>
            <p className="text-rose-700/70 text-sm">Modern tech stack for the best performance</p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
          <Link to="/sign-in">
            <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button variant="outline" className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg font-semibold transition-all duration-300">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
