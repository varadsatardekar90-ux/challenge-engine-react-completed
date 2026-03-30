import { useMemo } from 'react'
import { useGetPostsQuery } from '../api/apiSlice'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setSortBy, setFilterUserId, SortBy } from '../store/slices/filtersSlice'

export default function PostsWithFilters() {
  const dispatch = useAppDispatch()
  const { data: posts = [], isLoading, isError } = useGetPostsQuery()
  const { sortBy, filterUserId } = useAppSelector((state) => state.filters)

  const filteredSortedPosts = useMemo(() => {
    let result = [...posts]

    if (filterUserId !== null) {
      result = result.filter((p) => p.userId === filterUserId)
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') return b.id - a.id
      if (sortBy === 'oldest') return a.id - b.id
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      return 0
    })

    return result
  }, [posts, sortBy, filterUserId])

  if (isLoading) return <p>Loading posts…</p>
  if (isError) return <p>Failed to load posts.</p>

  return (
    <div data-testid="posts-with-filters">
      <div
        data-testid="filter-controls"
        style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
      >
        <label>
          Sort by:{' '}
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as SortBy))}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>

        <label>
          Filter by user:{' '}
          <select
            value={filterUserId ?? ''}
            onChange={(e) =>
              dispatch(
                setFilterUserId(e.target.value === '' ? null : Number(e.target.value))
              )
            }
          >
            <option value="">All users</option>
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul>
        {filteredSortedPosts.map((post) => (
          <li key={post.id} style={{ marginBottom: '0.75rem' }}>
            <strong>[User {post.userId}]</strong> {post.title}
          </li>
        ))}
      </ul>

      {filteredSortedPosts.length === 0 && <p>No posts match the current filter.</p>}
    </div>
  )
}