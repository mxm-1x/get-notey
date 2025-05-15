"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { ArrowRight, BookOpen, FileText, Sparkles, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);

  const demo = '/demo.png'
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#121212] overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between p-6 max-w-7xl mx-auto"
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
                <Button className="bg-gradient-to-r from-[#51cb20] to-[#3da00a] hover:from-[#45a049] hover:to-[#348c08] text-white transition-all">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-100 text-transparent bg-clip-text">Your PDF Notes,</span> <span className="bg-gradient-to-r from-[#51cb20] to-[#3da00a] text-transparent bg-clip-text">Organized</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Get Notey helps you organize, annotate, and extract insights from your PDF documents with powerful AI assistance.
          </motion.p>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button className="bg-gradient-to-r from-[#51cb20] to-[#3da00a] hover:from-[#45a049] hover:to-[#348c08] text-white text-lg px-8 py-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-[#51cb20]/20">
                {isSignedIn ? "Go to Dashboard" : "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#learn-more">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 rounded-xl transition-all">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#222222] rounded-t-3xl">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl border border-[#333] p-2"
          >
            <div className="relative w-full h-[500px]">
              <Image 
                src="/demo.png" 
                alt="Get Notey Dashboard Preview" 
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#222222] to-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <motion.h3 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Everything You Need for Your PDFs
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-xl p-6 border border-[#333] hover:border-[#51cb20] transition-all shadow-lg hover:shadow-xl hover:shadow-[#51cb20]/10"
              >
                <div className="bg-gradient-to-br from-[#333] to-[#2a2a2a] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#222222]">
        <div className="max-w-6xl mx-auto">
          <motion.h3 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12" 
            id="learn-more"
          >
            Learn More About <span className="bg-gradient-to-r from-[#51cb20] to-[#3da00a] text-transparent bg-clip-text">Get Notey</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#2a2a2a] rounded-xl p-8 border border-[#333]">
              <h4 className="text-2xl font-semibold text-white mb-4">Why Choose Get Notey?</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-[#333] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#51cb20] font-bold">1</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-medium text-white mb-1">Streamlined Organization</h5>
                    <p className="text-gray-400">Keep all your PDF documents in one place with our intuitive file management system. No more searching through folders or emails.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#333] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#51cb20] font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-medium text-white mb-1">Smart Note-Taking</h5>
                    <p className="text-gray-400">Create notes directly linked to specific sections of your PDFs. Never lose context or struggle to find related information again.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#333] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#51cb20] font-bold">3</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-medium text-white mb-1">AI-Powered Insights</h5>
                    <p className="text-gray-400">Our AI assistant helps you understand complex content, summarize information, and extract key insights from your documents.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#2a2a2a] rounded-xl p-8 border border-[#333]">
              <h4 className="text-2xl font-semibold text-white mb-4">Perfect For</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#333] rounded-lg p-5 border border-[#444]">
                  <h5 className="text-lg font-medium text-white mb-2">Students</h5>
                  <p className="text-gray-400">Organize study materials, textbooks, and research papers. Create notes for exam preparation and get AI help with difficult concepts.</p>
                </div>
                <div className="bg-[#333] rounded-lg p-5 border border-[#444]">
                  <h5 className="text-lg font-medium text-white mb-2">Researchers</h5>
                  <p className="text-gray-400">Manage academic papers, extract insights, and organize your research materials in one centralized location.</p>
                </div>
                <div className="bg-[#333] rounded-lg p-5 border border-[#444]">
                  <h5 className="text-lg font-medium text-white mb-2">Professionals</h5>
                  <p className="text-gray-400">Keep track of reports, contracts, and business documents. Create notes for meetings and important information.</p>
                </div>
                <div className="bg-[#333] rounded-lg p-5 border border-[#444]">
                  <h5 className="text-lg font-medium text-white mb-2">Knowledge Workers</h5>
                  <p className="text-gray-400">Organize reference materials, create a personal knowledge base, and leverage AI to extract valuable insights.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-[#2a2a2a] rounded-xl p-8 border border-[#333]">
            <h4 className="text-2xl font-semibold text-white mb-6 text-center">Frequently Asked Questions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-lg font-medium text-white mb-2">How many PDFs can I upload?</h5>
                <p className="text-gray-400">With our free plan, you can upload up to 10 PDF files. Our Pro plan offers unlimited PDF uploads.</p>
              </div>
              <div>
                <h5 className="text-lg font-medium text-white mb-2">Can I collaborate with others?</h5>
                <p className="text-gray-400">Currently, Get Notey is designed for individual use, but we're working on collaboration features for future updates.</p>
              </div>
              <div>
                <h5 className="text-lg font-medium text-white mb-2">Can I access my PDFs offline?</h5>
                <p className="text-gray-400">Currently, Get Notey requires an internet connection to access your documents and notes.</p>
              </div>
              <div>
                <h5 className="text-lg font-medium text-white mb-2">How does the AI assistant work?</h5>
                <p className="text-gray-400">Our AI analyzes the content of your PDFs to provide explanations, summaries, and insights based on your specific questions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use AI Feature */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#222222] to-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            How to Use Our <span className="text-[#51cb20]">AI Assistant</span>
          </h3>
          <div className="bg-[#2a2a2a] rounded-xl p-8 border border-[#333]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#333] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-[#51cb20] font-bold text-xl">1</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Select Text</h4>
                <p className="text-gray-400">Highlight any text in your PDF that you want to learn more about.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#333] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-[#51cb20] font-bold text-xl">2</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Click "Ask AI"</h4>
                <p className="text-gray-400">Click the "Ask AI" button that appears when text is selected.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#333] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-[#51cb20] font-bold text-xl">3</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Get Insights</h4>
                <p className="text-gray-400">Ask what you want to know and receive instant AI-powered explanations and insights.</p>
              </div>
            </div>
            <div className="mt-8 p-4 bg-[#333] rounded-lg border border-[#444]">
              <p className="text-gray-300 text-center italic">
                "Simply select any text in your document, click on 'Ask AI', and type what you want to know. Our AI will analyze the content and provide you with detailed explanations and insights."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-6"
          >
            Ready to Get Organized?
          </motion.h3>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-10"
          >
            Join thousands of users who are already using Get Notey to organize their PDF documents.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button className="bg-gradient-to-r from-[#51cb20] to-[#3da00a] hover:from-[#45a049] hover:to-[#348c08] text-white text-lg px-10 py-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-[#51cb20]/20">
                {isSignedIn ? "Go to Dashboard" : "Get Started Now"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-[#0a0a0a] border-t border-[#222]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image 
                src="/logo.png" 
                alt="Get Notey Logo" 
                width={30} 
                height={30}
                className="rounded-md"
              />
              <span className="text-white font-medium">Get Notey</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-all">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-all">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-all">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Get Notey. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
