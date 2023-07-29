import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { FOOTER_TEXT } from 'src/app/common/constants/app.constants';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Footer text should be correct", () => {
    expect(component.footerText).toEqual(FOOTER_TEXT);
  });

  it("Footer should have the correct footer text in HTML", () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('.footerText').textContent).toContain(FOOTER_TEXT)
  });
});
