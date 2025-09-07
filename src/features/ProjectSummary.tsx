import React, { useState } from 'react';
// import axios from 'axios';
import projects from '../data/project';

const ProjectSummary = ({ onClose, projectId }) => {
  const project = projects.find(p => p.id === String(projectId));
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const getSummary = async () => {
    if (!project) return;
    setLoading(true);
    const prompt = `Summarize the project status and progress based on these comments:\n${project.comments.map(c => `${c.user} (${c.date}): ${c.comment}`).join('\n')}`;
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=API KEY',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );
      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary generated.';
      setSummary(aiText);
    } catch (err) {
      setSummary('Error summarizing comments.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)'}}>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        {project ? (
          <>
            <h3 className="text-lg font-semibold mb-2">{project.projectName}</h3>
            <p className="mb-2 text-gray-700 dark:text-gray-300">{project.projectDescription}</p>
            <p className="mb-2"><strong>Priority:</strong> {project.priority}</p>
            <p className="mb-2"><strong>Deadline:</strong> {project.projectDeadline}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={getSummary}
              disabled={loading}
            >
              {loading ? 'Summarizing...' : 'Get AI Summary'}
            </button>
            {summary && (
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <h4 className="font-semibold mb-2">AI Summary:</h4>
                <p>{summary}</p>
              </div>
            )}
          </>
        ) : (
          <p className="text-red-500">Project not found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectSummary;
