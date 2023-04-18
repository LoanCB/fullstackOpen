Cypress.Commands.add('login', ({username, password}) => {
  cy.get('#username_input').type('root')
  cy.get('#password_input').type('secret')
  cy.get('#login_btn').click()
})

const addBlog = (token, title = 'test from command', likes = 0) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {title: title, author: 'cypress.commands', url: 'foo', likes: likes},
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => console.log(response.body))
}

Cypress.Commands.add('createTestBlog', () => {
  cy.request('POST', 'http://localhost:3003/api/users', {username: 'test', name: 'test user', password: 'secret'})
  cy.request('POST', 'http://localhost:3003/api/login', {username: 'test', password: 'secret'})
    .then(({ body }) => {
      const token = body.token
      addBlog(token)
    })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createTwoBlogs', () => {
  cy.request('POST', 'http://localhost:3003/api/users', {username: 'test', name: 'test user', password: 'secret'})
  cy.request('POST', 'http://localhost:3003/api/login', {username: 'test', password: 'secret'})
    .then(({ body }) => {
      const token = body.token
      addBlog(token, 'less likes', 1)
      addBlog(token, 'most likes', 5)
      cy.visit('http://localhost:3000')
    })
})