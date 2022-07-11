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
exports.CritterRegion = void 0;
const swagger_1 = require("@nestjs/swagger");
const critter_entity_1 = require("../critters/critter.entity");
const region_entity_1 = require("../regions/region.entity");
const typeorm_1 = require("typeorm");
let CritterRegion = class CritterRegion {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CritterRegion.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CritterRegion.prototype, "critterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CritterRegion.prototype, "regionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CritterRegion.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => critter_entity_1.Critter),
    (0, typeorm_1.JoinColumn)({ name: 'critterId', referencedColumnName: 'id' }),
    (0, swagger_1.ApiProperty)({ type: critter_entity_1.Critter }),
    __metadata("design:type", critter_entity_1.Critter)
], CritterRegion.prototype, "critter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'regionId', referencedColumnName: 'id' }),
    (0, swagger_1.ApiProperty)({ type: region_entity_1.Region }),
    __metadata("design:type", region_entity_1.Region)
], CritterRegion.prototype, "region", void 0);
CritterRegion = __decorate([
    (0, typeorm_1.Entity)('critter-region')
], CritterRegion);
exports.CritterRegion = CritterRegion;
//# sourceMappingURL=critter-region.entity.js.map