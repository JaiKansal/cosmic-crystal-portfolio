// app/components/Experience.tsx
import React from 'react';
import { experienceData } from './data/experienceData'; // Import data

type ExperienceProps = {
  data: typeof experienceData; // Get type from data
};

export default function Experience({ data }: ExperienceProps) {
  return (
    // --- THIS LINE IS UPDATED ---
    <div className="glass-card w-150 max-w-[500px] h-[60vh] max-h-[500px] p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Professional Experience
      </h2>
      
      <div className="relative">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-gray-700" />
        
        {data.map((job, index) => (
          <div key={index} className="relative pl-10 mb-8">
            <div className="absolute left-0 top-1.5 w-4 h-4 bg-cyan-500 rounded-full z-10 border-4 border-gray-900" />
            
            <p className="text-gray-400 text-sm mb-1">{job.date}</p>
            <h3 className="text-lg font-bold">{job.role}</h3>
            <p className="text-base font-semibold text-gray-300 mb-3">{job.company}</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              {job.points.map((point, pIndex) => (
                <li key={pIndex}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}