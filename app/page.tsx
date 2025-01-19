'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import picc from '@/app/picc.png';
import { FaInstagram, FaFacebookF, FaTiktok, FaChartLine, FaUsers, FaCamera, FaSearchDollar } from 'react-icons/fa';
import "/styles/globals.css";

const LandingPage = () => {
  const services = [
    {
      title: "Social Media Management",
      description: "Strategic content planning and posting across platforms.",
      icon: <FaInstagram className="text-4xl text-indigo-400" />
    },
    {
      title: "Content Creation",
      description: "Engaging posts, reels, and stories that connect.",
      icon: <FaCamera className="text-4xl text-indigo-400" />
    },
    {
      title: "Community Growth",
      description: "Build and engage with your online audience.",
      icon: <FaUsers className="text-4xl text-indigo-400" />
    },
    {
      title: "ROI Tracking",
      description: "Measure and optimize your social media success.",
      icon: <FaSearchDollar className="text-4xl text-indigo-400" />
    }
  ];

  const testimonials = [
    {
      name: "Sarah's Boutique",
      role: "Fashion Retailer",
      comment: "Doubled our Instagram following in 3 months!",
      rating: 5
    },
    {
      name: "Local Cafe",
      role: "Restaurant Owner",
      comment: "Our social media presence has transformed completely.",
      rating: 5
    },
    {
      name: "Fitness Studio",
      role: "Small Business Owner",
      comment: "Finally getting real engagement on our posts.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white py-4 px-6 flex items-center justify-between shadow-lg">
        <Link href="/" className="text-3xl font-bold text-indigo-600">
          Postify
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">
            About
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Pricing
          </Link>
          <Link href="/portfolio" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Portfolio
          </Link>
          <button 
            onClick={() => signIn()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-24 px-6 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold mb-6 text-white">
              Grow Your Small Business on Social Media
            </h1>
            <p className="text-gray-100 mb-8">
              Our team provides specialized services to help businesses thrive on social media platforms, boost online engagement, and build lasting digital presence.
            </p>
            <Link 
              href="/dashboard"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md font-semibold"
            >
              Boost Your Presence
            </Link>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative h-80">
              <Image 
                src={picc}
                alt="Social Media Growth"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Transform Your Social Media Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.comment}</p>
                <div className="flex text-yellow-400">
                  {"⭐".repeat(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Company
              </h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-indigo-500">About</Link></li>
                <li><Link href="/services" className="text-gray-600 hover:text-indigo-500">Services</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-indigo-500">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Services
              </h3>
              <ul className="space-y-2">
                <li><Link href="/instagram" className="text-gray-600 hover:text-indigo-500">Instagram</Link></li>
                <li><Link href="/tiktok" className="text-gray-600 hover:text-indigo-500">TikTok</Link></li>
                <li><Link href="/facebook" className="text-gray-600 hover:text-indigo-500">Facebook</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Resources
              </h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-600 hover:text-indigo-500">Blog</Link></li>
                <li><Link href="/guides" className="text-gray-600 hover:text-indigo-500">Guides</Link></li>
                <li><Link href="/tips" className="text-gray-600 hover:text-indigo-500">Tips & Tricks</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-indigo-500 hover:text-indigo-600 text-2xl">
                  <FaInstagram />
                </a>
                <a href="#" className="text-indigo-500 hover:text-indigo-600 text-2xl">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-indigo-500 hover:text-indigo-600 text-2xl">
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;