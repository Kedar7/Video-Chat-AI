"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const Home = () => {
  const router = useRouter();
  const { user } = useUser();
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);

  // Floating animation variants
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full p-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden min-h-[600px] flex items-center"
        >
          {/* Background with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center mix-blend-overlay opacity-20" />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating circles */}
            <motion.div
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm"
            />
            <motion.div
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              transition={{ delay: 1 }}
              className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm"
            />
            <motion.div
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              transition={{ delay: 2 }}
              className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm"
            />
            
            {/* Decorative lines */}
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M0,50 Q25,40 50,50 T100,50"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M0,60 Q25,70 50,60 T100,60"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </div>
          
          {/* Time and Date - Top Left */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-8 left-8 z-20 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="text-3xl font-bold text-white mb-1"
            >
              {time}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-gray-200"
            >
              {date}
            </motion.p>
          </motion.div>
          
          {/* View Recordings Button - Top Right */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-8 right-8 z-20"
          >
            <Button 
              onClick={() => router.push("/recordings")}
              className="relative bg-white/90 text-gray-800 hover:bg-white px-6 py-3 text-sm flex items-center gap-2 group transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden border border-white/20"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <i className="bi bi-record-circle text-lg text-blue-600"></i>
              </div>
              <span className="font-medium text-gray-700">View Recordings</span>
            </Button>
          </motion.div>
          
          {/* Content */}
          <div className="relative z-10 p-8 w-full">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12 text-center mt-20"
              >
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Welcome back, {user?.firstName || 'there'}!
                </motion.h1>
                <motion.p 
                  className="text-2xl text-gray-200 max-w-2xl mx-auto mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Ready to connect? Start or join a meeting instantly.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-6 max-w-3xl mx-auto mt-16"
              >
                <Button 
                  onClick={() => router.push(`/meetings/${user?.id}`)}
                  className="relative bg-white/90 text-gray-800 hover:bg-white h-32 text-lg flex-1 group transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden border border-white/20 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <i className="bi bi-camera-video-fill text-2xl text-blue-600"></i>
                    </div>
                    <span className="font-medium text-gray-700 text-base">Start Meeting</span>
                  </div>
                </Button>
                <Button 
                  onClick={() => router.push("/join")}
                  className="relative bg-white/80 text-gray-800 hover:bg-white h-32 text-lg flex-1 group transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden border border-white/20 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <div className="w-14 h-14 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300">
                      <i className="bi bi-box-arrow-in-right text-2xl text-purple-600"></i>
                    </div>
                    <span className="font-medium text-gray-700 text-base">Join Meeting</span>
                  </div>
                </Button>
                <Button 
                  onClick={() => router.push("/upcoming")}
                  className="relative bg-white/80 text-gray-800 hover:bg-white h-32 text-lg flex-1 group transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden border border-white/20 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <div className="w-14 h-14 rounded-lg bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition-colors duration-300">
                      <i className="bi bi-calendar-plus text-2xl text-pink-600"></i>
                    </div>
                    <span className="font-medium text-gray-700 text-base">Schedule Meeting</span>
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Home;
