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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateEmployeeInput = class CreateEmployeeInput {
};
exports.CreateEmployeeInput = CreateEmployeeInput;
__decorate([
    (0, class_validator_1.IsAlpha)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateEmployeeInput.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsAlpha)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateEmployeeInput.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateEmployeeInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateEmployeeInput.prototype, "job", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateEmployeeInput.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateEmployeeInput.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateEmployeeInput.prototype, "base", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateEmployeeInput.prototype, "variable", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateEmployeeInput.prototype, "bonus", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateEmployeeInput.prototype, "benefits", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateEmployeeInput.prototype, "equity", void 0);
exports.CreateEmployeeInput = CreateEmployeeInput = __decorate([
    (0, graphql_1.InputType)()
], CreateEmployeeInput);
//# sourceMappingURL=create-employee.input.js.map