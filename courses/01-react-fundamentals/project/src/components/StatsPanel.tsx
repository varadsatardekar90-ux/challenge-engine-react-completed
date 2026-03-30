import React from 'react';

interface StatsPanelProps {
  total: number;
  completed: number;
  active: number;
  overdue: number;
}

function StatsPanel({ total, completed, active, overdue }: StatsPanelProps) {
  const completedPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div id="stats-panel">
      <h2>Task Statistics</h2>

      <div className="stats-grid">
        <div className="stat-item">
          <span>Total: {total}</span>
        </div>
        <div className="stat-item">
          <span>Completed: {completed}</span>
        </div>
        <div className="stat-item">
          <span>Active: {active}</span>
        </div>
        <div className="stat-item">
          <span>Overdue: {overdue}</span>
        </div>
      </div>

      <div className="progress-container">
        <span>Completion: {completedPct}%</span>
        <div
          role="progressbar"
          aria-valuenow={completedPct}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: 4, height: 12 }}
        >
          <div
            style={{
              width: `${completedPct}%`,
              backgroundColor: '#4caf50',
              height: '100%',
              borderRadius: 4,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;