'use client';

import QuestionnaireForm from '@/components/QuestionnaireForm';
import { 
  FaRocket, 
  FaShieldAlt, 
  FaChartLine, 
  FaBitcoin,
  FaNetworkWired,
  FaGlobe,
  FaStar
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Cosmic Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/cosmic-space-scene-with-astronaut-floating-in-spac.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Floating cosmic elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-6xl mx-auto">
            {/* Floating Icons */}
            <div className="relative mb-12">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-8 -left-8 text-purple-400 text-4xl opacity-60"
              >
                <FaRocket />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -3, 3, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -top-4 -right-8 text-blue-400 text-3xl opacity-60"
              >
                <FaShieldAlt />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute top-8 left-1/2 transform -translate-x-1/2 text-green-400 text-2xl opacity-60"
              >
                <FaStar />
              </motion.div>
            </div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 neon-glow"
            >
              Trading Preferences
              <span className="block gradient-text">Questionnaire</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Help us understand your investment strategy and trading preferences 
              to provide you with personalized insights and recommendations.
            </motion.p>

            {/* Feature Icons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-8 mb-16 text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <FaChartLine className="text-2xl text-blue-400" />
                <span className="text-sm">Stocks & Crypto</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaBitcoin className="text-2xl text-yellow-400" />
                <span className="text-sm">Secure Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaNetworkWired className="text-2xl text-purple-400" />
                <span className="text-sm">Multi-Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaGlobe className="text-2xl text-green-400" />
                <span className="text-sm">Global Access</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-16"
            >
              <button
                onClick={() => document.getElementById('questionnaire')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium font-heading text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start Questionnaire</span>
                  <FaRocket className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Questionnaire Section */}
        <section id="questionnaire" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6 neon-glow">
                Your Trading Profile
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Complete the questionnaire below to help us understand your trading preferences, 
                platform usage, and investment strategy.
              </p>
            </motion.div>

            {/* Form Component */}
            <QuestionnaireForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center space-x-6 mb-6 text-gray-400">
              <FaShieldAlt className="text-xl text-purple-400" />
              <FaChartLine className="text-xl text-blue-400" />
              <FaBitcoin className="text-xl text-yellow-400" />
              <FaNetworkWired className="text-xl text-green-400" />
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Cosmic Trading. Secure • Reliable • Professional
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
