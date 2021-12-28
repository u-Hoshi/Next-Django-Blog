/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import PostDetail from '../pages/posts/[id]'
import { POST } from '../types/types'

describe('postDetail test case', () => {
  const dummyProps: POST = {
    id: 1,
    title: 'title1',
    content: 'content1',
    username: 'username1',
    tags: [
      { id: 1, name: 'tag1' },
      { id: 2, name: 'tag2' },
    ],
    created_at: '2021-01-12 14:59:41',
  }
  it('should render correctly with props value', () => {
    render(<PostDetail {...dummyProps} />)
    expect(screen.getByText(dummyProps.title)).toBeInTheDocument()
    expect(screen.getByText(dummyProps.content)).toBeInTheDocument()
    expect(screen.getByText(`by ${dummyProps.username}`)).toBeInTheDocument()
    expect(screen.getByText(dummyProps.tags[0].name)).toBeInTheDocument()
    expect(screen.getByText(dummyProps.tags[1].name)).toBeInTheDocument()
    expect(screen.getByText(dummyProps.created_at)).toBeInTheDocument()
  })
})
