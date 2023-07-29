import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HOMEPAGE_CLICK_TEXT, HOMEPAGE_SURPRISE_TEXT, HOMEPAGE_WELCOME_TEXT } from 'src/app/common/constants/app.constants';

describe('HomeComponent', () => {
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

  it("Home Page Surprise Text should be correct", () => {
    expect(component.homePageSurpriseText).toEqual(HOMEPAGE_SURPRISE_TEXT);
  });

  it("Home Page Welcome Text should be correct", () => {
    expect(component.homePageWelcomeText).toEqual(HOMEPAGE_WELCOME_TEXT);
  });

  it("Home Page Click Text should be correct", () => {
    expect(component.homePageClickText).toEqual(HOMEPAGE_CLICK_TEXT);
  });

  it("Home Component should have the correct Home Page Surprise Text in HTML", () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('.homePageSurpriseText').textContent).toContain(HOMEPAGE_SURPRISE_TEXT);
  });

  it("Home Component should have the correct Home Page Welcome Text in HTML", () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('.homePageWelcomeText').textContent).toContain(HOMEPAGE_WELCOME_TEXT);
  });

  it("Home Component should have the correct Home Page Click Text in HTML", () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('.homePageClickText').textContent).toContain(HOMEPAGE_CLICK_TEXT);
  });

});
