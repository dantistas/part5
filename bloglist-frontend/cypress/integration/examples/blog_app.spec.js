describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Test user',
        username: 'test',
        password: 'test'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.get('#login-form').contains('login')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#login-button').click()
        
            cy.contains('Logged in as Test user')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            cy.contains('wrong username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
      })




  })


  