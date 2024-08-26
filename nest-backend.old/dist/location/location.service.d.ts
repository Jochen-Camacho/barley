import { CreateLocationInput } from './dto/create-location.input';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
export declare class LocationService {
    private locationRepository;
    constructor(locationRepository: Repository<Location>);
    create(createLocationInput: CreateLocationInput): unknown;
    findAll(): unknown;
    findById(id: number): any;
    findByCityAndCountry(city: string, country: string): any;
}
