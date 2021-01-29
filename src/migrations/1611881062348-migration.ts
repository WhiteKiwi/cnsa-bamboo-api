import { MigrationInterface, QueryRunner } from 'typeorm'

export class migration1611881062348 implements MigrationInterface {
	name = 'migration1611881062348'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `report` ADD `reporterIp` varchar(30) NOT NULL',
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE `report` DROP COLUMN `reporterIp`')
	}
}
