import { Module } from '@nestjs/common';
import { HotelsController } from './infra/hotels.controller';
import { CreateHotelsService } from './services/createHotels.service';
import { FindAllHotelsService } from './services/findAllHotel.service';
import { FindOneHotelsService } from './services/findOneHotel.service';
import { RemoveHotelsService } from './services/removeHotel.service';
import { UpdateHotelsService } from './services/updateHotel.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HOTEL_REPOSITORY_TOKEN } from './utils/repositoriesToken';
import { HotelsRepositories } from './infra/hotels.repository';
import { FindByOwnerHotelService } from './services/findbyownerhotel.service';
import { FindByNameHotelService } from './services/findByNameHotel.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelsService,
    FindAllHotelsService,
    FindOneHotelsService,
    RemoveHotelsService,
    UpdateHotelsService,
    FindByOwnerHotelService,
    FindByNameHotelService,
    {
      provide: HOTEL_REPOSITORY_TOKEN,
      useClass: HotelsRepositories,
    },
  ],
})
export class HotelsModule {}
