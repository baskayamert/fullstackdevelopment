import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CityService } from '../services/city.service';
import { GetCityDto } from '../entities/get-city.dto';
import { ApiResponseModel } from '../entities/api-response.model';

@Injectable()
export class PageNumberParameterGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private cityService: CityService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const pageNumParam = +route.params['pageNumber'];

    return this.cityService.getCities().pipe(
      switchMap((res : ApiResponseModel<GetCityDto[]>) => {

        const isValid = this.areParametersValid(pageNumParam , res);

        if (isValid) {
          return of(true); // Allow navigation to the requested route if parameters are valid
        } else {
          this.router.navigate(['/cities/1']); // Redirect to a different route for invalid parameters
          return of(false);
        }
      }),
      catchError(() => {
        // Handle API errors here (optional)
        // For example, you can redirect to an error page if the API call fails
        this.router.navigate(['/error']);
        return of(false);
      })
    );
  }

  private areParametersValid(pageNumParam: any, res: ApiResponseModel<GetCityDto[]>): boolean {
    let cities = res.data;
    let maxPageValue = 0;
    for (let city of cities) {
      if (city.pageNumber > maxPageValue) {
        maxPageValue = city.pageNumber;
      }
    }
    if(pageNumParam > maxPageValue) return false
    if(pageNumParam < 1) return false;
    if(Number.isNaN(pageNumParam)) return false;
    return true;
  }
}
