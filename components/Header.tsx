
import React from 'react';

const Header: React.FC<{ onStaffClick: () => void }> = ({ onStaffClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="fas fa-microscope text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">VetiScan<span className="text-blue-600">AI</span></span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Services</a>
            <a href="#ai-consult" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">AI Analysis</a>
            <a href="#booking" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Book Lab</a>
            <button onClick={onStaffClick} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Staff Portal</button>
          </nav>
          
          <div className="flex items-center gap-4">
            <a href="tel:+1800VETISCAN" className="hidden lg:flex items-center text-blue-600 font-semibold gap-2">
              <i className="fas fa-phone"></i>
              <span>1-800-VETI-SCAN</span>
            </a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-sm">
              Patient Results
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
