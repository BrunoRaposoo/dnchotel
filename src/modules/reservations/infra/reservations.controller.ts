import { Controller, Post, Body, UseGuards, Get, Patch } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { ReservationStatus, Role } from '@prisma/client';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { CreateReservationsService } from '../services/CreateReservations.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { FindAllReservationsService } from '../services/findAllReservations.service';
import { FindByUserReservationsService } from '../services/findByUserReservations.service';
import { UpdateStatusReservationsService } from '../services/updateStatusReservations.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationsService,
    private readonly findAllReservationsService: FindAllReservationsService,
    private readonly findByIdReservationsService: FindByUserReservationsService,
    private readonly updateStatusReservationsService: UpdateStatusReservationsService,
  ) {}

  @Roles(Role.USER)
  @Post()
  create(@User('id') id: number, @Body() body: CreateReservationDto) {
    return this.createReservationsService.create(id, body);
  }

  @Get()
  findAll() {
    return this.findAllReservationsService.execute();
  }

  @Get('user')
  findByUser(@User('id') id: number) {
    return this.findByIdReservationsService.execute(id);
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findByIdReservationsService.execute(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  updateStatus(
    @ParamId() id: number,
    @Body('status') status: ReservationStatus,
  ) {
    return this.updateStatusReservationsService.execute(id, status);
  }
}
