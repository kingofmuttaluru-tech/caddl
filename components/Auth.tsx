
import React, { useState } from 'react';

const Auth: React.FC<{ onLogin: () => void; onBack: () => void }> = ({ onLogin, onBack }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="mb-8 text-gray-400 hover:text-blue-600 font-bold text-sm flex items-center gap-2 group transition-colors">
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to Public Site
        </button>
        
        <div className="text-center mb-10">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200">
            <i className="fas fa-user-shield text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Staff Access</h1>
          <p className="text-gray-500">Authorized personnel only</p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Center ID / Username</label>
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  required 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                  placeholder="e.g. admin_01" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Access Key</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  required 
                  type="password" 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                'Log In to Dashboard'
              )}
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400 font-medium">
              Having trouble logging in? <br/>
              Contact <a href="#" className="text-blue-600 hover:underline">System Administration</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
