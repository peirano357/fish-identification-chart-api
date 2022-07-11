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
exports.Spot = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../auth/user.entity");
const critter_entity_1 = require("../critters/critter.entity");
const typeorm_1 = require("typeorm");
let Spot = class Spot {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Spot.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Spot.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Spot.prototype, "critterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Spot.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Spot.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Spot.prototype, "spottedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    (0, swagger_1.ApiProperty)({ type: user_entity_1.User }),
    __metadata("design:type", user_entity_1.User)
], Spot.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => critter_entity_1.Critter, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'critterId', referencedColumnName: 'id' }),
    (0, swagger_1.ApiProperty)({ type: critter_entity_1.Critter }),
    __metadata("design:type", critter_entity_1.Critter)
], Spot.prototype, "critter", void 0);
Spot = __decorate([
    (0, typeorm_1.Entity)('spot')
], Spot);
exports.Spot = Spot;
//# sourceMappingURL=spot.entity.js.map