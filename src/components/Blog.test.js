import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This is a title',
    author: 'Very Good',
    url: 'www.osoite.com',
    likes: 11
  }

  const user = {
    username: 'user0',
    name: 'Name McNamey',
    id: '5'
  }

  const likeBlog = () => {
    console.log('liked')
  }
  const deleteBlog = () => {
    console.log('deleted')
  }

  const component = render(
    <Blog user={user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
  )

  expect(component.container).toHaveTextContent(
    'This is a title'
  )
  expect(component.container).toHaveTextContent(
    'Very Good'
  )
  expect(component.container).not.toHaveTextContent(
    'www.osoite.com'
  )
  expect(component.container).not.toHaveTextContent(
    '11'
  )
})