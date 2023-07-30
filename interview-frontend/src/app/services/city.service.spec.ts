import { TestBed } from '@angular/core/testing';

import { CityService } from './city.service';
import { Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiResponseModel } from '../entities/api-response.model';
import { GetCityDto } from '../entities/get-city.dto';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

describe('CityService', () => {
  let service: CityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CityService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCities function should return an object with type of Observable<ApiResponseModel<GetCityDto[]>>', () => {
    const apiResponse = service.getCities();
    expect(apiResponse).toBeInstanceOf(Observable<ApiResponseModel<GetCityDto[]>>);
  });

  it('getCities function should return the correct data and should send a request to the correct end point with correct request method', () => {
    const dummyCities = [
        { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
        { uuid: "4a7f5c2d-3a10-4a02-a9b3-450839929e43", cityName: "Hamburg", count: 267, pageNumber: 1 },
    ];

    service.getCities().subscribe((cities) => {
      expect(cities.data).toEqual(dummyCities); 
      req.flush(dummyCities);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/cities`);
    expect(req.request.method).toBe('GET');
    
  });

  it('getCitiesBySearchText function should return the correct data and should send a request to the correct end point with correct request method', () => {
    const dummyCities = [
      { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
      { uuid: "f6b6b4e1-d185-47b5-8c94-61502a4e341a", cityName: "Bremen", count: 656, pageNumber: 1 },
      { uuid: "4f53e06f-3ad4-4bc9-a4b7-69368e763ab9", cityName: "Bochum", count: 366, pageNumber: 1 },
      { uuid: "6f4b5b62-0780-45b3-a522-d70e11d3b3c6", cityName: "Bielefeld", count: 888, pageNumber: 1 },
      { uuid: "7f1865a1-0f63-4f0a-b982-173d63617395", cityName: "Bonn", count: 753, pageNumber: 1 },
      { uuid: "7a994933-a111-49d6-892c-472219138b62", cityName: "Braunschweig", count: 54, pageNumber: 2 },
      { uuid: "82215c81-e0e9-43e0-a5e2-56d2c3d47ad6", cityName: "Bottrop", count: 877, pageNumber: 2 },
      { uuid: "80364cf4-bb6a-4d82-945f-b1f6a0efbd7c", cityName: "Bremerhaven", count: 289, pageNumber: 2 },
      { uuid: "a1337e39-525c-4b5b-8e05-5a57f00d983c", cityName: "Bergisch Gladbach", count: 685, pageNumber: 2 },
      { uuid: "8c4e60f1-2fe4-4d48-b2b1-495e0c515ed6", cityName: "Bamberg", count: 248, pageNumber: 2 },
    ];

    service.getCitiesBySearchText('b').subscribe((cities) => {
      expect(cities.data).toEqual(dummyCities); 
      req.flush(dummyCities);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/cities/b`);
    expect(req.request.method).toBe('GET');
    
  });

  it('getCitiesBySearchText function should return an object with type of Observable<ApiResponseModel<GetCityDto[]>>', () => {
    const apiResponse = service.getCitiesBySearchText('a');
    expect(apiResponse).toBeInstanceOf(Observable<ApiResponseModel<GetCityDto[]>>);
  });


  
});
