import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor'
  }

  const component = render(
    <Blog blog={blog} />
  )


const title = component.getByText(
    'testTitle'
  )

  const author = component.getByText(
    'testAuthor'
  )

  expect(title).toBeDefined()
  expect(author).toBeDefined()
})