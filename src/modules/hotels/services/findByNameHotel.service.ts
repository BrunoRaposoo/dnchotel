import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesToken';
import type { IHotelRepository } from '../domain/repositories/IHotel.repositories';

@Injectable()
export class FindByNameHotelService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepository,
  ) {}
  async findByName(name: string) {
    return await this.hotelRepositories.findHotelByName(name);
  }
}
