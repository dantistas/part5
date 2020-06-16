import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor'
  }

  const component = render(
    <Blog blog={blog} />
  )


const title = component.container.querySelector('.title-class')    

  const author = component.container.querySelector('.author-class')   

  expect(title).toBeDefined()
  expect(author).toBeDefined()
})


test('clicking the button renders likes and url', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'www.test.test',
        likes: 0
      }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} view={mockHandler} />
    )
  
    const button = component.getByText('view')
    fireEvent.click(button)
    const urlAndLikes = component.container.querySelector('.after-view-click-class')    
    expect(urlAndLikes).not.toHaveStyle('display: none')

  })
