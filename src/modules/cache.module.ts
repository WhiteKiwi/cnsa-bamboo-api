import { CacheModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { REDIS } from '../config'

export type CacheType = 'mem-cache' | 'redis'
type GetCacheModuleParameters = {
	type?: CacheType
	ttl?: number
}
const DEFAULT_GET_CACHE_MODULE_PARAMETERS: GetCacheModuleParameters = {
	type: 'mem-cache',
	ttl: 60,
}
export function getCacheModule({
	type = DEFAULT_GET_CACHE_MODULE_PARAMETERS.type,
	ttl = DEFAULT_GET_CACHE_MODULE_PARAMETERS.ttl,
}: GetCacheModuleParameters = DEFAULT_GET_CACHE_MODULE_PARAMETERS) {
	if (type === 'redis') {
		return CacheModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				ttl,
				store: redisStore,
				host: configService.get(REDIS.HOST),
				port: configService.get(REDIS.PORT),
				auth_user: configService.get(REDIS.USER),
				auth_pass: configService.get(REDIS.PASSWORD),
			}),
			inject: [ConfigService],
		})
	}

	return CacheModule.register({ ttl })
}
