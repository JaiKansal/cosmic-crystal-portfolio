// app/components/Projects.tsx
import React from 'react'
import { projectData } from './data/projectData'; // Import data

type ProjectsProps = {
  data: typeof projectData;
};

export default function Projects({ data }: ProjectsProps) {
  return (
    // --- THIS LINE IS UPDATED ---
    <div className="glass-card w-full sm:w-[600px] lg:w-[700px] max-w-full h-[60vh] max-h-[500px] p-4 sm:p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Featured Projects
      </h2>
      
      <div className="flex flex-col gap-6">
        {data.map((project, index) => (
          <div 
            key={index}
            className="bg-gray-800/50 p-4 rounded-lg"
          >
            <h3 className="text-lg font-bold mb-2 text-white">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tIndex) => (
                <span key={tIndex} className="bg-gray-900 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}