import React, { useEffect, useMemo, useReducer, useCallback, useState } from 'react';
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

const PRIORITY_WEIGHT: Record<string, number> = { High: 3, Medium: 2, Low: 1 };

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
  // Internal props
  showStatsPanel?: boolean;
  showFilterBar?: boolean;
  linkToTaskDetail?: boolean;
  // Legacy props from App.tsx (accepted but managed internally)
  tasks?: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  showForm?: boolean;
  countFormat?: string;
  onDelete?: (id: string | number) => void;
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

type FilterOption = 'all' | 'active' | 'completed';

function TaskApp({
  showStatsPanel = false,
  showFilterBar = true,
  linkToTaskDetail = false,
  tasks: _tasks,
  setTasks: _setTasks,
  showForm: _showForm,
  countFormat: _countFormat,
  onDelete: _onDelete,
}: TaskAppProps) {
  const { theme } = useTheme();
  const [savedTasks, setSavedTasks] = useLocalStorage<Task[]>('task-app-tasks', []);
  const [tasks, dispatch] = useReducer(taskReducer, savedTasks);
  const [filter, setFilter] = useState<FilterOption>('all');
  const [sortOption, setSortOption] = useState<string>('');
  const [searchFilter, setSearchFilter] = useLocalStorage<string>('task-app-filter', '');
  const [debouncedSearch, setDebouncedSearch] = React.useState(searchFilter);

  useEffect(() => {
    setSavedTasks(tasks);
  }, [tasks, setSavedTasks]);

  useEffect(() => {
    dispatch(setTasksAction(savedTasks)); // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchFilter), 300);
    return () => clearTimeout(timer);
  }, [searchFilter]);

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

  const handleSortChange = useCallback((val: string) => {
    setSortOption(val);
  }, []);

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
    const filtered = tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesFilter =
        filter === 'all' ? true :
        filter === 'active' ? !task.completed :
        task.completed;
      return matchesSearch && matchesFilter;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === 'priority-high-low') {
        return (PRIORITY_WEIGHT[b.priority] ?? 0) - (PRIORITY_WEIGHT[a.priority] ?? 0);
      }
      if (sortOption === 'priority-low-high') {
        return (PRIORITY_WEIGHT[a.priority] ?? 0) - (PRIORITY_WEIGHT[b.priority] ?? 0);
      }
      if (sortOption === 'alphabetical') {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      return 0;
    });

    return sorted;
  }, [tasks, debouncedSearch, sortOption, filter]);

  const countText = filter === 'all' && !debouncedSearch
    ? `${filteredAndSortedTasks.length} Tasks`
    : `Showing ${filteredAndSortedTasks.length} of ${tasks.length} tasks`;

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
          onFilterChange={setFilter}
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
      )}
      <ErrorBoundary>
        <TaskList
          tasks={filteredAndSortedTasks}
          countText={countText}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          linkToTaskDetail={linkToTaskDetail}
          emptyMessage={filter !== 'all' ? 'No tasks match this filter' : undefined}
        />
      </ErrorBoundary>
    </div>
  );
}

export default TaskApp;