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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'root', password: 'secret'})
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#blog_title_input').type('blog created by cypress')
      cy.get('#blog_author_input').type('Cypress author')
      cy.get('#blog_url_input').type('https://www.lawifi.fr/')
      cy.get('#create_blog_btn').click()
      cy.contains('blog created by cypress')
    })

    describe('1 blog created', function() {
      beforeEach(function() {
        cy.contains('new note').click()
        cy.get('#blog_title_input').type('blog created by cypress')
        cy.get('#blog_author_input').type('Cypress author')
        cy.get('#blog_url_input').type('https://www.lawifi.fr/')
        cy.get('#create_blog_btn').click()
        cy.contains('blog created by cypress')
      })

      it('user can like a blog', function() {
        cy.get('html').should('contain', 'likes 0')
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('creator of a blog can delete it', function() {
        cy.get('#blog_title_input').clear()
        cy.get('#blog_title_input').type('tested blog')
        cy.get('#create_blog_btn').click()

        cy.get('html').should('contain', 'blog created by cypress')
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.blog').should('not.contain', 'blog created by cypress')
      })
    })

    it('User cannot delete other blog', function() {
      cy.createTestBlog()
      cy.contains('view').click()
      cy.contains('test from command')
      cy.get('.blog').should('not.contain', 'remove')
    })
  })
})