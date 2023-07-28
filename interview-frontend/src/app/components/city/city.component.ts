import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GREETING_TEXT, SEARCHBAR_TEXT, SEARCH_BUTTON_TEXT } from 'src/app/common/constants/app.constants';
import { COL_1_TEXT, COL_2_TEXT, COL_3_TEXT, COL_4_TEXT } from 'src/app/common/constants/city-table.constants';
import { GetCityDto } from 'src/app/entities/get-city.dto';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  //Text Constants
  greetingText = GREETING_TEXT;
  searchBarText = SEARCHBAR_TEXT;
  searchButtonText = SEARCH_BUTTON_TEXT;
  col1Text = COL_1_TEXT;
  col2Text = COL_2_TEXT;
  col3Text = COL_3_TEXT;
  col4Text = COL_4_TEXT;

  //Component Variables
  cities: GetCityDto[] = [];
  citiesByPageNumber: GetCityDto[] = [];
  currentPageNumber: any = {};
  maxPageValue : number = 0;
  currentSearchText: string = "";

  constructor(private cityService: CityService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.currentSearchText = this.route.snapshot.params["searchText"];
    if(this.currentSearchText !== null && this.currentSearchText !== undefined){
      this.getCitiesBySearchText(this.currentSearchText);
    } else {
      this.getCities();
    }
  }

  getCities(): void {  
    this.cityService.getCities().subscribe({
      next: (res) => {
        this.cities = res.data;

        this.getCitiesByPageNumber();

      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('done');
      }
    });
  }

  getCitiesByPageNumber(): void {
    this.route.paramMap.subscribe(params => {
      this.currentPageNumber = params.get('pageNumber') ?? 1;
      this.currentPageNumber = +this.currentPageNumber;
      this.citiesByPageNumber = this.cities.filter(x => x.pageNumber === this.currentPageNumber);
    });
    
  }

  calculateTotalPage(): number {
    this.maxPageValue = 0;
    for (let city of this.cities) {
      if (city.pageNumber > this.maxPageValue) {
        this.maxPageValue = city.pageNumber;
      }
    }
    return this.maxPageValue;
  }

  getPageNumbers(): number[]{
    const pageNumbers = [];
    const range = 3;
    const startPage = Math.max(1, this.currentPageNumber - range);
    const endPage = Math.min(this.currentPageNumber + range, this.calculateTotalPage());

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }
  navigateToSearchText(searchText:string){
    this.currentSearchText = searchText;
    this.router.navigate([`/cities/searchResult/${searchText}`])
    this.getCitiesBySearchText(searchText);
  }
  getCitiesBySearchText(searchText:string){
    this.cityService.getCitiesBySearchText(searchText).subscribe({
      next: (res) => {
        this.cities = res.data;

        this.getCitiesByPageNumber();

      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('done');
      }
    });
  }
}
