import { FOOTER_TEXT, HOMEPAGE_CLICK_TEXT, HOMEPAGE_SURPRISE_TEXT, HOMEPAGE_WELCOME_TEXT, HOME_TEXT } from "cypress/fixtures/app.constants";

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');

  });

  it('should have all the texts correctly', () => {

    cy.get(".navbar-home-text").should((element) => {
      const text = element.text();
      expect(text).to.eq(HOME_TEXT);
    });

    cy.get(".home-page-welcome-text").should((element) => {
      const text = element.text();
      expect(text).to.eq(HOMEPAGE_WELCOME_TEXT);
    });

    cy.get(".home-page-surprise-text").should((element) => {
      const text = element.text();
      expect(text).to.eq(HOMEPAGE_SURPRISE_TEXT);
    });

    cy.get(".home-page-click-text").should((element) => {
      const text = element.text();
      expect(text).to.eq(HOMEPAGE_CLICK_TEXT);
    });

    cy.get(".footer-text").should((element) => {
      const text = element.text();
      expect(text).to.eq('© ' + FOOTER_TEXT);
    });

  })

  it('should go to "cities?pageNumber=1" if "Click to view them is" is clicked', () => {
    
    cy.get(".home-page-click-text").click();
    cy.url().should('includes', '/cities?pageNumber=1')

  })

  it('should go to "/" if "Home" in the Navbar is clicked', () => {
    
    cy.get(".navbar-home-text").click();
    cy.url().should('includes', '/')
    cy.url().should((element) => {
      expect(element).not.to.include("cities")
  })
    

  })
});
