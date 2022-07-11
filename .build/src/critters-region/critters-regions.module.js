"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrittersRegionsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const critters_module_1 = require("../critters/critters.module");
const critters_repository_1 = require("../critters/critters.repository");
const regions_module_1 = require("../regions/regions.module");
const regions_repository_1 = require("../regions/regions.repository");
const critters_regions_controller_1 = require("./critters-regions.controller");
const critters_regions_repository_1 = require("./critters-regions.repository");
const critters_regions_service_1 = require("./critters-regions.service");
let CrittersRegionsModule = class CrittersRegionsModule {
};
CrittersRegionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            regions_module_1.RegionsModule,
            critters_module_1.CrittersModule,
            typeorm_1.TypeOrmModule.forFeature([
                critters_regions_repository_1.CrittersRegionsRepository,
                regions_repository_1.RegionsRepository,
                critters_repository_1.CrittersRepository,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [critters_regions_controller_1.CrittersRegionsController],
        providers: [critters_regions_service_1.CrittersRegionsService],
    })
], CrittersRegionsModule);
exports.CrittersRegionsModule = CrittersRegionsModule;
//# sourceMappingURL=critters-regions.module.js.map