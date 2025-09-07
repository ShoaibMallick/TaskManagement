import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import users from '../data/users';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../features/task'; // adjust path as needed

function ProjectDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Always get project from Redux for up-to-date comments
  const project = useSelector(state => state.project.projects.find(p => p.id === id));

  const [comment, setComment] = useState('');
  const [user, setUser] = useState('');

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 w-full">
        <p className="text-lg font-semibold text-red-600 bg-white px-6 py-4 rounded-lg shadow">
          Project not found.
        </p>
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user.trim() || !comment.trim()) return;

    const newComment = {
      user,
      comment,
      date: new Date().toISOString(),
    };
    dispatch(addComment({ projectId: id, comment: newComment }));
    setComment('');
    setUser('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 w-full">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-5">
          <h2 className="text-3xl font-bold text-white">{project.projectName}</h2>
          <p className="text-purple-100 text-sm">
            Deadline: {moment(project.creationDate).format('MMMM Do YYYY')}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.projectDescription}
          </p>

          {/* Priority */}
          <div>
            <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">Priority:</span>
            <span
              className={`px-3 py-1 rounded-full text-white text-xs font-medium shadow ${project.priority === "High"
                  ? "bg-red-500"
                  : project.priority === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
            >
              {project.priority}
            </span>
          </div>

          {/* Comments */}
          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200 text-lg">
              Progress Comments
            </h3>

            {project.comments.length === 0 ? (
              <p className="text-sm text-gray-500">No comments yet.</p>
            ) : (
              <ul className="list-disc pl-5 space-y-2">
                {project.comments.map((c, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{c.user}:</span> {c.comment}
                    <span className="block text-xs text-gray-500">
                      ({moment(c.date).format('MMMM Do YYYY')})
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Comment Form */}
            <form className="mt-5 flex flex-col gap-3" onSubmit={handleCommentSubmit}>
              <select
                className="border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 dark:bg-gray-900 dark:text-gray-100"
                value={user}
                onChange={e => setUser(e.target.value)}
                required
              >
                <option value="">Select user</option>
                {users.map(u => (
                  <option key={u.id} value={u.username}>
                    {u.username}
                  </option>
                ))}
              </select>

              <textarea
                className="border rounded-lg px-3 py-2 text-sm shadow-sm resize-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-900 dark:text-gray-100"
                placeholder="Add a comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
                required
              />

              <button
                type="submit"
                className="self-end bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-lg transition-transform transform hover:scale-105"
              >
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
