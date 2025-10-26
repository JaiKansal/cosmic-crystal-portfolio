// app/components/Skills.tsx
import React from 'react'
import { skillsData } from './data/skillsData'; // Import data

type SkillsProps = {
  data: typeof skillsData;
};

export default function Skills({ data }: SkillsProps) {
  return (
    // --- THIS LINE IS UPDATED ---
    <div className="glass-card w-full max-w-[500px] h-[60vh] max-h-[500px] p-4 sm:p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Technical Skills
      </h2>
      
      <div className="flex flex-col gap-6">
        {Object.entries(data).map(([category, list]) => (
          <div key={category}>
            <h3 className="text-base font-bold text-gray-200 mb-3 uppercase tracking-wider">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {list.map((skill) => (
                <span 
                  key={skill} 
                  className="bg-gray-800 text-gray-200 font-medium px-3 py-1.5 rounded-md shadow-sm text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}