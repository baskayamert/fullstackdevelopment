import { Component } from '@angular/core';
import { FOOTER_TEXT } from 'src/app/common/constants/app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  footerText = FOOTER_TEXT;
}
