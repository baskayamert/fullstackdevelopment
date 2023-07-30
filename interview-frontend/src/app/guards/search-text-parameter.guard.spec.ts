import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SearchTextParameterGuard } from "./search-text-parameter.guard";
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CityService } from "../services/city.service";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { CityComponent } from "../components/city/city.component";
import { ApiResponseModel } from "../entities/api-response.model";
import { GetCityDto } from "../entities/get-city.dto";

const mockCitiesDtoForSearchText: ApiResponseModel<GetCityDto[]> = {
    data: [
      { uuid: "66b8009b-319d-4272-92ea-853a10c27c9a", cityName: "Stuttgart", count: 782, pageNumber: 1 },
      { uuid: "c24e60fc-e00d-49e2-99db-7e2d79d007f7", cityName: "Saarbrücken", count: 109, pageNumber: 1 },
      { uuid: "8c79d8db-7e5e-416a-8711-d3fcfdf87332", cityName: "Solingen", count: 852, pageNumber: 1 },
      { uuid: "6d6df5ef-72f8-4f72-994b-9d8401c4892a", cityName: "Siegen", count: 185, pageNumber: 1 },
      { uuid: "8b5b650e-9c31-4216-87de-dab75cfe8356", cityName: "Salzgitter", count: 80, pageNumber: 1 },
    ],
    message: 'Success'
}

describe('SearchTextParameterGuard', () => {
    let guard: SearchTextParameterGuard;
    let cityServiceSpy: jasmine.SpyObj<CityService> = jasmine.createSpyObj<CityService>(['getCities', 'getCitiesBySearchText']);
    let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>(['navigate']);
    let mockActivatedRoute: ActivatedRoute;

    beforeEach(() => {
        routerSpy.navigate.and.callFake(() => Promise.resolve(true));
        cityServiceSpy.getCitiesBySearchText.and.returnValue(of(mockCitiesDtoForSearchText));

        mockActivatedRoute = createMockActivatedRoute("1", null);

        TestBed.configureTestingModule({
            providers: [SearchTextParameterGuard, { provide: ActivatedRoute, useValue: mockActivatedRoute }, { provide: CityService, useValue: cityServiceSpy }, {provide: Router, useValue: routerSpy}],
            imports: [HttpClientTestingModule,
                RouterTestingModule.withRoutes(
                    [
                        { path: 'cities/searchResult/:searchText/:pageNumber', component: CityComponent, canActivate: [SearchTextParameterGuard]},
                        { path: 'cities/searchResult/:searchText', redirectTo: '/cities/searchResult/:searchText/1'},
                    ]
                )
            ]
        });
        guard = TestBed.inject(SearchTextParameterGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should not navigate when pageNumber is integer', () => {
        mockActivatedRoute = createMockActivatedRoute("1", "s");
        const stateSnapshot: RouterStateSnapshot = { } as RouterStateSnapshot;
        guard.canActivate(mockActivatedRoute.snapshot, stateSnapshot).subscribe(res => {
            expect(res).toBeTrue();
        });

    });

    it('should navigate to /cities/searchResult/s/1 when pageNumber is string', fakeAsync(() => {
        mockActivatedRoute = createMockActivatedRoute("asd", "s");
        const stateSnapshot: RouterStateSnapshot = { } as RouterStateSnapshot;
        let canActivateResult : boolean = true;
        guard.canActivate(mockActivatedRoute.snapshot, stateSnapshot).subscribe(res => {
            canActivateResult = res;
        });
        tick()
        expect(canActivateResult).toBe(false);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/cities/searchResult/s/1']);

    }));

    it('should navigate to /cities/searchResult/s/1 when pageNumber is greater than the greatest page number', fakeAsync(() => {
        mockActivatedRoute = createMockActivatedRoute("2", "s");
        const stateSnapshot: RouterStateSnapshot = { } as RouterStateSnapshot;
        let canActivateResult : boolean = true;
        guard.canActivate(mockActivatedRoute.snapshot, stateSnapshot).subscribe(res => {
            canActivateResult = res;
        });
        tick()
        expect(canActivateResult).toBe(false);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/cities/searchResult/s/1']);

    }));

    it('should navigate to /cities/searchResult/s/1 when pageNumber is smaller than the smallest page number', fakeAsync(() => {
        mockActivatedRoute = createMockActivatedRoute("0", "s");
        const stateSnapshot: RouterStateSnapshot = { } as RouterStateSnapshot;
        let canActivateResult : boolean = true;
        guard.canActivate(mockActivatedRoute.snapshot, stateSnapshot).subscribe(res => {
            canActivateResult = res;
        });
        tick()
        expect(canActivateResult).toBe(false);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/cities/searchResult/s/1']);

    }));

});

const createMockActivatedRoute = (pageNumber: any, searchText: any): ActivatedRoute => {
    const mockParams = {
        pageNumber: pageNumber,
        searchText: searchText,
    };

    const mockActivatedRoute: ActivatedRoute = {
        snapshot: {
            params: mockParams as any,
        } as ActivatedRouteSnapshot,
    } as ActivatedRoute;

    return mockActivatedRoute;
}