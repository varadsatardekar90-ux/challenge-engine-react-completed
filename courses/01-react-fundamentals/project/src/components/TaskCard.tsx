import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import StatusIndicator from './StatusIndicator';
import Button from './Button';

interface TaskCardProps {
  id?: number;
  title: string;
  description: string;
  priority: string;
  category?: string;
  tags?: string[];
  completed?: boolean;
  dueDate?: string;
  onToggle?: () => void;
  onDelete?: () => void;
  onUpdate?: (updates: { title?: string; description?: string; priority?: string }) => void;
  linkToTaskDetail?: boolean;
}

function getDueDateStatus(dueDate: string, completed: boolean) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (!completed && diffDays < 0) return 'overdue' as const;
  if (diffDays === 0) return 'due-today' as const;
  if (diffDays <= 3) return 'due-soon' as const;
  return null;
}

function TaskCard({
  id, title, description, priority, category, tags,
  completed = false, dueDate, onToggle, onDelete, onUpdate,
  linkToTaskDetail = false,
}: TaskCardProps) {
  const status = dueDate ? getDueDateStatus(dueDate, completed) : null;
  const isOverdue = status === 'overdue';

  return (
    <div
      className={`task-card ${isOverdue ? 'overdue' : ''}`}
      data-overdue={isOverdue ? 'true' : undefined}
    >
      <h3>
        {linkToTaskDetail && id ? (
          <Link to={`/challenge/21-react-router/task/${id}`}>
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p>{description}</p>
      <Badge variant="priority">Priority: {priority}</Badge>
      {dueDate && (
        <span id="task-due-date">
          {new Date(dueDate).toLocaleDateString()}
        </span>
      )}
      {status && <StatusIndicator status={status} />}
      {completed && <StatusIndicator status="completed" />}
      {category && <Badge variant="category">{category}</Badge>}
      {tags && tags.map((tag) => (
        <Badge key={tag} variant="tag">{tag}</Badge>
      ))}
      <div className="task-actions">
        {onToggle && (
          <Button variant="secondary" onClick={onToggle}>
            {completed ? 'Undo' : 'Complete'}
          </Button>
        )}
        {onDelete && (
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}

export default React.memo(TaskCard);