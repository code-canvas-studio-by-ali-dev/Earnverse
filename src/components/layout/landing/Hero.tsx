"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <header className="hero min-h-screen bg-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block">Earn Part-Time Easy Income Online</span>
            <span className="block text-primary">In The Earnverse</span>
          </h1>

          <p className="text-lg text-base-content/70 max-w-lg mx-auto md:mx-0">
            Complete simple tasks and watch ads to earn real money. No
            investment required. 100% free to join.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <button className="btn btn-primary btn-wide">Get Started</button>
            <button className="btn btn-outline btn-wide">How It Works</button>
          </div>

          {/* Trust Section */}
          <div className="grid gap-1 text-sm text-base-content/60 mt-6">
            <p>🎉 10,000+ active users in Pakistan</p>
            <p>💸 Over Rs. 3,000,000 earned</p>
            <p>🛡️ No investment. No scam. 100% legit.</p>
          </div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <img
            src="/pexels-gabby-k-9432945.jpg"
            alt="Earnverse Dashboard Preview"
            className="rounded-box shadow-2xl"
          />
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
