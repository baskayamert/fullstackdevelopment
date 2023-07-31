import { FOOTER_TEXT, GREETING_TEXT, HOME_TEXT, SEARCHBAR_TEXT, SEARCH_BUTTON_TEXT } from "cypress/fixtures/app.constants";
import { COL_1_TEXT, COL_2_TEXT, COL_3_TEXT, COL_4_TEXT } from "cypress/fixtures/city-table.constants";

describe("Cities Page", () => {
    beforeEach(() => {
        cy.visit('/cities/1');
    });

    it("should have all the texts correctly", () => {
        cy.get(".navbar-home-text").should((element) => {
            const text = element.text();
            expect(text).to.eq(HOME_TEXT);
        });

        cy.get(".greeting-text").should((element) => {
            const text = element.text();
            expect(text).to.eq(GREETING_TEXT);
        });

        cy.get('.search input[type="text"]').should('have.attr', 'placeholder').then((placeholderText) => {
            expect(placeholderText).to.eq(SEARCHBAR_TEXT);
        });

        cy.get('.search-button').should((element) => {
            const text = element.text();
            expect(text).to.eq(SEARCH_BUTTON_TEXT);
        });

        cy.get('.col-1-text').should((element) => {
            const text = element.text();
            expect(text).to.eq(COL_1_TEXT);
        });

        cy.get('.col-2-text').should((element) => {
            const text = element.text();
            expect(text).to.eq(COL_2_TEXT);
        });

        cy.get('.col-3-text').should((element) => {
            const text = element.text();
            expect(text).to.eq(COL_3_TEXT);
        });

        cy.get('.col-4-text').should((element) => {
            const text = element.text();
            expect(text).to.eq(COL_4_TEXT);
        });

        cy.get(".footer-text").should((element) => {
            const text = element.text();
            expect(text).to.eq('© ' + FOOTER_TEXT);
        });

        
    });

    it('should redirect inappropriate urls', () => {
        cy.visit("/cities/10000");
        cy.url().should('include', "/cities/1");

        cy.visit("/cities/asd");
        cy.url().should('include', "/cities/1");

        cy.visit("/cities/searchResult//1");
        cy.url().should('include', "/cities/1");

        cy.visit("/cities/searchResult/s/s");
        cy.url().should('include', "/cities/searchResult/s/1");
    })

    describe("Pagination", () => {

        it('should click on page numbers and go to the correct urls', () => {

            cy.get('a.page-link.clickablePageNumber').then((pageLinks) => {
                pageLinks.get(0).click();
                let href = pageLinks.get(0).getAttribute('href');
                cy.url().should('include', href);
            
            });

            cy.get('a.page-link.clickablePageNumber').then((pageLinks) => {
                pageLinks.get(2).click();
                let href = pageLinks.get(2).getAttribute('href');
                cy.url().should('include', href);
            });

            cy.get('a.page-link.clickablePageNumber').then((pageLinks) => {
                pageLinks.get(3).click();
                let href = pageLinks.get(3).getAttribute('href');
                cy.url().should('include', href);
            });

            cy.get('a.page-link.clickablePageNumber').then((pageLinks) => {
                pageLinks.get(4).click();
                let href = pageLinks.get(4).getAttribute('href');
                cy.url().should('include', href);
            });
        });

        it('should click on the arrows and go to the correct urls', () => {

            cy.get('a.page-link.clickablePageNumber').then((pageLinks) => {
                pageLinks.get(pageLinks.length - 1).click();
                let href = pageLinks.get(pageLinks.length - 1).getAttribute('href');
                cy.url().should('include', href);
            
            });

            cy.get('a.page-link.clickablePageNumber').then((pageLinks) => {
                pageLinks.get(pageLinks.length - 1).click();
                let href = pageLinks.get(pageLinks.length - 1).getAttribute('href');
                cy.url().should('include', href);
            
            });

            cy.get('a.page-link.clickablePageNumber').then((pageLinks) => {
                pageLinks.get(0).click();
                let href = pageLinks.get(0).getAttribute('href');
                cy.url().should('include', href);
            
            });

        
        });

    });

    describe('Search', () => {
        beforeEach(() => {
            cy.visit('/cities/1');
        })
        it('should search and navigate to the correct URL', () => {
          const searchText = 's'; 
      
          cy.get('.search input.form-control').type(searchText).should('have.value', searchText);
      
          cy.get('button.search-button').click();
      
          cy.url().should('include', `cities/searchResult/${searchText}`);
      
        });

    });

})