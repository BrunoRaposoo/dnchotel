import { Inject, Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { Hotel } from '@prisma/client';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesToken';
import { REDIS_HOTEL_KEY } from '../utils/redisKey';
import type { IHotelRepository } from '../domain/repositories/IHotel.repositories';

@Injectable()
export class FindAllHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepository,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offSet = (page - 1) * limit;
    const cacheKey = `${REDIS_HOTEL_KEY}:${page}:${limit}`;

    const dataRedis = await this.redis.get(cacheKey);

    let data: Hotel[];

    if (dataRedis) {
      data = JSON.parse(dataRedis) as Hotel[];
    } else {
      data = await this.hotelRepositories.findHotels(offSet, limit);
      data = data.map((hotel: Hotel) => {
        if (hotel.image) {
          hotel.image = `${process.env.APP_API_URL}/hotel-image/${hotel.image}`;
        }
        return hotel;
      });
      await this.redis.set(cacheKey, JSON.stringify(data), 'EX', 3600);
    }

    const total = await this.hotelRepositories.countHotels();
    return {
      total,
      page,
      per_page: limit,
      data,
    };
  }
}
