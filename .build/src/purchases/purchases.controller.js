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
exports.PurchasesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const purchase_entity_1 = require("../purchases/purchase.entity");
const purchases_service_1 = require("../purchases/purchases.service");
let PurchasesController = class PurchasesController {
    constructor(configService, purchasesService) {
        this.configService = configService;
        this.purchasesService = purchasesService;
        this.logger = new common_2.Logger('PurchasesController');
    }
    addPurchase(purchase, user) {
        return this.purchasesService.createPurchase(purchase, user);
    }
    removeCritter(purchase, user) {
        return this.purchasesService.deletePurchase(purchase.regionId, purchase.userId, user);
    }
    getPurchasesForUser(user) {
        this.logger.verbose(`Retrieving all regions purchased by the current user.`);
        return this.purchasesService.getPurchasesByUser(user.id);
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Performs a region chart purchase for a given user. (Requires administrator credentials)',
    }),
    (0, swagger_1.ApiResponse)({
        type: purchase_entity_1.Purchase,
        isArray: false,
        status: 201,
        description: 'Region chart successfully purchased for user',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [purchase_entity_1.Purchase,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "addPurchase", null);
__decorate([
    (0, common_1.Delete)('/'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Removes a previously purchased region chart, from a given user. (Requires administrator credentials)',
    }),
    (0, swagger_1.ApiResponse)({ type: Number, isArray: false }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [purchase_entity_1.Purchase,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "removeCritter", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves a list of all purchased region charts for the current user.',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "getPurchasesForUser", null);
PurchasesController = __decorate([
    (0, common_1.Controller)('purchases'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiTags)('Purchases'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        purchases_service_1.PurchasesService])
], PurchasesController);
exports.PurchasesController = PurchasesController;
//# sourceMappingURL=purchases.controller.js.map