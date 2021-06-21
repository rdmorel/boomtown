describe('Challenge 2', () => {

    function getApi($query) {
        // function to hit API with optional query
        return new Cypress.Promise((resolve, reject) => {
            // hits base API URL if no query specefied
            let $url = Cypress.env('apiUrl');
            // appends query if specefied
            if ($query) {
                $url = Cypress.env('apiUrl') + $query;
            }
            cy.request({
                method: 'GET',
                url: $url,
                headers: Cypress.env('headers')
            }).then(($response) => {
                // returns API response
                resolve($response);
            });
        });
    }

    function getNumResults($response) {
        // function to count the number of results
        // in the body of the API response
        let $numResults = $response.body.results.length;
        return $numResults
    }

    it('can access Boomtown API and filter by keywords', () => {
        // get all results
        getApi().then(($response) => {
            // saving number of results
            let $allResults = getNumResults($response);
            // make search query
            let $searchQuery = '?query=test'
            getApi($searchQuery).then(($response) => {
                // compare number of results
                let $searchResults = getNumResults($response);
                expect($searchResults).to.be.lessThan($allResults);
            });
        });

    });

    it('can paginate results from API', () => {
        // paginate results into pages of 10, get first page of results
        let $pageQuery = '?start=0&limit=10'
        getApi($pageQuery).then(($response) => {
            // check that there are 10 results in the page
            let $paginatedResults = getNumResults($response)
            expect($paginatedResults).to.equal(10);
            // fails here, appears to be paginating with
            // incorrect number of results per page
        });
        // paginate results into pages of 5, get second page or results
        let $pageQuery2 = '?start=1&limit=5'
        getApi($pageQuery2).then(($response) => {
            // check that there are 5 results in the second page
            $paginatedResults = getNumResults($response)
            expect($paginatedResults).to.equal(10);
        });
    });

    it('consistently returns the same number of results', () => {
        // initial request
        getApi().then(($response) => {
            // saving number of results
            let $allResults = getNumResults($response);
            // make same request 10 more times
            for(let i=0; i < 10; i++){
                getApi().then(($response) => {
                    // saving number of results
                    let $newResults = getNumResults($response);
                    // check that API returns the same number of results
                    expect($newResults).to.equal($allResults);
                    // fails here - API returns either 40 or 41 results
                });
            }
        });
    });
});