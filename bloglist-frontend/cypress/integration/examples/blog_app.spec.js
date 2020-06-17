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
        
            
            cy.get('.error').should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
      })

     describe.only('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#login-button').click()    
        })
    
        it('A blog can be created', function() {
            cy.get('#reveal-blog-form').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#create-blog-button').click()
            cy.get('#blog').contains('test title')

        })
      })  



  })


  