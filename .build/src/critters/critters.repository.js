"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrittersRepository = void 0;
const typeorm_1 = require("typeorm");
const critter_entity_1 = require("./critter.entity");
const common_1 = require("@nestjs/common");
let CrittersRepository = class CrittersRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('CrittersRepository');
    }
    async createCritter(createCritterDto) {
        const { name, description, imageUrl } = createCritterDto;
        const critter = this.create({
            name,
            description,
            imageUrl,
        });
        await this.save(critter);
        return critter;
    }
    async getCritters(filterDto) {
        const { search } = filterDto;
        const query = this.createQueryBuilder('critter');
        if (search) {
            query.andWhere('(LOWER(critter.name) LIKE LOWER(:search) OR LOWER(critter.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        try {
            const critters = await query.getMany();
            return critters;
        }
        catch (error) {
            this.logger.error(`Failed to get critters. Filters: ${JSON.stringify(filterDto)} `, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
};
CrittersRepository = __decorate([
    (0, typeorm_1.EntityRepository)(critter_entity_1.Critter)
], CrittersRepository);
exports.CrittersRepository = CrittersRepository;
//# sourceMappingURL=critters.repository.js.map