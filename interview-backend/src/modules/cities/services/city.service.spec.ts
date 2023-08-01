import { Test, TestingModule } from "@nestjs/testing";
import { CityService } from "./city.service";
import { GetCityDto } from "../entities/get-city.dto";
import * as constants from "src/common/constants/app.config";

jest.mock('src/common/constants/app.config', () => ({
    get CITY_NUMBER_FOR_EACH_PAGE() {
        return 5;
    },
    get FILE_PATH() {
        return '../mockCities.json';
    }
}));

describe('CityService', () => {
    let cityService: CityService;
    beforeEach(async () => {
        jest.spyOn(constants, 'FILE_PATH', 'get').mockReturnValue("../mockCities.json" as any);


        const module: TestingModule = await Test.createTestingModule({
            providers: [CityService]
        }).compile();

        cityService = module.get<CityService>(CityService);
    });

    it('should be defined', () => {
        expect(cityService).toBeDefined();
    });

    it('should return GetCityDto type object list', async () => {
        const citiesDto = await cityService.getCities();

        expect(citiesDto[0]).toBeInstanceOf(GetCityDto);
    })

    it('should return a list contains correct amount of elements', async () => {
        let citiesDto = await cityService.getCities();
        expect(citiesDto).toHaveLength(18);

        citiesDto = await cityService.getCities("b", 1);
        expect(citiesDto).toHaveLength(4);

        citiesDto = await cityService.getCities("s", 1);
        expect(citiesDto).toHaveLength(1);

        citiesDto = await cityService.getCities("s", 2);
        expect(citiesDto).toHaveLength(0);

    });

    it('should calculate page numbers correctly', async () => {
        const citiesDto = await cityService.getCities();

        for (let i = 0, j = 0; i < citiesDto.length; i++) {
            if (i != 0 && i % (constants.CITY_NUMBER_FOR_EACH_PAGE) === 0) {
                j++;
            }
            expect(citiesDto[i].pageNumber).toEqual(j + 1);

        }
    });

    it('should return all data when no parameters are provided', async () => {
        let citiesDto = await cityService.getCities();
        expect(citiesDto).toEqual(
            [
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
            ]
        );
        
    });

    it('should return cities according to provided search text', async () => {
        let citiesDto = await cityService.getCities("m");
        expect(citiesDto).toEqual(
            [
                { uuid: "09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99", cityName: "München", count: 899, pageNumber: 1 }
                
            ]
        );
        citiesDto = await cityService.getCities("B");
        expect(citiesDto).toEqual(
            [
                { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
                { uuid: "f6b6b4e1-d185-47b5-8c94-61502a4e341a", cityName: "Bremen", count: 656, pageNumber: 1 },
                { uuid: "4f53e06f-3ad4-4bc9-a4b7-69368e763ab9", cityName: "Bochum", count: 366, pageNumber: 1 },
                { uuid: "6f4b5b62-0780-45b3-a522-d70e11d3b3c6", cityName: "Bielefeld", count: 888, pageNumber: 1 },
                
            ]
        )

        citiesDto = await cityService.getCities("Dor");
        expect(citiesDto).toEqual(
            [
                { uuid: "71bfebd8-8f44-46eb-9605-7cd7f8f8d5ca", cityName: "Dortmund", count: 607, pageNumber: 1 },
            ]
        )

        citiesDto = await cityService.getCities("d", null);
        expect(citiesDto).toEqual(
            [
                { uuid: "93068f2d-35b5-4967-9b8d-64e23b6ddc89", cityName: "Düsseldorf", count: 315, pageNumber: 1 },
                { uuid: "71bfebd8-8f44-46eb-9605-7cd7f8f8d5ca", cityName: "Dortmund", count: 607, pageNumber: 1 },
                { uuid: "49c01e96-2a36-47bc-862f-803de4e8bdae", cityName: "Dresden", count: 198, pageNumber: 1 },
                { uuid: "78117084-e01b-4cf0-8ea7-7710e7a5a6e1", cityName: "Duisburg", count: 999, pageNumber: 1 },
                
            ]
        )
    });

    it('search text should bring result regardless of uppercase or lowercase letters', async () => {
        let citiesDto = await cityService.getCities("bErLIn");
        expect(citiesDto).toEqual(
            [
                { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
            ]
        )

        citiesDto = await cityService.getCities("b");
        expect(citiesDto).toEqual(
            [
                { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
                { uuid: "f6b6b4e1-d185-47b5-8c94-61502a4e341a", cityName: "Bremen", count: 656, pageNumber: 1 },
                { uuid: "4f53e06f-3ad4-4bc9-a4b7-69368e763ab9", cityName: "Bochum", count: 366, pageNumber: 1 },
                { uuid: "6f4b5b62-0780-45b3-a522-d70e11d3b3c6", cityName: "Bielefeld", count: 888, pageNumber: 1 },
            ]
        )
    });

    it('should return cities according to provided pageNumber', async () => {
        let citiesDto = await cityService.getCities("", 2);
        expect(citiesDto).toEqual(
            [
                { uuid: "66b8009b-319d-4272-92ea-853a10c27c9a", cityName: "Stuttgart", count: 782, pageNumber: 2 },
                { uuid: "93068f2d-35b5-4967-9b8d-64e23b6ddc89", cityName: "Düsseldorf", count: 315, pageNumber: 2 },
                { uuid: "71bfebd8-8f44-46eb-9605-7cd7f8f8d5ca", cityName: "Dortmund", count: 607, pageNumber: 2 },
                { uuid: "2c9a2f55-9bea-46db-8bc0-9051b3b3a540", cityName: "Essen", count: 990, pageNumber: 2 },
                { uuid: "2b8847b6-dcc9-4e80-9a0c-0f1d7b8c9f34", cityName: "Leipzig", count: 48, pageNumber: 2 }
                
            ]
        );

        citiesDto = await cityService.getCities("b", 1);
        expect(citiesDto).toEqual(
            [
                { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
                { uuid: "f6b6b4e1-d185-47b5-8c94-61502a4e341a", cityName: "Bremen", count: 656, pageNumber: 1 },
                { uuid: "4f53e06f-3ad4-4bc9-a4b7-69368e763ab9", cityName: "Bochum", count: 366, pageNumber: 1 },
                { uuid: "6f4b5b62-0780-45b3-a522-d70e11d3b3c6", cityName: "Bielefeld", count: 888, pageNumber: 1 }
                
            ]
        );

        citiesDto = await cityService.getCities(null, 1);
        expect(citiesDto).toEqual(
            [
                { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
                { uuid: "4a7f5c2d-3a10-4a02-a9b3-450839929e43", cityName: "Hamburg", count: 267, pageNumber: 1 },
                { uuid: "09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99", cityName: "München", count: 899, pageNumber: 1 },
                { uuid: "0a40416f-aa4c-4b8b-8ce3-e82e664a4cd1", cityName: "Köln", count: 471, pageNumber: 1 },
                { uuid: "e1ad9f95-44b5-4d80-8b26-df42a53fcfb6", cityName: "Frankfurt", count: 110, pageNumber: 1 }
                
            ]
        );
        
    });



})