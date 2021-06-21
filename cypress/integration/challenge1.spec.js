describe('Challenge 1', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('can search for "customer"', () => {
        cy.get('#hero_search').type('customer{enter}');
        // validate URL
        cy.location('pathname').should('contain', '/search');
        // validate search title
        cy.get('#kb-search-title').invoke('text').then(($text) => {
            expect($text).to.contain('results for "customer"');
        });
        // validate all search results contain the string "custom"
        cy.get('.search-results').within(() => {
            cy.get('.search-page-result').then(($results) => {
                for(let i=0; i < $results.length; i++){
                    cy.get('.search-page-result').eq(i).contains('custom', {matchCase: false});
                }
            });
        });
    });

    it('can log in', () => {
        cy.get('#login').click();
        cy.get('#login-form').within(() => {
            // uses environment variables from cypress.json file
            cy.get('input[name="email"]').type(Cypress.env('username'));
            cy.get('input[name="password"]').type(Cypress.env('password'));
            cy.contains('Log In').click();
        });
        // verify logout button is now visible
        cy.get('#logout');
    });
});
