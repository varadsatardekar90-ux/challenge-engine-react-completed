// import React from 'react';
// import TaskCard from './TaskCard';

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   priority: string;
//   completed: boolean;
//   category?: string;
//   tags?: string[];
//   dueDate?: string;
// }

// interface TaskListProps {
//   tasks: Task[];
//   countText?: string;
//   onToggle?: (id: number) => void;
//   onDelete?: (id: number) => void;
//   onUpdate?: (updates: Partial<Task> & { id: number }) => void;
//   linkToTaskDetail?: boolean;
// }

// function TaskList({ tasks, countText, onToggle, onDelete, onUpdate, linkToTaskDetail = false }: TaskListProps) {
//   return (
//     <div className="task-list">
//       {countText && <p className="task-count">{countText}</p>}
//       {tasks.map((task) => (
//         <TaskCard
//           key={task.id}
//           id={task.id}
//           title={task.title}
//           description={task.description}
//           priority={task.priority}
//           completed={task.completed}
//           category={task.category}
//           tags={task.tags}
//           dueDate={task.dueDate}
//           linkToTaskDetail={linkToTaskDetail}
//           onToggle={onToggle ? () => onToggle(task.id) : undefined}
//           onDelete={onDelete ? () => onDelete(task.id) : undefined}
//           onUpdate={onUpdate ? (updates) => onUpdate({ ...updates, id: task.id }) : undefined}
//         />
//       ))}
//     </div>
//   );
// }

// export default TaskList;



import React from 'react';
import TaskCard from './TaskCard';

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

interface TaskListProps {
  tasks: Task[];
  countText?: string;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  onUpdate?: (updates: Partial<Task> & { id: number }) => void;
  linkToTaskDetail?: boolean;
}

function TaskList({ tasks, countText, onToggle, onDelete, onUpdate, linkToTaskDetail = false }: TaskListProps) {
  return (
    <div className="task-list">
      {countText && <p id="task-count" className="task-count">{countText}</p>}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          completed={task.completed}
          category={task.category}
          tags={task.tags}
          dueDate={task.dueDate}
          linkToTaskDetail={linkToTaskDetail}
          onToggle={onToggle ? () => onToggle(task.id) : undefined}
          onDelete={onDelete ? () => onDelete(task.id) : undefined}
          onUpdate={onUpdate ? (updates) => onUpdate({ ...updates, id: task.id }) : undefined}
        />
      ))}
    </div>
  );
}

export default TaskList;