
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
              VETERINARY DIAGNOSTIC EXCELLENCE
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Advanced Diagnostics for <span className="text-blue-600">Healthier</span> Pets.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-xl">
              From MRI scans to advanced pathology, our center combines high-tech imaging with AI-driven insights to help your vet make the right call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="inline-flex justify-center items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-200">
                Book a Diagnostic Scan
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <a href="#ai-consult" className="inline-flex justify-center items-center px-8 py-4 bg-white border-2 border-gray-200 hover:border-blue-600 text-gray-900 rounded-xl font-bold transition-all">
                Try AI Symptom Checker
              </a>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                alt="Modern veterinary equipment" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} src={`https://picsum.photos/40/40?random=${i}`} className="w-10 h-10 rounded-full border-2 border-white" alt="Vet" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Trusted by 500+ Clinics</p>
                    <p className="text-xs text-gray-500">24h turnaround for most reports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-blue-50/50 skew-x-12 translate-x-1/2"></div>
    </section>
  );
};

export default Hero;
