import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetCityDto } from 'src/app/entities/get-city.dto';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-pagination',
  templateUrl: './city-pagination.component.html',
  styleUrls: ['./city-pagination.component.scss']
})
export class CityPaginationComponent {
  @Input() getPageNumbers: () => number[] = () => {return []};
  @Input() cities: GetCityDto[] = [];
  @Input() currentSearchText: string = "";
  @Input() currentPageNumber: number = 1;
  @Input() maxPageValue: number = 0;

}
