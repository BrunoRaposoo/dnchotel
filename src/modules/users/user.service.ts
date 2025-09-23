import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './domain/dto/createUser.dto';
import { UpdateUserDTO } from './domain/dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkUserExists(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if(!user) {
      throw new NotFoundException('User Not Found');
    }
  }

  async create(body: CreateUserDTO): Promise<User> {
    return await this.prisma.user.create({ data: body })
  }

  async list() {
    return await this.prisma.user.findMany();
  }

  async show(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if(!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async update(id: number, body: UpdateUserDTO) {
    await this.checkUserExists(id);
    return await this.prisma.user.update({ where: { id }, data: body });
  }

  async delete(id: number) {
    await this.checkUserExists(id)
    return await this.prisma.user.delete({ where: { id }});
  }
}
