import React from 'react';

type Status = 'overdue' | 'due-today' | 'due-soon' | 'completed';

interface StatusIndicatorProps {
  status: Status;
}

const STATUS_LABELS: Record<Status, string> = {
  'overdue': 'Overdue',
  'due-today': 'Due Today',
  'due-soon': 'Due Soon',
  'completed': 'Completed',
};

function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <span className={`status-indicator status-${status}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

export default StatusIndicator;