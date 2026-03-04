import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_RESERVATION } from '../utils/repositoriesTokens';
import type { IReservationRepository } from '../domain/repositories/Ireservations.repository';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';

@Injectable()
export class CreateReservationsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationRepository: IReservationRepository,
  ) {}
  create(data: CreateReservationDto) {
    return 'This action adds a new reservation';
  }
}
