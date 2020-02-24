describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/users',{username:'user1',name:'Roosa',password:'superstrong'})
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000/api/blogs')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('user1')
      cy.get('#password').type('superstrong')
      cy.get('#login-button').click()

      cy.contains('Roosa logged in')

    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Incorrect credentials')

    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('superstrong')
      cy.get('#login-button').click()    
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('Super Writer')
      cy.get('#title').type('Important Title')
      cy.get('#url').type('www.url.com')
      cy.contains('save').click()
      cy.contains('Important Title')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('Super Writer')
      cy.get('#title').type('Important Title')
      cy.get('#url').type('www.url.com')
      cy.contains('save').click()
      cy.contains('Important Title')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })
  })
})