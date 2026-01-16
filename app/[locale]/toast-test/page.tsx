'use client';

import { useToast } from '@/store/useToastStore';
import { useState } from 'react';

export default function Home() {
  const toast = useToast();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Simulate success
      if (formData.name && formData.email) {
        toast.success('Record created successfully! 🎉');
        setFormData({ name: '', email: '' });
      } else {
        toast.error('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Toast Notification System
        </h1>

        {/* Demo Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create New Record</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isLoading ? 'Creating...' : 'Create Record'}
            </button>
          </form>
        </div>

        {/* Demo Buttons */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Toast Examples</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => toast.success('Operation completed successfully!')}
              className="bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Success Toast
            </button>
            <button
              onClick={() => toast.error('Something went wrong. Please try again.')}
              className="bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Error Toast
            </button>
            <button
              onClick={() => toast.warning('Please review your input before continuing.')}
              className="bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Warning Toast
            </button>
            <button
              onClick={() => toast.info('Here is some helpful information for you.')}
              className="bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Info Toast
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => {
                toast.success('First notification');
                setTimeout(() => toast.info('Second notification'), 200);
                setTimeout(() => toast.warning('Third notification'), 400);
              }}
              className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors"
            >
              Multiple Toasts
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => toast.success('This will stay for 10 seconds', 10000)}
              className="w-full bg-indigo-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-600 transition-colors"
            >
              Long Duration Toast (10s)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}