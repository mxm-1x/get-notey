"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { ArrowRight, BookOpen, FileText, Sparkles, Upload, CheckCircle, Server, Database, Code, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && CheckUser();
  }, [user]);

  const CheckUser = async () => {
    if (!user) return;
    
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      name: user?.fullName
    });
  };

  const features = [
    {
      icon: <Upload className="h-6 w-6 text-[#51cb20]" />,
      title: "Upload PDFs",
      description: "Upload up to 10 PDF files and organize your documents in one place."
    },
    {
      icon: <FileText className="h-6 w-6 text-[#51cb20]" />,
      title: "Take Notes",
      description: "Create and organize notes for your PDFs with our intuitive interface."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-[#51cb20]" />,
      title: "Easy Reading",
      description: "Read your PDFs with our clean, distraction-free PDF viewer."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-[#51cb20]" />,
      title: "AI Insights",
      description: "Get AI-powered insights and summaries of your documents."
    }
  ];

  const processingFeatures = [
    {
      icon: <Server className="h-6 w-6 text-[#51cb20]" />,
      title: "Supercomputing Scale",
      description: "Optimized for high-performance computing with massive CPU, memory scalability, efficiency, and real-time processing."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-[#51cb20]" />,
      title: "Serverless Pricing",
      description: "Pay only for resources consumed, billed per second so you can optimize cost efficiency, scalability, flexibility, and performance."
    },
    {
      icon: <Code className="h-6 w-6 text-[#51cb20]" />,
      title: "Powerful Compute Primitives",
      description: "Efficiently process flexible primitives that scale to thousands of containers with just a single line of Python—maximizing efficiency and performance."
    }
  ];

  const performanceFeatures = [
    {
      icon: <Server className="h-6 w-6 text-[#51cb20]" />,
      title: "Flexible Environments",
      description: "Run your workloads in cloud-native Python, Node.js, or custom Docker containers for high-performance computing."
    },
    {
      icon: <Database className="h-6 w-6 text-[#51cb20]" />,
      title: "Data Storage",
      description: "Manage and seamlessly work with storage solutions optimized for your specific use case."
    },
    {
      icon: <Clock className="h-6 w-6 text-[#51cb20]" />,
      title: "Job Scheduling",
      description: "Easily control your workloads with powerful scheduling, prioritization, and resource usage optimization."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#121212] overflow-hidden">
      {/* Navigation - Updated with glassmorphism effect */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between p-6 max-w-7xl mx-auto backdrop-blur-md bg-black/30 rounded-xl mt-4 border border-gray-800"
      >
        <div className="flex items-center space-x-2">
          <Image 
            src="/logo.png" 
            alt="Get Notey Logo" 
            width={40} 
            height={40}
            className="rounded-md"
          />
          <h1 className="text-2xl font-bold text-white">Get Notey</h1>
        </div>
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" className="border-[#51cb20] text-[#51cb20] hover:bg-[#51cb20] hover:text-white transition-all">
                  Go to Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-all">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-[#51cb20] hover:bg-[#45a049] text-white transition-all">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section - Updated with angled design */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#51cb20] to-[#a3e635]">Smart Note-Taking</span> 
                <span className="text-white block mt-2">with AI Integration</span>
              </h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Get Notey is a powerful note-taking application that combines the simplicity of traditional 
                note-taking with cutting-edge AI capabilities. Our platform helps you capture, organize, 
                and enhance your notes with intelligent AI assistance.
              </p>
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button className="bg-[#51cb20] hover:from-[#45a049] hover:to-[#94cf2d] text-white text-lg px-8 py-6 rounded-full transition-all shadow-lg shadow-green-900/20">
                  Get Started <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="w-full h-[400px] bg-gradient-to-br from-[#1e1e1e] to-[#121212] rounded-lg overflow-hidden border border-[#333] shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-[url('/demo.png')] bg-cover bg-center opacity-70"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Updated with cards */}
      <section className="py-20 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#51cb20]/50 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-sm font-medium text-[#51cb20] uppercase tracking-wider mb-3">Features</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Everything you need for your notes</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-[#1e1e1e] to-[#161616] rounded-xl p-6 border border-gray-800 hover:border-[#51cb20]/50 transition-all group hover:shadow-lg hover:shadow-[#51cb20]/10"
              >
                <div className="bg-[#51cb20]/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-[#51cb20]/20 transition-all">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 px-6 bg-[#0c0c0c] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#51cb20]/50 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <motion.h3 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#51cb20] text-center mb-12"
          >
            Custom AI Response Styles
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* AI Response Style Cards - Keep the same content but update styling */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative rounded-xl p-6 overflow-hidden group"
              style={{
                background: 'linear-gradient(to bottom, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.8))',
                backdropFilter: 'blur(10px)',
                border: '1px solid #3b82f6',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <h4 className="text-xl font-bold text-white mb-3 relative z-10">Formal Mode</h4>
              <p className="text-gray-300 mb-4 relative z-10">Professional and concise responses for academic or business contexts.</p>
              <div className="bg-gray-800/50 rounded-lg p-4 relative z-10">
                <p className="text-sm text-gray-300 italic">
                  "The analysis indicates a 15% increase in efficiency when implementing the proposed solution..."
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-xl p-6 overflow-hidden group"
              style={{
                background: 'linear-gradient(to bottom, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.8))',
                backdropFilter: 'blur(10px)',
                border: '1px solid #ec4899',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-red-500/10 opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <h4 className="text-xl font-bold text-white mb-3 relative z-10">Bestie Mode</h4>
              <p className="text-gray-300 mb-4 relative z-10">Friendly and supportive responses with a personal touch.</p>
              <div className="bg-gray-800/50 rounded-lg p-4 relative z-10">
                <p className="text-sm text-gray-300 italic">
                  "OMG bestie! 💖 I totally get what you're asking about! Here's the tea on that topic..."
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-xl p-6 overflow-hidden group"
              style={{
                background: 'linear-gradient(to bottom, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.8))',
                backdropFilter: 'blur(10px)',
                border: '1px solid #10b981',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <h4 className="text-xl font-bold text-white mb-3 relative z-10">Gen Z Mode</h4>
              <p className="text-gray-300 mb-4 relative z-10">Casual and trendy responses using current slang and expressions.</p>
              <div className="bg-gray-800/50 rounded-lg p-4 relative z-10">
                <p className="text-sm text-gray-300 italic">
                  "No cap, this is straight fire! The vibe check on this solution is 💯..."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Processing Features Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#51cb20]/50 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-sm font-medium text-[#51cb20] uppercase tracking-wider mb-3">Processing</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Powerful Document Processing</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-[#1e1e1e] to-[#161616] rounded-xl p-6 border border-gray-800 hover:border-[#51cb20]/50 transition-all group"
              >
                <div className="bg-[#51cb20]/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-[#51cb20]/20 transition-all">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Features Section */}
      <section className="py-20 px-6 bg-[#0c0c0c] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#51cb20]/50 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-sm font-medium text-[#51cb20] uppercase tracking-wider mb-3">Performance</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Built for Speed and Reliability</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {performanceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-[#1e1e1e] to-[#161616] rounded-xl p-6 border border-gray-800 hover:border-[#51cb20]/50 transition-all group"
              >
                <div className="bg-[#51cb20]/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-[#51cb20]/20 transition-all">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1e1e1e] to-[#121212] rounded-2xl p-12 border border-gray-800 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#51cb20] rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#51cb20] rounded-full opacity-10 blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started with Get Notey?</h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                Join thousands of users who are already enhancing their note-taking experience with our powerful AI-assisted platform.
              </p>
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button className="bg-[#51cb20] hover:bg-[#45a049] text-white text-lg px-8 py-6 rounded-full transition-all shadow-lg shadow-green-900/20">
                  {isSignedIn ? "Go to Dashboard" : "Sign Up for Free"} <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0a0a0a] border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Image 
                src="/logo.png" 
                alt="Get Notey Logo" 
                width={32} 
                height={32}
                className="rounded-md"
              />
              <span className="text-xl font-bold text-white">Get Notey</span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Get Notey. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
