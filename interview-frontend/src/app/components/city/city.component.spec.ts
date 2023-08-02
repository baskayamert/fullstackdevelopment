import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityComponent } from './city.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Params, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GREETING_TEXT, SEARCHBAR_TEXT, SEARCH_BUTTON_TEXT } from 'src/app/common/constants/app.constants';
import { COL_1_TEXT, COL_2_TEXT, COL_3_TEXT, COL_4_TEXT } from 'src/app/common/constants/city-table.constants';
import { CityService } from 'src/app/services/city.service';
import { ApiResponseModel } from 'src/app/entities/api-response.model';
import { GetCityDto } from 'src/app/entities/get-city.dto';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';


describe('CityComponent', () => {
    describe('CityComponent HTML', () => {
        let cityServiceSpy: jasmine.SpyObj<CityService> = jasmine.createSpyObj<CityService>(['getCities']);
        let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>(['navigate']);
        let mockActivatedRoute: ActivatedRoute;

        let component: CityComponent;
        let fixture: ComponentFixture<CityComponent>;

        beforeEach(() => {
            routerSpy.navigate.and.callFake(() => Promise.resolve(true));
            cityServiceSpy.getCities.and.returnValue(of(mockCitiesDto));
            mockActivatedRoute = createMockActivatedRoute(null, "1");

            TestBed.configureTestingModule({
                declarations: [CityComponent],
                providers: [{ provide: CityService, useValue: cityServiceSpy }, { provide: ActivatedRoute, useValue: mockActivatedRoute }],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]

            });
            fixture = TestBed.createComponent(CityComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should have all the constant texts', () => {

            const data = fixture.nativeElement;

            expect(data.querySelector('.greeting-text').textContent).toEqual(GREETING_TEXT);
            expect(data.querySelector('.search').querySelector('input').getAttribute('placeholder')).toEqual(SEARCHBAR_TEXT);
            expect(data.querySelector('.search-button').textContent).toEqual(SEARCH_BUTTON_TEXT);
            expect(data.querySelector('.col-1-text').textContent).toContain(COL_1_TEXT);
            expect(data.querySelector('.col-2-text').textContent).toContain(COL_2_TEXT);
            expect(data.querySelector('.col-3-text').textContent).toContain(COL_3_TEXT);
            expect(data.querySelector('.col-4-text').textContent).toContain(COL_4_TEXT);

        });

        it('should display correct data in table rows', () => {
            component.citiesFilteredByPage = [
                { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
                { uuid: "4a7f5c2d-3a10-4a02-a9b3-450839929e43", cityName: "Hamburg", count: 267, pageNumber: 1 },
                { uuid: "09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99", cityName: "München", count: 899, pageNumber: 1 },
                { uuid: "0a40416f-aa4c-4b8b-8ce3-e82e664a4cd1", cityName: "Köln", count: 471, pageNumber: 1 },
                { uuid: "e1ad9f95-44b5-4d80-8b26-df42a53fcfb6", cityName: "Frankfurt", count: 110, pageNumber: 1 },
            ];
        
            fixture.detectChanges();
        
            const rows = fixture.nativeElement.querySelectorAll('.table tbody tr');
        
            expect(rows.length).toBe(component.citiesFilteredByPage.length);
        
            for (let i = 0; i < component.citiesFilteredByPage.length; i++) {
              const city = component.citiesFilteredByPage[i];
        
              expect(rows[i].querySelector('.text-center').textContent.trim()).toBe(
                `${i + 1}`
              );
              expect(rows[i].querySelectorAll('.text-center')[1].textContent.trim()).toBe(
                city.uuid
              );
              expect(rows[i].querySelectorAll('.text-center')[2].textContent.trim()).toBe(
                city.cityName
              );
              expect(rows[i].querySelectorAll('.text-center')[3].textContent.trim()).toBe(
                city.count.toString()
              );
            }
          });


    });

    const mockCitiesDto: ApiResponseModel<GetCityDto[]> = {
        data: [
            { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
            { uuid: "4a7f5c2d-3a10-4a02-a9b3-450839929e43", cityName: "Hamburg", count: 267, pageNumber: 1 },
            { uuid: "09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99", cityName: "München", count: 899, pageNumber: 1 },
            { uuid: "0a40416f-aa4c-4b8b-8ce3-e82e664a4cd1", cityName: "Köln", count: 471, pageNumber: 1 },
            { uuid: "e1ad9f95-44b5-4d80-8b26-df42a53fcfb6", cityName: "Frankfurt", count: 110, pageNumber: 1 },
            { uuid: "66b8009b-319d-4272-92ea-853a10c27c9a", cityName: "Stuttgart", count: 782, pageNumber: 2 },
            { uuid: "93068f2d-35b5-4967-9b8d-64e23b6ddc89", cityName: "Düsseldorf", count: 315, pageNumber: 2 },
            { uuid: "71bfebd8-8f44-46eb-9605-7cd7f8f8d5ca", cityName: "Dortmund", count: 607, pageNumber: 2 },
            { uuid: "2c9a2f55-9bea-46db-8bc0-9051b3b3a540", cityName: "Essen", count: 990, pageNumber: 2 },
            { uuid: "2b8847b6-dcc9-4e80-9a0c-0f1d7b8c9f34", cityName: "Leipzig", count: 48, pageNumber: 2 },
            { uuid: "f6b6b4e1-d185-47b5-8c94-61502a4e341a", cityName: "Bremen", count: 656, pageNumber: 3 },
            { uuid: "49c01e96-2a36-47bc-862f-803de4e8bdae", cityName: "Dresden", count: 198, pageNumber: 3 },
            { uuid: "f69e0ca6-05e5-47b7-af50-57d7ac65f522", cityName: "Hannover", count: 842, pageNumber: 3 },
            { uuid: "2e9ad9c0-c890-40c3-9b6e-bccf7a771e19", cityName: "Nürnberg", count: 72, pageNumber: 3 },
            { uuid: "78117084-e01b-4cf0-8ea7-7710e7a5a6e1", cityName: "Duisburg", count: 999, pageNumber: 3 },
            { uuid: "4f53e06f-3ad4-4bc9-a4b7-69368e763ab9", cityName: "Bochum", count: 366, pageNumber: 4 },
            { uuid: "6773448f-7be1-4715-83d7-5b0f11f7c016", cityName: "Wuppertal", count: 625, pageNumber: 4 },
            { uuid: "6f4b5b62-0780-45b3-a522-d70e11d3b3c6", cityName: "Bielefeld", count: 888, pageNumber: 4 },
        ],
        message: 'Success'
    }


    describe('CityComponent TypeScript', () => {
        let cityServiceSpy: jasmine.SpyObj<CityService> = jasmine.createSpyObj<CityService>(['getCities']);
        let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>(['navigate']);

        beforeEach(() => {
            routerSpy.navigate.and.callFake(() => Promise.resolve(true));

        })


        it('should be initialized when searchText is undefined', () => {
            cityServiceSpy.getCities.and.returnValue(of(mockCitiesDto))
            const component = new CityComponent(cityServiceSpy, createMockActivatedRoute(undefined, "1"), routerSpy);
            component.ngOnInit();

            expect(component).toBeTruthy();
        });

        it('should be initialized when pageNumber is undefined', () => {
            cityServiceSpy.getCities.and.returnValue(of(mockCitiesDto))
            const component = new CityComponent(cityServiceSpy, createMockActivatedRoute("s", undefined), routerSpy);
            component.ngOnInit();

            expect(component).toBeTruthy();
        });

        it('should be initialized when both pageNumber and searchText is undefined', () => {
            cityServiceSpy.getCities.and.returnValue(of(mockCitiesDto))
            const component = new CityComponent(cityServiceSpy, createMockActivatedRoute(undefined, undefined), routerSpy);
            component.ngOnInit();

            expect(component).toBeTruthy();
        });

        it('should be initialized when both pageNumber and searchText is defined', () => {
            const expectedData = {
                data: [
                    { uuid: "66b8009b-319d-4272-92ea-853a10c27c9a", cityName: "Stuttgart", count: 782, pageNumber: 1 },
                    { uuid: "c24e60fc-e00d-49e2-99db-7e2d79d007f7", cityName: "Saarbrücken", count: 109, pageNumber: 1 },
                    { uuid: "8c79d8db-7e5e-416a-8711-d3fcfdf87332", cityName: "Solingen", count: 852, pageNumber: 1 },
                    { uuid: "6d6df5ef-72f8-4f72-994b-9d8401c4892a", cityName: "Siegen", count: 185, pageNumber: 1 },
                    { uuid: "8b5b650e-9c31-4216-87de-dab75cfe8356", cityName: "Salzgitter", count: 80, pageNumber: 1 },
                ],
                message: 'Success'
            }
            cityServiceSpy.getCities.and.returnValue(of(expectedData))
            const component = new CityComponent(cityServiceSpy, createMockActivatedRoute("s", "1"), routerSpy);
            component.ngOnInit();

            expect(component).toBeTruthy();
        });

        it('should have all the constant text and component variables defined.', () => {
            cityServiceSpy.getCities.and.returnValue(of(mockCitiesDto))
            const component = new CityComponent(cityServiceSpy, createMockActivatedRoute(undefined, "1"), routerSpy);
            component.ngOnInit();

            expect(component.greetingText).toEqual(GREETING_TEXT);
            expect(component.searchBarText).toEqual(SEARCHBAR_TEXT);
            expect(component.searchButtonText).toEqual(SEARCH_BUTTON_TEXT);
            expect(component.col1Text).toEqual(COL_1_TEXT);
            expect(component.col2Text).toEqual(COL_2_TEXT);
            expect(component.col3Text).toEqual(COL_3_TEXT);
            expect(component.col4Text).toEqual(COL_4_TEXT);
            expect(component.currentPageNumber).toEqual(1);
            expect(component.currentSearchText).toBeUndefined();
            expect(component.maxPageValue).toEqual(4);
            expect(component.cities).toEqual(mockCitiesDto.data);
            expect(component.citiesFilteredByPage).toEqual(mockCitiesDto.data.filter(m => m.pageNumber === 1));

        });

        it('getCities function should set cities and citiesFilteredByPage correctly', () => {
            cityServiceSpy.getCities.and.returnValue(of(mockCitiesDto))
            let component = new CityComponent(cityServiceSpy, createMockActivatedRoute(undefined, "3"), routerSpy);
            component.ngOnInit();

            let expectedData = {
                data: [
                    { uuid: "f6b6b4e1-d185-47b5-8c94-61502a4e341a", cityName: "Bremen", count: 656, pageNumber: 3 },
                    { uuid: "49c01e96-2a36-47bc-862f-803de4e8bdae", cityName: "Dresden", count: 198, pageNumber: 3 },
                    { uuid: "f69e0ca6-05e5-47b7-af50-57d7ac65f522", cityName: "Hannover", count: 842, pageNumber: 3 },
                    { uuid: "2e9ad9c0-c890-40c3-9b6e-bccf7a771e19", cityName: "Nürnberg", count: 72, pageNumber: 3 },
                    { uuid: "78117084-e01b-4cf0-8ea7-7710e7a5a6e1", cityName: "Duisburg", count: 999, pageNumber: 3 },
                ],
                message: 'Success'
            }

            component.getCities();
            expect(mockCitiesDto.data).toEqual(component.cities);
            expect(expectedData.data).toEqual(component.citiesFilteredByPage);

            component = new CityComponent(cityServiceSpy, createMockActivatedRoute("b", "1"), routerSpy);
            component.ngOnInit();

            expectedData = {
                data: [
                    { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
                    { uuid: "f6b6b4e1-d185-47b5-8c94-61502a4e341a", cityName: "Bremen", count: 656, pageNumber: 1 },
                    { uuid: "4f53e06f-3ad4-4bc9-a4b7-69368e763ab9", cityName: "Bochum", count: 366, pageNumber: 1 },
                    { uuid: "6f4b5b62-0780-45b3-a522-d70e11d3b3c6", cityName: "Bielefeld", count: 888, pageNumber: 1 },
                    { uuid: "7f1865a1-0f63-4f0a-b982-173d63617395", cityName: "Bonn", count: 753, pageNumber: 1 }
                ],
                message: 'Success'
            }
            const returnedDataFromService = {
                data: [
                    { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
                    { uuid: "f6b6b4e1-d185-47b5-8c94-61502a4e341a", cityName: "Bremen", count: 656, pageNumber: 1 },
                    { uuid: "4f53e06f-3ad4-4bc9-a4b7-69368e763ab9", cityName: "Bochum", count: 366, pageNumber: 1 },
                    { uuid: "6f4b5b62-0780-45b3-a522-d70e11d3b3c6", cityName: "Bielefeld", count: 888, pageNumber: 1 },
                    { uuid: "7f1865a1-0f63-4f0a-b982-173d63617395", cityName: "Bonn", count: 753, pageNumber: 1 },
                    { uuid: "7a994933-a111-49d6-892c-472219138b62", cityName: "Braunschweig", count: 54, pageNumber: 2, },
                    { uuid: "82215c81-e0e9-43e0-a5e2-56d2c3d47ad6", cityName: "Bottrop", count: 877, pageNumber: 2 },
                ],
                message: 'Success'
            }
            cityServiceSpy.getCities.and.returnValue(of(returnedDataFromService))


            component.getCities();
            expect(returnedDataFromService.data).toEqual(component.cities);
            expect(expectedData.data).toEqual(component.citiesFilteredByPage);


        });

        it('navigateToSearchText function should work correctly', () => {

            const expectedData = {
                data: [
                    { uuid: "c24e60fc-e00d-49e2-99db-7e2d79d007f7", cityName: "Saarbrücken", count: 109, pageNumber: 1 },
                    { uuid: "8c79d8db-7e5e-416a-8711-d3fcfdf87332", cityName: "Solingen", count: 852, pageNumber: 1 },
                    { uuid: "6d6df5ef-72f8-4f72-994b-9d8401c4892a", cityName: "Siegen", count: 185, pageNumber: 1 },
                    { uuid: "8b5b650e-9c31-4216-87de-dab75cfe8356", cityName: "Salzgitter", count: 80, pageNumber: 1 },
                    { uuid: "27a7e0e0-59a4-47a1-9e11-c1713b2b4651", cityName: "Schwerin", count: 859, pageNumber: 1 },
                    { uuid: "66b8009b-319d-4272-92ea-853a10c27c9a", cityName: "Stuttgart", count: 782, pageNumber: 2 }
                ],
                message: 'Success'
            }

            const expectedFilteredData = {
                data: [
                    { uuid: "c24e60fc-e00d-49e2-99db-7e2d79d007f7", cityName: "Saarbrücken", count: 109, pageNumber: 1 },
                    { uuid: "8c79d8db-7e5e-416a-8711-d3fcfdf87332", cityName: "Solingen", count: 852, pageNumber: 1 },
                    { uuid: "6d6df5ef-72f8-4f72-994b-9d8401c4892a", cityName: "Siegen", count: 185, pageNumber: 1 },
                    { uuid: "8b5b650e-9c31-4216-87de-dab75cfe8356", cityName: "Salzgitter", count: 80, pageNumber: 1 },
                    { uuid: "27a7e0e0-59a4-47a1-9e11-c1713b2b4651", cityName: "Schwerin", count: 859, pageNumber: 1 },
                ],
                message: 'Success'
            }

            cityServiceSpy.getCities.and.returnValue(of(expectedData))
            const component = new CityComponent(cityServiceSpy, createMockActivatedRoute(null, "1"), routerSpy);
            component.ngOnInit();

            component.navigateToSearchText("s");
            expect(expectedData.data).toEqual(component.cities);
            expect(expectedFilteredData.data).toEqual(component.citiesFilteredByPage);
            expect(routerSpy.navigate).toHaveBeenCalledWith(["/cities"], { queryParams: { searchText: "s", pageNumber: '1' } })

        });

        it('getPageNumbers function should work correctly', () => {

            cityServiceSpy.getCities.and.returnValue(of(mockCitiesDto))
            const component = new CityComponent(cityServiceSpy, createMockActivatedRoute(null, "1"), routerSpy);
            component.ngOnInit();
            component.maxPageValue = 4;

            const pageNumbers = component.getPageNumbers()

            const expectedPageNumbers = [1, 2, 3, 4];

            expect(pageNumbers).toEqual(expectedPageNumbers);
        });

        it('calculateTotalPage function should work correctly', () => {

            cityServiceSpy.getCities.and.returnValue(of(mockCitiesDto))
            const component = new CityComponent(cityServiceSpy, createMockActivatedRoute(null, "1"), routerSpy);
            component.ngOnInit();

            component.calculateTotalPage();

            const expectedMaxPageValue = 4;

            expect(component.maxPageValue).toEqual(expectedMaxPageValue);
        });



    });

});

const createMockActivatedRoute = (searchText: any, pageNumber: any): ActivatedRoute => {
    const mockParams = {
        pageNumber: pageNumber,
        searchText: searchText,
    };

    const mockActivatedRoute: ActivatedRoute = {
        snapshot: {
            queryParams: mockParams as any,
        } as ActivatedRouteSnapshot,
    } as ActivatedRoute;

    return mockActivatedRoute;
}

