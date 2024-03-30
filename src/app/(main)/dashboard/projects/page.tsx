import React from 'react'

export default function ComingSoon() {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800">Coming Soon</h1>
          <p className="mt-4 text-lg text-gray-600 text-center">We're working on something amazing. Stay tuned!</p>
          <div className="mt-8 flex justify-center">
            <img src="https://source.unsplash.com/400x300/?coming-soon" alt="Coming Soon" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
  );
}
