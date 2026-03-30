import React, { useEffect, useMemo, useReducer, useCallback } from 'react';
import TaskForm from './TaskForm';
import FilterBar from './FilterBar';
import TaskList from './TaskList';
import StatsPanel from './StatsPanel';
import ErrorBoundary from './ErrorBoundary';
import { useTheme, useLocalStorage } from '../contexts/ThemeContext';

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

const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';
const SET_TASKS = 'SET_TASKS';

type Action =
  | { type: typeof ADD_TASK; payload: Task }
  | { type: typeof UPDATE_TASK; payload: Partial<Task> & { id: number } }
  | { type: typeof DELETE_TASK; payload: number }
  | { type: typeof TOGGLE_TASK; payload: number }
  | { type: typeof SET_TASKS; payload: Task[] };

const addTask = (task: Task): Action => ({ type: ADD_TASK, payload: task });
const updateTask = (updates: Partial<Task> & { id: number }): Action => ({ type: UPDATE_TASK, payload: updates });
const deleteTask = (id: number): Action => ({ type: DELETE_TASK, payload: id });
const toggleTask = (id: number): Action => ({ type: TOGGLE_TASK, payload: id });
const setTasksAction = (tasks: Task[]): Action => ({ type: SET_TASKS, payload: tasks });

function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case UPDATE_TASK:
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t
      );
    case DELETE_TASK:
      return state.filter((t) => t.id !== action.payload);
    case TOGGLE_TASK:
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    case SET_TASKS:
      return action.payload;
    default:
      return state;
  }
}

interface TaskAppProps {
  showStatsPanel?: boolean;
  showFilterBar?: boolean;
  linkToTaskDetail?: boolean;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}

function TaskApp({ showStatsPanel = false, showFilterBar = true, linkToTaskDetail = false }: TaskAppProps) {
  const { theme } = useTheme();
  const [savedTasks, setSavedTasks] = useLocalStorage<Task[]>('task-app-tasks', []);
  const [tasks, dispatch] = useReducer(taskReducer, savedTasks);
  const [filter, setFilter] = useLocalStorage<string>('task-app-filter', '');
  const [sortOption, setSortOption] = useLocalStorage<string>('task-app-sort', '');
  const [debouncedFilter, setDebouncedFilter] = React.useState(filter);

  useEffect(() => {
    setSavedTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    dispatch(setTasksAction(savedTasks));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFilter(filter), 300);
    return () => clearTimeout(timer);
  }, [filter]);

  const handleAddTask = useCallback((title: string, dueDate?: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description: '',
      priority: 'High',
      completed: false,
      dueDate,
    };
    dispatch(addTask(newTask));
  }, [dispatch]);

  const handleToggleTask = useCallback((id: number) => {
    dispatch(toggleTask(id));
  }, [dispatch]);

  const handleDeleteTask = useCallback((id: number) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  const handleUpdateTask = useCallback((updates: Partial<Task> & { id: number }) => {
    dispatch(updateTask(updates));
  }, [dispatch]);

  const handleFilterChange = useCallback((val: string) => {
    setFilter(val);
  }, [setFilter]);

  const handleSortChange = useCallback((val: string) => {
    setSortOption(val);
  }, [setSortOption]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = tasks.filter((t) => !t.completed).length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdue = tasks.filter((t) => {
      if (t.completed || !t.dueDate) return false;
      return new Date(t.dueDate) < today;
    }).length;
    return { total, completed, active, overdue };
  }, [tasks]);

  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks.filter((task) =>
      task.title.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
    if (sortOption === 'due-date') {
      result = [...result].sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }
    return result;
  }, [tasks, debouncedFilter, sortOption]);

  return (
    <div className="task-app-container" data-theme={theme}>
      <ThemeToggle />
      {showStatsPanel && (
        <StatsPanel
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
          overdue={stats.overdue}
        />
      )}
      <TaskForm onAdd={handleAddTask} />
      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={handleFilterChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
      )}
      <ErrorBoundary>
        <TaskList
          tasks={filteredAndSortedTasks}
          countText={`${filteredAndSortedTasks.length} Tasks`}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          linkToTaskDetail={linkToTaskDetail}
        />
      </ErrorBoundary>
    </div>
  );
}

export default TaskApp;