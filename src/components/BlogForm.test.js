import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('two likes cause two calls', () => {
  const blog = {
    title: 'This is a title',
    author: 'Very Good',
    url: 'www.osoite.com',
    likes: 11,
    user: 1
  }

  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler} toggleVisibility={() => console.log('toggle')} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  fireEvent.change(author, {target:{value: 'Name'}})
  fireEvent.change(title, {target:{value: 'Title'}})
  fireEvent.change(url, {target:{value: 'www.url.com'}})
  const submit = component.container.querySelector('#submit')
  fireEvent.click(submit)

  expect(mockHandler.mock.calls[0][0]).toEqual({
    author: 'Name',
    title: 'Title',
    url: 'www.url.com'
  })
})