import { Inject, Injectable } from '@nestjs/common';
import type { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesToken';

@Injectable()
export class FindByOwnerHotelService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepositories: IHotelRepository,
  ) {}
  async findByOwner(ownerId: number) {
    return await this.hotelRepositories.findHotelByOwner(ownerId);
  }
}
