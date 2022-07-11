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
exports.Purchase = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../auth/user.entity");
const region_entity_1 = require("../regions/region.entity");
const typeorm_1 = require("typeorm");
let Purchase = class Purchase {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Purchase.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Purchase.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Purchase.prototype, "regionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Purchase.prototype, "purchasedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    (0, swagger_1.ApiProperty)({ type: user_entity_1.User }),
    __metadata("design:type", user_entity_1.User)
], Purchase.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'regionId', referencedColumnName: 'id' }),
    (0, swagger_1.ApiProperty)({ type: region_entity_1.Region }),
    __metadata("design:type", region_entity_1.Region)
], Purchase.prototype, "region", void 0);
Purchase = __decorate([
    (0, typeorm_1.Entity)('purchase')
], Purchase);
exports.Purchase = Purchase;
//# sourceMappingURL=purchase.entity.js.map