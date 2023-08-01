import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { GetCityDto } from '../entities/get-city.dto';
import { City } from 'src/entities/city.entity';
import { plainToClass } from 'class-transformer';
import { CITY_NUMBER_FOR_EACH_PAGE, FILE_PATH } from 'src/common/constants/app.config';

@Injectable()
export class CityService {
  cityNumberForEachPage = CITY_NUMBER_FOR_EACH_PAGE;

  private readJsonFile(): Promise<City[]> {
    let filePath = FILE_PATH;
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        try {
          const jsonData : City[] = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }

  async getCities(searchText: string = '', pageNumber: number = -1) : Promise<GetCityDto[]> {
    let cities : City[] = await this.readJsonFile();
    let result : GetCityDto[] = [];

    let pageNumberCount = 1;

    if(searchText.length > 0) {
      cities = cities.filter(x => x.cityName.toLowerCase().startsWith(searchText.toLowerCase()));
    }

    for(let i = 0; i < cities.length; i++) {
      let getCityDto = plainToClass(GetCityDto, cities[i]);
      if(i != 0 && i % (this.cityNumberForEachPage) === 0) {
        pageNumberCount++;
      }
      getCityDto.pageNumber = pageNumberCount;
      result.push(getCityDto);
    }
    if(pageNumber !== -1){
      result = result.filter(c => c.pageNumber === pageNumber);
    }
    return result;
  }

}
