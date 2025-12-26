
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <i className="fas fa-microscope text-white text-xl"></i>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">VetiScan<span className="text-blue-500">AI</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              State-of-the-art veterinary diagnostic center providing advanced imaging, pathology, and AI-driven health insights for our animal companions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Diagnostic Hub</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">MRI & CT Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Laboratory Testing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Digital Radiology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Symptom Checker</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Preparation Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For Veterinarians</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing Info</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1 text-blue-500"></i>
                <span>123 Vet Med Parkway, <br/>Innovation District, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-blue-500"></i>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-blue-500"></i>
                <span>support@vetiscan.ai</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-xs">
          <p>© {new Date().getFullYear()} VetiScan AI Diagnostic Centre. All rights reserved. Professional veterinary advice should always be sought before any health decisions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
