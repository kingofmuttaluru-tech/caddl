
import React, { useState, useRef, useCallback } from 'react';
import { analyzePetSymptom } from '../services/geminiService';
import { ChatMessage, DiagnosticStatus } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<DiagnosticStatus>(DiagnosticStatus.IDLE);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: inputText,
      timestamp: new Date(),
      imageUrl: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);
    setStatus(DiagnosticStatus.LOADING);

    try {
      const response = await analyzePetSymptom(userMessage.text, userMessage.imageUrl);
      const aiMessage: ChatMessage = {
        role: 'model',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setStatus(DiagnosticStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(DiagnosticStatus.ERROR);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="ai-consult" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">VetiScan AI Symptom Analyzer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Describe your pet's symptoms or upload a photo of the concern (e.g., skin rash, swelling). Our AI assistant provides instant preliminary insights while you wait for your vet appointment.
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-xl flex flex-col h-[600px] overflow-hidden">
          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                <i className="fas fa-comments text-5xl mb-4 text-blue-100"></i>
                <p>Hello! I can help analyze your pet's symptoms.<br/>Tell me what's going on or upload a photo.</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-800 shadow-sm prose prose-sm'
                }`}>
                  {msg.imageUrl && (
                    <img src={msg.imageUrl} alt="Pet symptom" className="w-full h-48 object-cover rounded-lg mb-3" />
                  )}
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className={`text-[10px] mt-2 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {status === DiagnosticStatus.LOADING && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500">Analyzing data...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-4 bg-white border-t border-gray-200">
            {selectedImage && (
              <div className="mb-3 relative inline-block">
                <img src={selectedImage} alt="Preview" className="h-20 w-20 object-cover rounded-lg border-2 border-blue-500" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
              >
                <i className="fas fa-camera"></i>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*" 
              />
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe symptoms... (e.g. 'My cat has been lethargic and won't eat')"
                className="flex-1 resize-none bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl px-4 py-3 min-h-[48px] max-h-32"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={status === DiagnosticStatus.LOADING || (!inputText.trim() && !selectedImage)}
                className="flex-shrink-0 w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full flex items-center justify-center transition-all shadow-lg shadow-blue-200"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              <i className="fas fa-info-circle mr-1"></i>
              AI results are for informational purposes only. Consult a veterinarian for professional diagnosis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
