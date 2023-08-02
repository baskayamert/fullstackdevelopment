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
  describe('getCities', () => {
    it('should return an object with type of Observable<ApiResponseModel<GetCityDto[]>>', () => {
        let apiResponse = service.getCities();
        expect(apiResponse).toBeInstanceOf(Observable<ApiResponseModel<GetCityDto[]>>);

        apiResponse = service.getCities("s");
        expect(apiResponse).toBeInstanceOf(Observable<ApiResponseModel<GetCityDto[]>>);

        apiResponse = service.getCities("s", '3');
        expect(apiResponse).toBeInstanceOf(Observable<ApiResponseModel<GetCityDto[]>>);

        apiResponse = service.getCities('', '3');
        expect(apiResponse).toBeInstanceOf(Observable<ApiResponseModel<GetCityDto[]>>);

        apiResponse = service.getCities('', '');
        expect(apiResponse).toBeInstanceOf(Observable<ApiResponseModel<GetCityDto[]>>);

        apiResponse = service.getCities(undefined, '1');
        expect(apiResponse).toBeInstanceOf(Observable<ApiResponseModel<GetCityDto[]>>);

        apiResponse = service.getCities(undefined, undefined);
        expect(apiResponse).toBeInstanceOf(Observable<ApiResponseModel<GetCityDto[]>>);

      });

    it('should return the correct data and should send a request to the correct end point with correct request method', () => {
        const dummyCities = [
            { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
            { uuid: "4a7f5c2d-3a10-4a02-a9b3-450839929e43", cityName: "Hamburg", count: 267, pageNumber: 1 },
        ];
        service.getCities().subscribe((cities) => {
            expect(cities.data).toEqual(dummyCities); 
            req.flush(dummyCities);
        });
        
        let req = httpMock.expectOne(`${environment.apiUrl}/cities?searchText=&pageNumber=`);
        expect(req.request.method).toBe('GET');

        service.getCities("b").subscribe((cities) => {
            expect(cities.data).toEqual(dummyCities); 
            req.flush(dummyCities);
        });
        
        req = httpMock.expectOne(`${environment.apiUrl}/cities?searchText=b&pageNumber=`);
        expect(req.request.method).toBe('GET');

        service.getCities("b", "1").subscribe((cities) => {
            expect(cities.data).toEqual(dummyCities); 
            req.flush(dummyCities);
        });
        
        req = httpMock.expectOne(`${environment.apiUrl}/cities?searchText=b&pageNumber=1`);
        expect(req.request.method).toBe('GET');

        service.getCities(undefined, "3").subscribe((cities) => {
            expect(cities.data).toEqual(dummyCities); 
            req.flush(dummyCities);
        });
        
        req = httpMock.expectOne(`${environment.apiUrl}/cities?searchText=&pageNumber=3`);
        expect(req.request.method).toBe('GET');
        
    });
  })
 
});
