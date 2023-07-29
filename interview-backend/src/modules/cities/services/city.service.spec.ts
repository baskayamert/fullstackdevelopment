import { Test, TestingModule } from "@nestjs/testing";
import { CityService } from "./city.service";
import { CITY_NUMBER_FOR_EACH_PAGE } from "src/common/constants/app.config";

describe('CityService', () => {
    let cityService: CityService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [CityService]
        }).compile();

        cityService = module.get<CityService>(CityService);
    });

    it('CityService should be defined', () => {
        expect(cityService).toBeDefined();
    });

    it('CityService should return GetCityDto type object list', async () => {
        const citiesDto = await cityService.getCities();

        citiesDto.forEach(cityDto => {
            expect(cityDto).toEqual(
                expect.objectContaining({
                    uuid: expect.any(String),
                    cityName: expect.any(String),
                    count: expect.any(Number),
                    pageNumber: expect.any(Number),
                })
            )
        });
    })

    it('CityService should return a list contains correct amount of elements', async () => {
        const citiesDto = await cityService.getCities();

        expect(citiesDto).toHaveLength(100);
    });

    it('CityService should calculate page numbers correctly', async () => {
        const citiesDto = await cityService.getCities();

        for(let i = 0, j = 0; i < citiesDto.length; i++) {
            if(i != 0 && i % (CITY_NUMBER_FOR_EACH_PAGE) === 0) {
                j++;
            }
            expect(citiesDto[i].pageNumber).toEqual(j+1);

        }
    });

    it('CityService should return correct data', async () => {
        const citiesDto = await cityService.getCities();
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
                { uuid: "7f1865a1-0f63-4f0a-b982-173d63617395", cityName: "Bonn", count: 753, pageNumber: 4 },
                { uuid: "53904f3b-9cc7-442b-b506-4d4a52a62eaf", cityName: "Mannheim", count: 438, pageNumber: 4 },
                { uuid: "0ab9df21-5040-4821-8694-8912cd3a78d6", cityName: "Karlsruhe", count: 3, pageNumber: 5 },
                { uuid: "acbdce0e-19da-43f0-8a79-09f199b9e5f7", cityName: "Wiesbaden", count: 884, pageNumber: 5 },
                { uuid: "9c2f0e1b-65e7-4a85-bc56-6c2021ec68f0", cityName: "Münster", count: 500, pageNumber: 5 },
                { uuid: "7738e232-e22f-4b21-8d8a-c6f2899ffea0", cityName: "Gelsenkirchen", count: 31, pageNumber: 5 },
                { uuid: "d2accd64-8922-48af-9697-e17f74401a16", cityName: "Augsburg", count: 208, pageNumber: 5 },
                { uuid: "94f94a3c-8cbb-4ff9-a00c-d6a5aa3a1ad2", cityName: "Mönchengladbach", count: 716, pageNumber: 6 },
                { uuid: "b3f978a2-08b5-4460-a102-50f9cb71a49f", cityName: "Aachen", count: 60, pageNumber: 6 },
                { uuid: "2b7ad8c0-4906-4d77-af30-2fda92a029e9", cityName: "Chemnitz", count: 927, pageNumber: 6 },
                { uuid: "7a994933-a111-49d6-892c-472219138b62", cityName: "Braunschweig", count: 54, pageNumber: 6 },
                { uuid: "550e8400-e29b-41d4-a716-446655440000", cityName: "Krefeld", count: 674, pageNumber: 6 },
                { uuid: "123e4567-e89b-12d3-a456-426655440000", cityName: "Halle", count: 183, pageNumber: 7 },
                { uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11", cityName: "Kiel", count: 281, pageNumber: 7 },
                { uuid: "67c54e40-9e5a-4123-9af4-9b0b2eb98a13", cityName: "Magdeburg", count: 800, pageNumber: 7 },
                { uuid: "1dc59b9b-310a-49df-9f95-c2249ed1f84c", cityName: "Oberhausen", count: 916, pageNumber: 7 },
                { uuid: "b02a3d6f-8a3e-425b-96cb-8b63aa7572b0", cityName: "Lübeck", count: 45, pageNumber: 7 },
                { uuid: "f032b5e9-02f1-413b-90f8-6c4a6a6c9575", cityName: "Erfurt", count: 139, pageNumber: 8 },
                { uuid: "8f7e4de2-7bb0-4c6e-ae77-1fb8aa3f14e1", cityName: "Rostock", count: 867, pageNumber: 8 },
                { uuid: "2d2efef9-d91d-4c3d-9c7f-6f3d1e81a2c9", cityName: "Mainz", count: 477, pageNumber: 8 },
                { uuid: "6ef67f9c-d7a0-4cfb-b3b5-e43e7a949d45", cityName: "Kassel", count: 663, pageNumber: 8 },
                { uuid: "e0ae8802-957a-4370-bd14-e0d53c204b11", cityName: "Hagen", count: 36, pageNumber: 8 },
                { uuid: "303295a2-2ab7-4cc0-bc7a-77cb6a165e05", cityName: "Hamm", count: 965, pageNumber: 9 },
                { uuid: "c24e60fc-e00d-49e2-99db-7e2d79d007f7", cityName: "Saarbrücken", count: 109, pageNumber: 9 },
                { uuid: "99b35da1-2262-42b8-9f79-d3c840bbbd99", cityName: "Mülheim an der Ruhr", count: 422, pageNumber: 9 },
                { uuid: "58b053d8-1baf-468d-89eb-59e8f4ca711c", cityName: "Potsdam", count: 752, pageNumber: 9 },
                { uuid: "d19b9291-d0f8-48a3-b0b3-7858529f90a0", cityName: "Ludwigshafen", count: 791, pageNumber: 9 },
                { uuid: "8ebdb7c9-313e-45d6-8d3a-2896de1a67e9", cityName: "Oldenburg", count: 250, pageNumber: 10 },
                { uuid: "1f1ef1f7-3d01-4820-ae42-9e03df45711c", cityName: "Leverkusen", count: 20, pageNumber: 10 },
                { uuid: "b153eb62-7e85-4d5e-b6d5-36177a9773d1", cityName: "Osnabrück", count: 495, pageNumber: 10 },
                { uuid: "8c79d8db-7e5e-416a-8711-d3fcfdf87332", cityName: "Solingen", count: 852, pageNumber: 10 },
                { uuid: "f1569f3c-941d-4560-a7d1-43c94de2b7d7", cityName: "Heidelberg", count: 297, pageNumber: 10 },
                { uuid: "68987402-d8e1-454a-8810-5e2de05fcd4e", cityName: "Herne", count: 63, pageNumber: 11 },
                { uuid: "a03d75cb-e574-4d63-9f95-b4811e45ea68", cityName: "Neuss", count: 947, pageNumber: 11 },
                { uuid: "31e076c5-3cc3-45e0-a02c-68165e603993", cityName: "Darmstadt", count: 904, pageNumber: 11 },
                { uuid: "7b6e3495-9f33-4da4-b0d6-2b5548ab1089", cityName: "Paderborn", count: 778, pageNumber: 11 },
                { uuid: "b1265ee3-9b19-4ee6-8a4e-bd30a902e542", cityName: "Regensburg", count: 532, pageNumber: 11 },
                { uuid: "12e2b372-686f-44f6-8269-2b4ecf65417f", cityName: "Ingolstadt", count: 251, pageNumber: 12 },
                { uuid: "eaa3a5d8-91ef-471a-8047-b0da99d5301e", cityName: "Würzburg", count: 822, pageNumber: 12 },
                { uuid: "4a28f7d3-87cb-4ec7-af90-e1cc9a4b95fc", cityName: "Wolfsburg", count: 743, pageNumber: 12 },
                { uuid: "38a35f27-eb6b-4f10-8cd6-7a80c747ee4d", cityName: "Ulm", count: 815, pageNumber: 12 },
                { uuid: "c1e6d18a-4a18-45b0-84dd-70ef0a3c126a", cityName: "Göttingen", count: 909, pageNumber: 12 },
                { uuid: "9d9e7c9e-5a78-41f1-9a0d-b9b0e05a60aa", cityName: "Offenbach", count: 69, pageNumber: 13 },
                { uuid: "82215c81-e0e9-43e0-a5e2-56d2c3d47ad6", cityName: "Bottrop", count: 877, pageNumber: 13 },
                { uuid: "44b70618-b10a-4f9a-80e0-4ceae60d37e1", cityName: "Trier", count: 342, pageNumber: 13 },
                { uuid: "2d7d40e5-3da2-4f84-870b-e3630378239a", cityName: "Recklinghausen", count: 629, pageNumber: 13 },
                { uuid: "7c5e14af-6e53-4c45-9f80-79db4bb23ce2", cityName: "Reutlingen", count: 991, pageNumber: 13 },
                { uuid: "80364cf4-bb6a-4d82-945f-b1f6a0efbd7c", cityName: "Bremerhaven", count: 289, pageNumber: 14 },
                { uuid: "4c11b450-7006-4b7e-8d91-025f42bc9b0b", cityName: "Koblenz", count: 524, pageNumber: 14 },
                { uuid: "a1337e39-525c-4b5b-8e05-5a57f00d983c", cityName: "Bergisch Gladbach", count: 685, pageNumber: 14 },
                { uuid: "25b6ebd6-75f5-4505-868b-0804f70ce347", cityName: "Jena", count: 418, pageNumber: 14 },
                { uuid: "91392cf1-c918-4a86-8be9-8776db534d17", cityName: "Remscheid", count: 571, pageNumber: 14 },
                { uuid: "6c94f21f-79bf-48a7-b7f8-6b5824bfcc72", cityName: "Erlangen", count: 334, pageNumber: 15 },
                { uuid: "d95d0e65-e6a1-468c-86d3-5e1f798ae50b", cityName: "Moers", count: 977, pageNumber: 15 },
                { uuid: "6d6df5ef-72f8-4f72-994b-9d8401c4892a", cityName: "Siegen", count: 185, pageNumber: 15 },
                { uuid: "312cb206-cd3d-4e67-9937-ae726ef20a37", cityName: "Hildesheim", count: 617, pageNumber: 15 },
                { uuid: "8b5b650e-9c31-4216-87de-dab75cfe8356", cityName: "Salzgitter", count: 80, pageNumber: 15 },
                { uuid: "9275e8ef-0509-4db9-88ab-cb03a15ac1f3", cityName: "Cottbus", count: 693, pageNumber: 16 },
                { uuid: "8c20d864-d16f-417e-8ce1-1a98eab8e8f9", cityName: "Gera", count: 95, pageNumber: 16 },
                { uuid: "d9d8ebe7-72dd-41a0-a15f-e89dd1b63c5b", cityName: "Kaiserslautern", count: 424, pageNumber: 16 },
                { uuid: "6a309891-d3c7-438b-98d9-937cf71f2734", cityName: "Witten", count: 847, pageNumber: 16 },
                { uuid: "2a9d6b3e-cc3b-4d33-aadc-67d83d51c0e5", cityName: "Gütersloh", count: 318, pageNumber: 16 },
                { uuid: "74a3286f-58b3-472d-931f-0367d02e9b4d", cityName: "Iserlohn", count: 152, pageNumber: 17 },
                { uuid: "27a7e0e0-59a4-47a1-9e11-c1713b2b4651", cityName: "Schwerin", count: 859, pageNumber: 17 },
                { uuid: "3d0e3563-5c71-421a-8be3-18e405204e1b", cityName: "Hanau", count: 432, pageNumber: 17 },
                { uuid: "e049e165-34b7-46d0-9db6-6fdd1d0b5f4c", cityName: "Düren", count: 567, pageNumber: 17 },
                { uuid: "87f7f41a-6d9e-4b20-aee7-d053a317e0f7", cityName: "Esslingen am Neckar", count: 14, pageNumber: 17 },
                { uuid: "3ab7c87e-0f02-4c5a-8a1d-b7d0a4f5e67e", cityName: "Ludwigsburg", count: 283, pageNumber: 18 },
                { uuid: "0b86747a-cb46-44d0-8a0c-927c0a9549a7", cityName: "Marl", count: 929, pageNumber: 18 },
                { uuid: "9d0e930b-2a90-4a57-8c34-798681912888", cityName: "Lünen", count: 740, pageNumber: 18 },
                { uuid: "b5d1ac07-b2be-4e17-94cd-27d345434c8a", cityName: "Velbert", count: 128, pageNumber: 18 },
                { uuid: "f7d6b4f9-8973-4ac0-8cd9-4e1e882b1a0b", cityName: "Minden", count: 373, pageNumber: 18 },
                { uuid: "d2c5156d-1b98-4735-a39a-3e868ac695d1", cityName: "Worms", count: 967, pageNumber: 19 },
                { uuid: "70887e0e-ae86-481c-9da4-1b8969701a35", cityName: "Konstanz", count: 684, pageNumber: 19 },
                { uuid: "9f60e7fb-33df-4b1e-9b5c-9091696c13d2", cityName: "Neumünster", count: 16, pageNumber: 19 },
                { uuid: "b1c08e86-c043-4e5b-8a96-e581f75d82f1", cityName: "Norderstedt", count: 503, pageNumber: 19 },
                { uuid: "afe8ff22-b736-4ea6-b9c3-aae4f4f4cd7b", cityName: "Delmenhorst", count: 743, pageNumber: 19 },
                { uuid: "1c73a42d-9f6a-4b38-85bc-c482915db449", cityName: "Villingen-Schwenningen", count: 65, pageNumber: 20 },
                { uuid: "8c4e60f1-2fe4-4d48-b2b1-495e0c515ed6", cityName: "Bamberg", count: 248, pageNumber: 20 },
                { uuid: "2cf7e0e0-0ac4-40f3-9a38-d6c77f4fbf75", cityName: "Celle", count: 855, pageNumber: 20 },
                { uuid: "d2058cb6-49f0-460e-8842-5a6d58b67614", cityName: "Rosenheim", count: 704, pageNumber: 20 },
                { uuid: "4f11e6f1-66e8-4b9c-a6f7-cc699cf37e1f", cityName: "Wilhelmshavenig", count: 461, pageNumber: 20 }
            ]
        )
    });

    it('CityService should return cities according to provided search text', async () => {
        let citiesDto = await cityService.getCitiesBySearchText("B");
        expect(citiesDto).toEqual(
            [
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
        )

        citiesDto = await cityService.getCitiesBySearchText("Dor");
        expect(citiesDto).toEqual(
            [
                { uuid: "71bfebd8-8f44-46eb-9605-7cd7f8f8d5ca", cityName: "Dortmund", count: 607, pageNumber: 1 },
            ]
        )
    });

    it('Search text should bring result regardless of uppercase or lowercase letters', async () => {
        let citiesDto = await cityService.getCitiesBySearchText("bErLIn");
        expect(citiesDto).toEqual(
            [
                { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: "Berlin", count: 523, pageNumber: 1 },
            ]
        )

        citiesDto = await cityService.getCitiesBySearchText("b");
        expect(citiesDto).toEqual(
            [
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
        )
    });



})