import { LocationService } from './location.service';
import { CreateLocationInput } from './dto/create-location.input';
export declare class LocationResolver {
    private readonly locationService;
    constructor(locationService: LocationService);
    addLocation(createLocationInput: CreateLocationInput): unknown;
    allLocations(): unknown;
}
