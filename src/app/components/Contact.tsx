// app/components/Contact.tsx
"use client";

import React from 'react';

export default function Contact() {
  return (
    // --- THIS LINE IS UPDATED ---
    <div className="glass-card w-full max-w-[500px] h-auto max-h-[60vh] p-4 sm:p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Contact Me
      </h2>
      
      <p className="text-gray-300 text-sm mb-4">
        Have a question or want to work together? Send me a message!
      </p>

      <form 
        action="https://formspree.io/f/YOUR_UNIQUE_ID" // <-- MAKE SURE YOU PASTED YOUR URL HERE
        method="POST"
        className="flex flex-col gap-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name" 
            className="block w-full bg-gray-800/70 border border-gray-700 rounded-md p-2 text-gray-100
                       focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Jai Kansal"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email" 
            className="block w-full bg-gray-800/70 border border-gray-700 rounded-md p-2 text-gray-100
                       focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message" 
            rows={4}
            className="block w-full bg-gray-800/70 border border-gray-700 rounded-md p-2 text-gray-100
                       focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="I'd love to connect about..."
            required
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-cyan-500 text-gray-950 font-bold py-2.5 px-4 rounded-md
                       transition-all hover:bg-cyan-400 focus:outline-none 
                       focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}