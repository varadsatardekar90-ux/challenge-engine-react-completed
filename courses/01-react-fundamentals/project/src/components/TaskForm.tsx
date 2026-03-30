import React, { useState } from 'react';
import FormInput from './FormInput';
import Button from './Button';

interface TaskFormProps {
  onAdd: (title: string, dueDate?: string) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, dueDate || undefined);
    setText('');
    setDueDate('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <FormInput
        id="task-title"
        label="Task Title"
        value={text}
        onChange={setText}
        placeholder="Add a new task"
      />
      <FormInput
        id="task-due-date-input"
        label="Due Date"
        value={dueDate}
        onChange={setDueDate}
        type="date"
      />
      <Button type="submit" variant="primary">Add Task</Button>
    </form>
  );
}

export default TaskForm;