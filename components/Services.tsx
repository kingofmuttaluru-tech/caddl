
import React, { useState } from 'react';
import { DiagnosticService } from '../types';

const SERVICES: DiagnosticService[] = [
  {
    id: '1',
    title: 'Advanced MRI & CT',
    description: 'High-resolution neurological and orthopedic imaging for precise internal assessments.',
    icon: 'fa-brain',
    priceRange: '$500 - $1,200',
    prepInstructions: [
      'Fast your pet for 12 hours prior to arrival (no food, water is okay).',
      'Arrive 30 minutes early for sedation assessment.',
      'Bring previous medical records and current medication list.'
    ],
    fullPriceList: [
      { item: 'Brain MRI (Complete)', price: '$850' },
      { item: 'Spinal Series CT', price: '$650' },
      { item: 'Abdominal CT with Contrast', price: '$750' },
      { item: 'General Anesthesia Service', price: '$250' }
    ],
    moreImages: [
      'https://images.unsplash.com/photo-1579154235602-3c3132717366?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '2',
    title: 'Digital Radiography',
    description: 'Instant X-rays for bone fractures, organ evaluation, and dental health screenings.',
    icon: 'fa-x-ray',
    priceRange: '$150 - $400',
    prepInstructions: [
      'Minimal preparation required for most cases.',
      'Calming medication may be administered for anxious pets.',
      'Remove collars or harnesses before the procedure.'
    ],
    fullPriceList: [
      { item: 'Thoracic X-ray (2 Views)', price: '$180' },
      { item: 'Orthopedic Series', price: '$220' },
      { item: 'Dental Radiography (Full Mouth)', price: '$250' }
    ],
    moreImages: [
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '3',
    title: 'Ultrasound Imaging',
    description: 'Non-invasive soft tissue assessment including echocardiograms and abdominal scans.',
    icon: 'fa-wave-square',
    priceRange: '$250 - $600',
    prepInstructions: [
      'Fasting for 8 hours is recommended for abdominal scans.',
      'Small areas of fur may need to be shaved for optimal image quality.',
      'Full bladder often required for urinary tract scans.'
    ],
    fullPriceList: [
      { item: 'Complete Abdominal Ultrasound', price: '$350' },
      { item: 'Echocardiogram (Cardiac)', price: '$450' },
      { item: 'Pregnancy Confirmation', price: '$150' }
    ],
    moreImages: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '4',
    title: 'Clinical Pathology',
    description: 'Comprehensive blood panels, urinalysis, and endocrinology testing with rapid results.',
    icon: 'fa-vial',
    priceRange: '$80 - $300',
    prepInstructions: [
      'Morning samples are preferred for most endocrine tests.',
      'Fasted blood work provides the most accurate lipid results.',
      'Inform staff if your pet is on any specific vitamins or supplements.'
    ],
    fullPriceList: [
      { item: 'Comprehensive Metabolic Panel', price: '$95' },
      { item: 'Complete Blood Count (CBC)', price: '$65' },
      { item: 'Urinalysis with Sediments', price: '$45' }
    ]
  },
  {
    id: '5',
    title: 'Histopathology',
    description: 'Cellular level analysis of biopsies and masses for cancer screening.',
    icon: 'fa-microscope',
    priceRange: '$200 - $500',
    prepInstructions: [
      'Biopsy sites should be kept clean and dry.',
      'Previous cytology reports are helpful for context.',
      'Allow 3-5 business days for expert pathologist review.'
    ],
    fullPriceList: [
      { item: 'Small Tissue Biopsy', price: '$180' },
      { item: 'Large Mass Histopathology', price: '$350' },
      { item: 'Fine Needle Aspirate (FNA)', price: '$110' }
    ]
  },
  {
    id: '6',
    title: 'Allergy & Immunology',
    description: 'Identifying underlying environmental and food triggers for chronic skin conditions.',
    icon: 'fa-allergies',
    priceRange: '$120 - $450',
    prepInstructions: [
      'Stop antihistamines 7 days before testing.',
      'Bring current diet brand and ingredient list.',
      'Best performed during a non-flare state if possible.'
    ],
    fullPriceList: [
      { item: 'Regional Allergy Panel (Blood)', price: '$280' },
      { item: 'Intradermal Skin Testing', price: '$420' },
      { item: 'Food Elimination Consultation', price: '$95' }
    ]
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<DiagnosticService | null>(null);

  const closeModal = () => setSelectedService(null);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Diagnostic Capabilities</h2>
            <p className="text-lg text-gray-600">
              We provide the full spectrum of diagnostic tools to uncover what ails your pet. Our lab is equipped with the latest technology for speed and accuracy.
            </p>
          </div>
          <button className="text-blue-600 font-bold flex items-center hover:underline whitespace-nowrap">
            View Price Catalog <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              onClick={() => setSelectedService(service)}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i className={`fas ${service.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 line-clamp-2">{service.description}</p>
              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 italic">Est. {service.priceRange}</span>
                <button 
                  className="text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                  <i className={`fas ${selectedService.icon} text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedService.title}</h3>
                  <p className="text-sm text-blue-600 font-semibold">{selectedService.priceRange} Estimated Range</p>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    Service Overview
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {selectedService.description} Our department uses the latest-generation equipment to ensure minimal stress for the pet and maximum clarity for the diagnostic report. All tests are supervised by board-certified radiologists or clinical pathologists.
                  </p>

                  {selectedService.prepInstructions && (
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-notes-medical text-blue-600"></i>
                        Preparation Instructions
                      </h4>
                      <ul className="space-y-3">
                        {selectedService.prepInstructions.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600">
                            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedService.moreImages && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Facility & Equipment</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedService.moreImages.map((img, i) => (
                          <img key={i} src={img} alt="Facility" className="w-full h-32 object-cover rounded-xl shadow-sm hover:opacity-90 transition-opacity cursor-pointer" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 self-start">
                  <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="fas fa-list-ul text-blue-600"></i>
                    Price Breakdown
                  </h4>
                  <div className="space-y-4">
                    {selectedService.fullPriceList?.map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                        <span className="text-gray-700 font-medium">{item.item}</span>
                        <span className="text-gray-900 font-bold">{item.price}</span>
                      </div>
                    ))}
                    {!selectedService.fullPriceList && (
                      <p className="text-sm text-gray-500 italic">Detailed price breakdown available upon referral. Contact us for a specific quote based on your pet's needs.</p>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      onClick={() => {
                        closeModal();
                        window.location.hash = 'booking';
                      }}
                      className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-calendar-plus"></i>
                      Book This Service
                    </button>
                    <p className="text-[10px] text-center text-gray-400 mt-4 uppercase font-bold tracking-widest">
                      24h Rapid Turnaround Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
