"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrittersModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const critters_controller_1 = require("./critters.controller");
const critters_repository_1 = require("./critters.repository");
const critters_service_1 = require("./critters.service");
let CrittersModule = class CrittersModule {
};
CrittersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([critters_repository_1.CrittersRepository]),
            auth_module_1.AuthModule,
        ],
        controllers: [critters_controller_1.CrittersController],
        providers: [critters_service_1.CrittersService],
    })
], CrittersModule);
exports.CrittersModule = CrittersModule;
//# sourceMappingURL=critters.module.js.map