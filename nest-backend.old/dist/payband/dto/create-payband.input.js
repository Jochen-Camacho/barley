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
exports.CreatePaybandInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const department_entity_1 = require("src/department/entities/department.entity");
const job_entity_1 = require("src/job/entities/job.entity");
let CreatePaybandInput = class CreatePaybandInput {
};
exports.CreatePaybandInput = CreatePaybandInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreatePaybandInput.prototype, "departmentId", void 0);
__decorate([
    (0, graphql_1.Field)(() => department_entity_1.Department),
    __metadata("design:type", department_entity_1.Department)
], CreatePaybandInput.prototype, "department", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreatePaybandInput.prototype, "jobId", void 0);
__decorate([
    (0, graphql_1.Field)(() => job_entity_1.Job),
    __metadata("design:type", job_entity_1.Job)
], CreatePaybandInput.prototype, "job", void 0);
exports.CreatePaybandInput = CreatePaybandInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePaybandInput);
//# sourceMappingURL=create-payband.input.js.map