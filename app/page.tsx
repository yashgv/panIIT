import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import picc from '@/app/picc.jpg'; 

const LandingPage = () => {
  const services = [
    {
      title: "SEO Services",
      description: "Optimize your site for search engines.",
      icon: "📊"
    },
    {
      title: "Marketing",
      description: "Grow your brand through smart marketing.",
      icon: "📈"
    },
    {
      title: "Web Design",
      description: "Stunning and responsive designs.",
      icon: "💻"
    },
    {
      title: "Creative Ideas",
      description: "Turn ideas into reality.",
      icon: "💡"
    }
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "CEO",
      comment: "Outstanding service and results!",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      comment: "Transformed our online presence.",
      rating: 5
    },
    {
      name: "Mike Wilson",
      role: "Founder",
      comment: "Best decision for our business.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white py-4 px-6 flex items-center justify-between shadow-sm">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          Logo
        </Link>
        
        <nav className="flex items-center space-x-8">
          <Link href="/about" className="text-gray-600 hover:text-orange-500 transition-colors">
            About
          </Link>
          <Link href="/stats" className="text-gray-600 hover:text-orange-500 transition-colors">
            Stats
          </Link>
          <Link href="/accounts" className="text-gray-600 hover:text-orange-500 transition-colors">
            Accounts
          </Link>
          <Link 
            href="/contact"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We create solutions for your business
            </h1>
            <p className="text-gray-600 mb-8">
              Our team provides outstanding services to help businesses thrive in a competitive environment.
            </p>
            <Link 
              href="/dashboard"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative h-80">
              <Image 
                src={picc}
                alt="Business Solutions"
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            We Provide The Best Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
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
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-orange-500">About</Link></li>
                <li><Link href="/services" className="text-gray-600 hover:text-orange-500">Services</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-orange-500">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="/seo" className="text-gray-600 hover:text-orange-500">SEO</Link></li>
                <li><Link href="/marketing" className="text-gray-600 hover:text-orange-500">Marketing</Link></li>
                <li><Link href="/web-design" className="text-gray-600 hover:text-orange-500">Web Design</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-600 hover:text-orange-500">Blog</Link></li>
                <li><Link href="/faq" className="text-gray-600 hover:text-orange-500">FAQ</Link></li>
                <li><Link href="/support" className="text-gray-600 hover:text-orange-500">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-orange-500">
                  <span className="sr-only">Facebook</span>
                  📱
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500">
                  <span className="sr-only">Twitter</span>
                  📱
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500">
                  <span className="sr-only">LinkedIn</span>
                  📱
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