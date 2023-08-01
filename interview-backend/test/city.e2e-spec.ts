import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ApiResponseModel } from 'src/models/api-response.model';
import { GetCityDto } from 'src/modules/cities/entities/get-city.dto';
import { plainToClass } from 'class-transformer';
import { API_RESPONSE_TEXTS } from 'src/common/constants/api-response.constants';

describe('CityController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Getting Cities GET /cities', () => {

        it("should get cities", () => {
            const expectedData: GetCityDto[] = [
                { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
                { uuid: "4a7f5c2d-3a10-4a02-a9b3-450839929e43", cityName: "Hamburg", count: 267, pageNumber: 1 },
                { uuid: "09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99", cityName: "München", count: 899, pageNumber: 1 },
                { uuid: "0a40416f-aa4c-4b8b-8ce3-e82e664a4cd1", cityName: "Köln", count: 471, pageNumber: 1 },
                { uuid: "e1ad9f95-44b5-4d80-8b26-df42a53fcfb6", cityName: "Frankfurt", count: 110, pageNumber: 1 },
                { uuid: "66b8009b-319d-4272-92ea-853a10c27c9a", cityName: "Stuttgart", count: 782, pageNumber: 2 },
                { uuid: "93068f2d-35b5-4967-9b8d-64e23b6ddc89", cityName: "Düsseldorf", count: 315, pageNumber: 2 },
            ];

            return request(app.getHttpServer())
                .get('/cities')
                .expect(HttpStatus.OK)
                .expect((response) => {
                    const apiResponse: ApiResponseModel<GetCityDto[]> = plainToClass(ApiResponseModel<GetCityDto[]>, response.body);
                    expect(apiResponse).toBeDefined();
                    expect(apiResponse.message).toBe('Success');
                    expect(apiResponse).toBeInstanceOf(ApiResponseModel<GetCityDto[]>);
                    expect(apiResponse.data.toString()).toContain(expectedData.toString());
                });
        });

    });

    describe('Getting Cities GET /cities/:searchText', () => {

        it("should get the cities start with searchText", () => {
            const expectedData: GetCityDto[] = [
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
            ]

            const searchText = "b";


            return request(app.getHttpServer())
                .get('/cities/' + encodeURIComponent(searchText))
                .expect(HttpStatus.OK)
                .expect((response) => {
                    const apiResponse: ApiResponseModel<GetCityDto[]> = plainToClass(ApiResponseModel<GetCityDto[]>, response.body);
                    expect(apiResponse).toBeDefined();
                    expect(apiResponse.message).toBe(API_RESPONSE_TEXTS.SUCCESS);
                    expect(apiResponse).toBeInstanceOf(ApiResponseModel<GetCityDto[]>);
                    expect(apiResponse.data.toString()).toContain(expectedData.toString());
                });
        });

        it("should get an empty data when there is no city starts with searchText", () => {
            const searchText = "ğ";


            return request(app.getHttpServer())
                .get('/cities/' + encodeURIComponent(searchText))
                .expect(HttpStatus.OK)
                .expect((response) => {
                    const apiResponse: ApiResponseModel<GetCityDto[]> = plainToClass(ApiResponseModel<GetCityDto[]>, response.body);
                    expect(apiResponse).toBeDefined();
                    expect(apiResponse.message).toBe(API_RESPONSE_TEXTS.SUCCESS);
                    expect(apiResponse).toBeInstanceOf(ApiResponseModel<GetCityDto[]>);
                    expect(apiResponse.data.length).toEqual(0);
                });
        });

    });
});
