import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Res, Query } from '@nestjs/common';
import { GetCityDto } from '../entities/get-city.dto';
import { Response } from 'express';
import { ApiResponseModel } from 'src/models/api-response.model';
import { API_RESPONSE_TEXTS } from 'src/common/constants/api-response.constants';
import { CityService } from '../services/city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly citiesService: CityService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCities(@Res() res: Response, @Query('searchText') searchText: string="", @Query('pageNumber') pageNumber: string = "-1"){
    try {
      let apiResponse : ApiResponseModel<GetCityDto[]> = {
        message: "",
        data: []
      }
      if(pageNumber != "-1" && pageNumber != ""){
        if(isNaN(parseInt(pageNumber))) {
          apiResponse.message = API_RESPONSE_TEXTS.BAD_REQUEST;
          apiResponse.data = null;
          res.status(HttpStatus.BAD_REQUEST).send(apiResponse);
        }
        let cities = await this.citiesService.getCities(searchText.length > 0 ? searchText : '' ,parseInt(pageNumber));
        
        apiResponse.message = API_RESPONSE_TEXTS.SUCCESS;
        apiResponse.data = cities;
        
        res.status(HttpStatus.OK).send(apiResponse);
      } else {
        let cities = await this.citiesService.getCities(searchText.length > 0 ? searchText : '');
        
        apiResponse.message = API_RESPONSE_TEXTS.SUCCESS;
        apiResponse.data = cities;
        
        res.status(HttpStatus.OK).send(apiResponse);
      }
      
    } catch(error) {
      
      let apiResponse : ApiResponseModel<GetCityDto[]> = {
        message: API_RESPONSE_TEXTS.INTERNAL_ERROR,
        data: null
      }
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(apiResponse);
      
    }

  }

}
