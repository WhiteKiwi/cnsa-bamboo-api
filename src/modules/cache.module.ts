import { CacheModule } from '@nestjs/common'

export function getCacheModule({ ttl = 5 } = { ttl: 5 }) {
	return CacheModule.register({ ttl })
}
