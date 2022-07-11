"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesRepository = void 0;
const typeorm_1 = require("typeorm");
const purchase_entity_1 = require("./purchase.entity");
const common_1 = require("@nestjs/common");
let PurchasesRepository = class PurchasesRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('PurchasesRepository');
    }
    async createPurchase(createPurchaseDto) {
        const { userId, regionId, purchasedDate } = createPurchaseDto;
        const purchase = this.create({
            userId: userId,
            regionId: regionId,
            purchasedDate: purchasedDate,
        });
        await this.save(purchase);
        return purchase;
    }
    async getPurchasesByUser(userId) {
        const query = this.createQueryBuilder('purchase');
        if (userId) {
            query.where({ userId: userId });
        }
        try {
            const purchases = await query.getMany();
            return purchases;
        }
        catch (error) {
            this.logger.error(`Failed to get critters by region. Filters: ${JSON.stringify(userId)} `, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
};
PurchasesRepository = __decorate([
    (0, typeorm_1.EntityRepository)(purchase_entity_1.Purchase)
], PurchasesRepository);
exports.PurchasesRepository = PurchasesRepository;
//# sourceMappingURL=purchases.repository.js.map