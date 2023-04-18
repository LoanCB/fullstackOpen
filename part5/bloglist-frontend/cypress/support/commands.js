Cypress.Commands.add('login', ({username, password}) => {
  cy.get('#username_input').type('root')
  cy.get('#password_input').type('secret')
  cy.get('#login_btn').click()
})

Cypress.Commands.add('createTestBlog', () => {
  cy.request('POST', 'http://localhost:3003/api/users', {username: 'test', name: 'test user', password: 'secret'})
  cy.request('POST', 'http://localhost:3003/api/login', {username: 'test', password: 'secret'})
    .then(({ body }) => {
      const token = body.token
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {title: 'test from command', author: 'cypress.commands', url: 'foo'},
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    })
  cy.visit('http://localhost:3000')
})