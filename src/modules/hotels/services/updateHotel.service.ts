import { Inject, Injectable } from '@nestjs/common';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesToken';
import type { IHotelRepository } from '../domain/repositories/IHotel.repositories';

@Injectable()
export class UpdateHotelsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepositories: IHotelRepository,
  ) {}

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    return await this.hotelRepositories.updateHotel(id, updateHotelDto);
  }
}
