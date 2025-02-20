import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    // Verifica o cache e trata o caso de null/undefined
    const citiesCache: CityEntity[] | null = await this.cacheManager.get(
      `state_${stateId}`,
    );

    if (citiesCache) {
      return citiesCache;
    }

    const cities = await this.cityRepository.find({
      where: {
        stateId,
      },
    });

    await this.cacheManager.set(`state_${stateId}`, cities);

    return cities;
  }
}
