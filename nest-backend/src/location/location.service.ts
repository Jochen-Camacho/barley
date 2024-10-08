import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createLocationInput: CreateLocationInput): Promise<Location> {
    const location = this.locationRepository.create(createLocationInput);
    return this.locationRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async findById(id: number): Promise<Location> {
    return this.locationRepository.findOneByOrFail({ id });
  }

  async findByCityAndCountry(
    city: string,
    country: string,
  ): Promise<Location | null> {
    return this.locationRepository.findOne({ where: { city, country } });
  }
}
