import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateBuildingDTO } from './dto/create-building.dto';
import { UpdateBuildingDTO } from './dto/update-building.dto';

@Injectable()
export class BuildingService {
  constructor(private readonly data: PrismaService) {}

  async getMany() {
    return await this.data.building.findMany({
      include: { appartments: true },
    });
  }

  async get(id: string) {
    return await this.data.building.findUnique({
      where: { id },
      include: { appartments: true },
    });
  }

  async create(data: CreateBuildingDTO) {
    return await this.data.building.create({
      data,
      include: { appartments: true },
    });
  }

  async update(data: UpdateBuildingDTO) {
    return await this.data.building.update({
      where: { id: data.id },
      data,
      include: { appartments:  true  },
    });
  }

  async delete(id: string) {
    return await this.data.building.delete({ where: { id } });
  }
}
