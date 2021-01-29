import { CallbackPipe } from './callback-pipe'

export const upperCasePipe = new CallbackPipe((value) =>
	(value || '').toUpperCase(),
)
