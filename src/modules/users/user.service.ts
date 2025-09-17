import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkUserExists(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: Number(id) } });

    if(!user) {
      throw new NotFoundException('User Not Found');
    }
  }

  async create(body: any): Promise<User> {
    return await this.prisma.user.create({ data: body })
  }

  async list() {
    return await this.prisma.user.findMany();
  }

  async show(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: Number(id) } });

    if(!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async update(id: string, body: any) {
    await this.checkUserExists(id);
    return await this.prisma.user.update({ where: { id: Number(id)}, data: body });
  }

  async delete(id: string) {
    await this.checkUserExists(id)
    return await this.prisma.user.delete({ where: {id: Number(id) }});
  }
}
