import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { FOOTER_TEXT } from 'src/app/common/constants/app.constants';

describe('FooterComponent', () => {
  describe('FooterComponent HTML', () => {
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

    it("should have the correct footer text", () => {
      const data = fixture.nativeElement;
      expect(data.querySelector('.footerText').textContent).toContain(FOOTER_TEXT)
    });

  });

  describe('FooterComponent TypeScript', () => {
    let component: FooterComponent;
    beforeEach(() => {
      component = new FooterComponent();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("should have the correct Footer Text", () => {
      expect(component.footerText).toEqual(FOOTER_TEXT);
    });

  });

});
