import { Component } from '@angular/core';
import { HOME_TEXT } from 'src/app/common/constants/app.constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  navbarHomeText = HOME_TEXT;
}
