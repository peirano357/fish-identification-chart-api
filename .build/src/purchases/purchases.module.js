"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const regions_module_1 = require("../regions/regions.module");
const regions_repository_1 = require("../regions/regions.repository");
const users_repository_1 = require("../auth/users.repository");
const purchases_controller_1 = require("./purchases.controller");
const purchases_repository_1 = require("./purchases.repository");
const purchases_service_1 = require("./purchases.service");
let PurchasesModule = class PurchasesModule {
};
PurchasesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            regions_module_1.RegionsModule,
            typeorm_1.TypeOrmModule.forFeature([
                purchases_repository_1.PurchasesRepository,
                regions_repository_1.RegionsRepository,
                users_repository_1.UsersRepository,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [purchases_controller_1.PurchasesController],
        providers: [purchases_service_1.PurchasesService],
    })
], PurchasesModule);
exports.PurchasesModule = PurchasesModule;
//# sourceMappingURL=purchases.module.js.map