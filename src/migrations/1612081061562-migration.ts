import { MigrationInterface, QueryRunner } from 'typeorm'

export class migration1612081061562 implements MigrationInterface {
	name = 'migration1612081061562'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'DROP INDEX `IDX_dc27acebbb5c3f0d47a378a40e` ON `questions`',
		)
		await queryRunner.query(
			'ALTER TABLE `questions` CHANGE `content` `content` varchar(500) NOT NULL',
		)
		await queryRunner.query(
			'ALTER TABLE `questions` ADD UNIQUE INDEX `IDX_dc27acebbb5c3f0d47a378a40e` (`content`)',
		)
		await queryRunner.query(
			'CREATE INDEX `IDX_dab4d78b3be05c1ca4a626f57f` ON `reports` (`status`)',
		)
		await queryRunner.query(
			'CREATE INDEX `IDX_389de02a0af9f716bfc59af019` ON `reports` (`reported_at`)',
		)
		await queryRunner.query(
			'CREATE INDEX `IDX_fd92c56e473da3bae8cfd96074` ON `reports` (`updated_at`)',
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'DROP INDEX `IDX_fd92c56e473da3bae8cfd96074` ON `reports`',
		)
		await queryRunner.query(
			'DROP INDEX `IDX_389de02a0af9f716bfc59af019` ON `reports`',
		)
		await queryRunner.query(
			'DROP INDEX `IDX_dab4d78b3be05c1ca4a626f57f` ON `reports`',
		)
		await queryRunner.query(
			'ALTER TABLE `questions` DROP INDEX `IDX_dc27acebbb5c3f0d47a378a40e`',
		)
		await queryRunner.query(
			'ALTER TABLE `questions` CHANGE `content` `content` varchar(500) NOT NULL',
		)
		await queryRunner.query(
			'CREATE UNIQUE INDEX `IDX_dc27acebbb5c3f0d47a378a40e` ON `questions` (`content`)',
		)
	}
}
