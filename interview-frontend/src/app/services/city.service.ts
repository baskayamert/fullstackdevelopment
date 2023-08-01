import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getCities(searchText?: string, pageNumber?: string) : Observable<ApiResponseModel<GetCityDto[]>> {
    let queryParams = new HttpParams();

    queryParams = queryParams.append('searchText', searchText ?? "");

    queryParams = queryParams.append('pageNumber', pageNumber ?? "");
    

    const url = `${this.apiUrl}/cities`;
    return this.http.get<ApiResponseModel<GetCityDto[]>>(url, {params: queryParams});
  }
}
