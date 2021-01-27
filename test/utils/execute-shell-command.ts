import { exec } from 'child_process'

export function executeShellCommand(command: string): Promise<string> {
	return new Promise<string>((resolve) => {
		exec(command, (error, stdout, stderr) => {
			resolve((stdout || stderr).trim())
		})
	})
}
