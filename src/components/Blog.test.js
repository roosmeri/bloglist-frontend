import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This is a title',
    author: 'Very Good',
    url: 'www.osoite.com',
    likes: 11,
    user: 1
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


test('view shows all fields', () => {
  const blog = {
    title: 'This is a title',
    author: 'Very Good',
    url: 'www.osoite.com',
    likes: 11,
    user: 1
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

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'This is a title'
  )
  expect(component.container).toHaveTextContent(
    'Very Good'
  )
  expect(component.container).toHaveTextContent(
    'www.osoite.com'
  )
  expect(component.container).toHaveTextContent(
    '11'
  )
})


test('two likes cause two calls', () => {
  const blog = {
    title: 'This is a title',
    author: 'Very Good',
    url: 'www.osoite.com',
    likes: 11,
    user: 1
  }

  const user = {
    username: 'user0',
    name: 'Name McNamey',
    id: '5'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog user={user} blog={blog} likeBlog={mockHandler} deleteBlog={mockHandler}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  

  expect(mockHandler.mock.calls.length).toBe(2)
})