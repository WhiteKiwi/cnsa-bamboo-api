import { CacheModule } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'

export type CacheType = 'mem-cache' | 'redis'
type GetCacheModuleParameters = {
	type: CacheType
	ttl: number
}
const DEFAULT_GET_CACHE_MODULE_PARAMETERS: GetCacheModuleParameters = {
	type: 'mem-cache',
	ttl: 5,
}
export function getCacheModule({
	type = DEFAULT_GET_CACHE_MODULE_PARAMETERS.type,
	ttl = DEFAULT_GET_CACHE_MODULE_PARAMETERS.ttl,
}: GetCacheModuleParameters = DEFAULT_GET_CACHE_MODULE_PARAMETERS) {
	if (type === 'redis') {
		return CacheModule.register({
			ttl,
			store: redisStore,
			host: 'localhost',
			port: 6379,
		})
	}

	return CacheModule.register({ ttl })
}
