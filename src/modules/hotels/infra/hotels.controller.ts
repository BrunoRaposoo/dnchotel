import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { CreateHotelsService } from '../services/createHotels.service';
import { FindOneHotelsService } from '../services/findOneHotel.service';
import { FindAllHotelsService } from '../services/findAllHotel.service';
import { UpdateHotelsService } from '../services/updateHotel.service';
import { RemoveHotelsService } from '../services/removeHotel.service';

@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createhotelsService: CreateHotelsService,
    private readonly findAllhotelsService: FindAllHotelsService,
    private readonly findOnehotelsService: FindOneHotelsService,
    private readonly updatehotelsService: UpdateHotelsService,
    private readonly removeHotelsServoce: RemoveHotelsService,
  ) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.createhotelsService.execute(createHotelDto);
  }

  @Get()
  findAll() {
    return this.findAllhotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOnehotelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updatehotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeHotelsServoce.remove(+id);
  }
}
