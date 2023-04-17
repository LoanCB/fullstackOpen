describe('Blog app', function() {
  beforeEach(function() {
    cy.visit({url: '', failOnStatusCode: false})
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', {username: 'root', password: 'secret', name: 'admin admin'})
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username_input').type('root')
      cy.get('#password_input').type('secret')
      cy.get('#login_btn').click()

      cy.get('html').should('contain', 'admin admin logged in')
    })

    it('wrong credentials', function() {
      cy.get('#username_input').type('root')
      cy.get('#password_input').type('foo')
      cy.get('#login_btn').click()

      cy.get('.error-message').should('contain', 'Wrong username or password')
      cy.get('html').should('not.contain', 'admin admin logged in')
    })
  })
})