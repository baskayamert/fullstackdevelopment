import { Component } from '@angular/core';
import { APPLICATION_TITLE } from 'src/app/common/constants/app.constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  applicationTitle = APPLICATION_TITLE;
}
