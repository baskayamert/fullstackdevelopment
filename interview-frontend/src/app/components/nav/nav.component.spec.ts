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

  it("Title should be correct", () => {
    expect(component.navbarHomeText).toEqual(HOME_TEXT);
  })

  it("Navbar should have the correct title in HTML", () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('.navbar-brand').textContent).toContain(HOME_TEXT)
  })
});
