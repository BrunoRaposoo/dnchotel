import { Inject, Injectable } from '@nestjs/common';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesToken';
import type { IHotelRepository } from '../domain/repositories/IHotel.repositories';

@Injectable()
export class FindAllHotelsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepositories: IHotelRepository,
  ) {}
  async findAll() {
    return await this.hotelRepositories.findHotels();
  }
}
