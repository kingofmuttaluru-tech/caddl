
import React, { useState } from 'react';

const AppointmentForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 bg-blue-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white p-12 rounded-3xl shadow-2xl">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-4xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Received!</h2>
            <p className="text-gray-600 mb-8">
              One of our patient coordinators will contact you within 2 hours to confirm your pet's appointment and provide preparation instructions.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-blue-600 font-bold hover:underline"
            >
              Book another service
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-blue-600 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Schedule Your Visit</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Fast-track your pet's diagnostic journey. Select your preferred date and time, and our team will handle the rest. We coordinate directly with your primary veterinarian.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: 'fa-calendar-check', text: 'Instant appointment confirmation' },
                { icon: 'fa-clock', text: 'Same-day emergency scans available' },
                { icon: 'fa-file-medical', text: 'Direct results sent to your vet' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span className="font-semibold text-lg">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pet Owner Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pet Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Buddy" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="(555) 000-0000" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Required Diagnostic</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1em_1em] bg-[right_1rem_center] bg-no-repeat">
                  <option>Select a test...</option>
                  <option>MRI Scan</option>
                  <option>CT Scan</option>
                  <option>X-Ray</option>
                  <option>Ultrasound</option>
                  <option>Blood Panel</option>
                  <option>Biopsy / Histopathology</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date</label>
                <input required type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-[0.98]">
                Submit Booking Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
