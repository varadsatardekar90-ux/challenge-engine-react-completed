import React from 'react';

interface ErrorDisplayProps {
  error: unknown;
  onRetry?: () => void;
}

function getErrorMessage(error: unknown): string {
  if (
    error !== null &&
    typeof error === 'object' &&
    'data' in error &&
    error.data !== null &&
    typeof error.data === 'object' &&
    'message' in error.data &&
    typeof (error.data as { message: unknown }).message === 'string'
  ) {
    return (error.data as { message: string }).message;
  }
  if (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred. Please try again.';
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  const message = getErrorMessage(error);

  return (
    <div
      data-testid="error-display"
      role="alert"
      style={{
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#dc2626',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span aria-hidden="true">⚠️</span>
        <span>{message}</span>
      </div>
      {onRetry !== undefined && (
        <button
          data-testid="retry-btn"
          onClick={onRetry}
          type="button"
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid #dc2626',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;