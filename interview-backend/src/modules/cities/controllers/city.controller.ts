import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Res } from '@nestjs/common';
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
  async getCities(@Res() res: Response){
    try {
      const cities = await this.citiesService.getCities();
      let apiResponse : ApiResponseModel<GetCityDto[]> = {
        message: API_RESPONSE_TEXTS.SUCCESS,
        data: cities
      }
      res.status(HttpStatus.OK).send(apiResponse);
    } catch(error) {
      if (error.code === 'BAD_REQUEST') {
        let apiResponse : ApiResponseModel<GetCityDto[]> = {
          message: API_RESPONSE_TEXTS.BAD_REQUEST,
          data: null
        }
        res.status(HttpStatus.BAD_REQUEST).send(apiResponse);
      } else {
        let apiResponse : ApiResponseModel<GetCityDto[]> = {
          message: API_RESPONSE_TEXTS.INTERNAL_ERROR,
          data: null
        }
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(apiResponse);
      }
    }

  }

  @Get(':searchText')
  @HttpCode(HttpStatus.OK)
  async getCitiesBySearchText(@Param('searchText') searchText, @Res() res: Response){
    try {
      const cities = await this.citiesService.getCitiesBySearchText(searchText);
      let apiResponse : ApiResponseModel<GetCityDto[]> = {
        message: API_RESPONSE_TEXTS.SUCCESS,
        data: cities
      }
      res.status(HttpStatus.OK).send(apiResponse);
    } catch(error) {
      if (error.code === 'BAD_REQUEST') {
        let apiResponse : ApiResponseModel<GetCityDto[]> = {
          message: API_RESPONSE_TEXTS.BAD_REQUEST,
          data: null
        }
        res.status(HttpStatus.BAD_REQUEST).send(apiResponse);
      } else {
        let apiResponse : ApiResponseModel<GetCityDto[]> = {
          message: API_RESPONSE_TEXTS.INTERNAL_ERROR,
          data: null
        }
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(apiResponse);
      }
    }

  }

}
