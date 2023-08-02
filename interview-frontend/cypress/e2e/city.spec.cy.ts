import { FOOTER_TEXT, GREETING_TEXT, HOME_TEXT, SEARCHBAR_TEXT, SEARCH_BUTTON_TEXT } from "cypress/fixtures/app.constants";
import { COL_1_TEXT, COL_2_TEXT, COL_3_TEXT, COL_4_TEXT } from "cypress/fixtures/city-table.constants";

describe("Cities Page", () => {
    beforeEach(() => {
        cy.visit('/cities?pageNumber=1');
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

    it("should have cities correctly", () => {
        const citiesFilteredByPage = [
            { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
            { uuid: "4a7f5c2d-3a10-4a02-a9b3-450839929e43", cityName: "Hamburg", count: 267, pageNumber: 1 },
            { uuid: "09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99", cityName: "München", count: 899, pageNumber: 1 },
            { uuid: "0a40416f-aa4c-4b8b-8ce3-e82e664a4cd1", cityName: "Köln", count: 471, pageNumber: 1 },
            { uuid: "e1ad9f95-44b5-4d80-8b26-df42a53fcfb6", cityName: "Frankfurt", count: 110, pageNumber: 1 },
        ];

        cy.get('table tbody tr').should('have.length', citiesFilteredByPage.length);

        citiesFilteredByPage.forEach((city, index) => {
            cy.get(`table tbody tr:eq(${index})`)
              .should('contain.text', `${index + 1}`)
              .and('contain.text', city.uuid)
              .and('contain.text', city.cityName)
              .and('contain.text', city.count);
          });
    });

    it('should redirect inappropriate urls', () => {
        cy.visit("/cities?pageNumber=10000");
        cy.url().should('include', "/cities?pageNumber=1");

        cy.visit("/cities?pageNumber=asd");
        cy.url().should('include', "/cities?pageNumber=1");

        cy.visit("/cities?searchText=&pageNumber=1");
        cy.url().should('include', "/cities?searchText=&pageNumber=1");

        cy.visit("/cities?searchText=s&pageNumber=s");
        cy.url().should('include', "/cities?searchText=s&pageNumber=1");
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
            cy.visit('/cities?pageNumber=1');
        })
        it('should search and navigate to the correct URL', () => {
          const searchText = 's'; 
      
          cy.get('.search input.form-control').type(searchText).should('have.value', searchText);
      
          cy.get('button.search-button').click();
      
          cy.url().should('include', `cities?searchText=${searchText}&pageNumber=1`);
      
        });

    });

})