import { Component } from '@angular/core';
import { HOMEPAGE_CLICK_TEXT, HOMEPAGE_SURPRISE_TEXT, HOMEPAGE_WELCOME_TEXT } from 'src/app/common/constants/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  homePageSurpriseText = HOMEPAGE_SURPRISE_TEXT;
  homePageWelcomeText = HOMEPAGE_WELCOME_TEXT;
  homePageClickText = HOMEPAGE_CLICK_TEXT;
}
