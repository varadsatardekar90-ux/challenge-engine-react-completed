import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../contexts/ThemeContext';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  category?: string;
  tags?: string[];
  dueDate?: string;
}

function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tasks] = useLocalStorage<Task[]>('task-app-tasks', []);

  const task = tasks.find((t) => t.id === Number(id));

  const handleBack = () => {
    navigate('/challenge/21-react-router');
  };

  if (!task) {
    return (
      <div id="task-detail-page">
        <p>Task not found.</p>
        <button id="task-detail-back" onClick={handleBack}>
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div id="task-detail-page">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.completed ? 'Completed' : 'Active'}</p>
      {task.category && <p>Category: {task.category}</p>}
      {task.dueDate && (
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
      {task.tags && task.tags.length > 0 && (
        <p>Tags: {task.tags.join(', ')}</p>
      )}
      <button id="task-detail-back" onClick={handleBack}>
        Back to list
      </button>
    </div>
  );
}

export default TaskDetailPage;