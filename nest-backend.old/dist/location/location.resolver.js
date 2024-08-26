"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const location_service_1 = require("./location.service");
const location_entity_1 = require("./entities/location.entity");
const create_location_input_1 = require("./dto/create-location.input");
let LocationResolver = class LocationResolver {
    constructor(locationService) {
        this.locationService = locationService;
    }
    addLocation(createLocationInput) {
        return this.locationService.create(createLocationInput);
    }
    allLocations() {
        return this.locationService.findAll();
    }
};
exports.LocationResolver = LocationResolver;
__decorate([
    (0, graphql_1.Mutation)(() => location_entity_1.Location),
    __param(0, (0, graphql_1.Args)('createLocationInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_input_1.CreateLocationInput]),
    __metadata("design:returntype", void 0)
], LocationResolver.prototype, "addLocation", null);
__decorate([
    (0, graphql_1.Query)(() => [location_entity_1.Location]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocationResolver.prototype, "allLocations", null);
exports.LocationResolver = LocationResolver = __decorate([
    (0, graphql_1.Resolver)(() => location_entity_1.Location),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationResolver);
//# sourceMappingURL=location.resolver.js.map