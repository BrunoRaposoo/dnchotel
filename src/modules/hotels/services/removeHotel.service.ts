import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesToken';
import type { IHotelRepository } from '../domain/repositories/IHotel.repositories';

@Injectable()
export class RemoveHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepository,
  ) {}
  remove(id: number) {
    return this.hotelRepositories.deleteHotel(id);
  }
}
