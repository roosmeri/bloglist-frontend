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
})