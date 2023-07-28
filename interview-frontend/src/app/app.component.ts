import { Component } from '@angular/core';
import { APPLICATION_TITLE, FOOTER_TEXT } from './common/constants/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  applicationTitle = APPLICATION_TITLE;
  footerText = FOOTER_TEXT;
}
