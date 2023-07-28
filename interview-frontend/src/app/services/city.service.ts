import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ApiResponseModel } from '../entities/api-response.model';
import { GetCityDto } from '../entities/get-city.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCities() : Observable<ApiResponseModel<GetCityDto[]>> {
    const url = `${this.apiUrl}/cities`;
    return this.http.get<ApiResponseModel<GetCityDto[]>>(url);
  }

  getCitiesBySearchText(searchText:string) : Observable<ApiResponseModel<GetCityDto[]>> {
    const url = `${this.apiUrl}/cities/${searchText}`;
    return this.http.get<ApiResponseModel<GetCityDto[]>>(url);
  }
}
