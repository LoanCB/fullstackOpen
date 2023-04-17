Cypress.Commands.add('login', ({username, password}) => {
  cy.get('#username_input').type('root')
  cy.get('#password_input').type('secret')
  cy.get('#login_btn').click()
})