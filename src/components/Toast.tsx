import React, { useState, useEffect } from 'react';

export const Toast: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleToast = (e: CustomEvent) => {
      setMessage(e.detail);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    };

    window.addEventListener('show-toast', handleToast as EventListener);
    return () => window.removeEventListener('show-toast', handleToast as EventListener);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-in fade-in slide-in-from-bottom-4">
      {message}
    </div>
  );
};

export const showToast = (message: string) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: message }));
};
