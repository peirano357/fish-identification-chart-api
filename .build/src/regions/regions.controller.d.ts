import { User } from '../auth/user.entity';
import { CreateRegionDto } from './dto/create-region.dto';
import { GetRegionsFilterDto } from './dto/get-regions-filter.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './region.entity';
import { RegionsService } from './regions.service';
import { ConfigService } from '@nestjs/config';
export declare class RegionsController {
    private regionService;
    private configService;
    private logger;
    constructor(regionService: RegionsService, configService: ConfigService);
    createRegion(createRegionDto: CreateRegionDto, user: User): Promise<Region>;
    deleteRegion(id: string, user: User): Promise<void>;
    updateRegion(id: string, updateRegionDto: UpdateRegionDto, user: User): Promise<Region>;
    getRegions(filterDto: GetRegionsFilterDto): Promise<Region[]>;
    getRegionById(id: string): Promise<Region>;
}
