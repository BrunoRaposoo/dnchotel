import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { CreateHotelsService } from '../services/createHotels.service';
import { FindOneHotelsService } from '../services/findOneHotel.service';
import { FindAllHotelsService } from '../services/findAllHotel.service';
import { UpdateHotelsService } from '../services/updateHotel.service';
import { RemoveHotelsService } from '../services/removeHotel.service';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { FindByOwnerHotelService } from '../services/findbyownerhotel.service';
import { FindByNameHotelService } from '../services/findByNameHotel.service';

@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createhotelsService: CreateHotelsService,
    private readonly findAllhotelsService: FindAllHotelsService,
    private readonly findOnehotelsService: FindOneHotelsService,
    private readonly updatehotelsService: UpdateHotelsService,
    private readonly removeHotelsServoce: RemoveHotelsService,
    private readonly findHotelByOwnerService: FindByOwnerHotelService,
    private readonly findHotelByNameService: FindByNameHotelService,
  ) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.createhotelsService.execute(createHotelDto);
  }

  @Get()
  findAll() {
    return this.findAllhotelsService.findAll();
  }

  @Get(':ownerId')
  findOwner(@ParamId() id: number) {
    return this.findHotelByOwnerService.findByOwner(id);
  }

  @Get('name')
  findName(@Query('name') name: string) {
    return this.findHotelByNameService.findByName(name);
  }
  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findOnehotelsService.findOne(id);
  }

  @Patch(':id')
  update(@ParamId() id: number, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updatehotelsService.update(id, updateHotelDto);
  }

  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.removeHotelsServoce.remove(id);
  }
}
