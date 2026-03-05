import { Inject, Injectable } from '@nestjs/common';
import type { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesToken';

@Injectable()
export class FindByOwnerHotelService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepository,
  ) {}
  async findByOwner(ownerId: number) {
    return await this.hotelRepositories.findHotelByOwner(ownerId);
  }
}
