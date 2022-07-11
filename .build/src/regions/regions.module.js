"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const regions_controller_1 = require("./regions.controller");
const regions_repository_1 = require("./regions.repository");
const regions_service_1 = require("./regions.service");
let RegionsModule = class RegionsModule {
};
RegionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([regions_repository_1.RegionsRepository]),
            auth_module_1.AuthModule,
        ],
        controllers: [regions_controller_1.RegionsController],
        providers: [regions_service_1.RegionsService],
    })
], RegionsModule);
exports.RegionsModule = RegionsModule;
//# sourceMappingURL=regions.module.js.map