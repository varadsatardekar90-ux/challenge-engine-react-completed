import React from 'react';
import { useGetPostsQuery, Post } from '../api/apiSlice';
import ErrorDisplay from './ErrorDisplay';

const UsersList: React.FC = () => {
  const { data: posts, isLoading, isError, error, refetch } = useGetPostsQuery();

  if (isLoading) {
    return (
      <div data-testid="users-loading" style={{ padding: '16px', textAlign: 'center' }}>
        <span>Loading users...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={refetch}
      />
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div data-testid="users-empty" style={{ padding: '16px', color: '#6b7280' }}>
        No posts found.
      </div>
    );
  }

  return (
    <ul data-testid="users-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {posts.map((post: Post) => (
        <li
          key={post.id}
          data-testid="user-item"
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <span style={{ fontWeight: 600 }}>{post.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;