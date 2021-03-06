describe('My Frist Test', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8000')
	})

	it('Check that the navbar renders', () => {
		let items = cy.get('.navbar-list').children()
		items.should('have.length', 7)
		items.first().should('have.class', 'ListItem').and('have.text', 'HOME').next().should('have.class', 'navbar-divider').and('have.text', '|').next().should('have.class', 'ListItem').and('have.text', 'ABOUT')
	})

	it('Checks that two blogs posts are rendered on the main screen', () => {
		let items = cy.get('.index-post-link')
		items.should('have.length', 2)
		cy.get(':nth-child(2) > .index-post-link > .indexpost-title').contains('Polybar Configuration')
		cy.get(':nth-child(3) > .index-post-link > .indexpost-title').contains('Installing and Ricing Arcolinux')
	})


	it('Checks that the breadcrumbs render correctly', () => {
		cy.get('.my-link').should('have.length', 5)
		const first = cy.get('[href="https://github.com/ksyasuda"] > .MuiButtonBase-root > .MuiButton-label')
		cy.get('.my-link').each(item => {
			const {clientWidth, clientHeight} = item[0]
			if(clientWidth > 200 || clientHeight > 50) {
				throw new Error('Buttons too big')
			}
		})
	})

	it('Checks that the blog button sends to the blog page', () => {
		cy.get(':nth-child(5) > a > .MuiButtonBase-root > .MuiButton-label').click()
		cy.url().should('eq', 'http://localhost:8000/blog/')
		const posts = cy.get('.postContainer')
		posts.should('have.length', 6)
	})

	it('Checks that the search bar on the travel page works', () => {
		cy.get(':nth-child(7) > a > .MuiButtonBase-root > .MuiButton-label').click()
		cy.get('#searchbox').type('ann arbor')
		cy.get('#travel-searchbutton').click()
		cy.get('#lat').should('contain', 42.28)
		cy.get('#lng').should('contain', -83.74)
	})
})
