
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">CareSphere</span>
            </div>
            <p className="text-gray-400 text-sm">
              Secure, transparent, and accessible health records on the blockchain
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center">
                  <span className="h-[2px] w-4 bg-primary mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center">
                  <span className="h-[2px] w-4 bg-primary mr-2"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center">
                  <span className="h-[2px] w-4 bg-primary mr-2"></span>
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center">
                  <span className="h-[2px] w-4 bg-primary mr-2"></span>
                  Medical Records
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center">
                  <span className="h-[2px] w-4 bg-primary mr-2"></span>
                  Doctor Registry
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center">
                  <span className="h-[2px] w-4 bg-primary mr-2"></span>
                  Access Control
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/kigarama" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors duration-300">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/kigarama" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/in/kigarama" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors duration-300">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Developer Credit */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CareSphere. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Developed by</span>
              <a href="https://github.com/kigarama" 
                className="ml-2 font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300">
                Kigarama TSS
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 