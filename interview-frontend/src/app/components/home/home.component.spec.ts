import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HOMEPAGE_CLICK_TEXT, HOMEPAGE_SURPRISE_TEXT, HOMEPAGE_WELCOME_TEXT } from 'src/app/common/constants/app.constants';

describe('HomeComponent', () => {
  describe('HomeComponent HTML', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent]
      });
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it("should have the correct Home Page Surprise Text", () => {
      const data = fixture.nativeElement;
      expect(data.querySelector('.home-page-surprise-text').textContent).toContain(HOMEPAGE_SURPRISE_TEXT);
    });
  
    it("should have the correct Home Page Welcome Text", () => {
      const data = fixture.nativeElement;
      expect(data.querySelector('.home-page-welcome-text').textContent).toContain(HOMEPAGE_WELCOME_TEXT);
    });
  
    it("should have the correct Home Page Click Text", () => {
      const data = fixture.nativeElement;
      expect(data.querySelector('.home-page-click-text').textContent).toContain(HOMEPAGE_CLICK_TEXT);
    });
  
  });


  describe('HomeComponent TypeScript', () => {
    let component : HomeComponent;
    beforeEach(() => {
      component = new HomeComponent();
    });
  
    it("should create", () => {
      expect(component).toBeTruthy();
    })
  
    it("should have the correct Home Page Surprise Text", () => {
      expect(component.homePageSurpriseText).toEqual(HOMEPAGE_SURPRISE_TEXT);
    });
  
    it("should have the correct Home Page Welcome Text", () => {
      expect(component.homePageWelcomeText).toEqual(HOMEPAGE_WELCOME_TEXT);
    });
  
    it("should have the correct Home Page Click Text", () => {
      expect(component.homePageClickText).toEqual(HOMEPAGE_CLICK_TEXT);
    });
  
  });
})



