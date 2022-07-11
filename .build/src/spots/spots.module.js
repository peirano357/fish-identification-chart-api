"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const regions_module_1 = require("../regions/regions.module");
const users_repository_1 = require("../auth/users.repository");
const spots_controller_1 = require("./spots.controller");
const spots_repository_1 = require("./spots.repository");
const spots_service_1 = require("./spots.service");
const critters_repository_1 = require("../critters/critters.repository");
const critters_regions_repository_1 = require("../critters-region/critters-regions.repository");
const purchases_repository_1 = require("../purchases/purchases.repository");
let SpotsModule = class SpotsModule {
};
SpotsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            regions_module_1.RegionsModule,
            typeorm_1.TypeOrmModule.forFeature([
                spots_repository_1.SpotsRepository,
                critters_regions_repository_1.CrittersRegionsRepository,
                purchases_repository_1.PurchasesRepository,
                critters_repository_1.CrittersRepository,
                users_repository_1.UsersRepository,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [spots_controller_1.SpotsController],
        providers: [spots_service_1.SpotsService],
    })
], SpotsModule);
exports.SpotsModule = SpotsModule;
//# sourceMappingURL=spots.module.js.map