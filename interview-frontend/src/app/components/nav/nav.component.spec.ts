import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { HOME_TEXT } from 'src/app/common/constants/app.constants';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent]
    });
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have the correct navbarHomeText in the TypeScript file", () => {
    expect(component.navbarHomeText).toEqual(HOME_TEXT);
  })

  it("should have the correct navbarHomeText in the HTML file", () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('.navbar-home-text').textContent).toContain(HOME_TEXT)
  })
});
