import { Hotel } from '@prisma/client';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelsRepositories implements IHotelRepository {
  constructor(private readonly prisma: PrismaService) {}

  createHotel(data: CreateHotelDto): Promise<Hotel> {
    return this.prisma.hotel.create({ data })
  }
  findHotelById(id: number): Promise<Hotel | null> {
    throw new Error('Method not implemented.');
  }
  findHotelByName(name: string): Promise<Hotel | null> {
    throw new Error('Method not implemented.');
  }
  findHotels(): Promise<Hotel[]> {
    throw new Error('Method not implemented.');
  }
  updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel> {
    throw new Error('Method not implemented.');
  }
  deleteHotel(id: number): Promise<Hotel> {
    throw new Error('Method not implemented.');
  }
}
