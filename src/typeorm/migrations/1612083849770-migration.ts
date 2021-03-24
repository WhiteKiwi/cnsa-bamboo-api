import { MigrationInterface, QueryRunner } from 'typeorm'

export class migration1612083849770 implements MigrationInterface {
	name = 'migration1612083849770'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'DROP INDEX `IDX_03d214f92d9f3788afa3d6c6cb` ON `questions`',
		)
		await queryRunner.query(
			'DROP INDEX `IDX_e05765efbd271985fbd7c705c6` ON `questions`',
		)
		await queryRunner.query(
			'DROP INDEX `IDX_389de02a0af9f716bfc59af019` ON `reports`',
		)
		await queryRunner.query(
			'DROP INDEX `IDX_dab4d78b3be05c1ca4a626f57f` ON `reports`',
		)
		await queryRunner.query(
			'DROP INDEX `IDX_fd92c56e473da3bae8cfd96074` ON `reports`',
		)
		await queryRunner.query(
			'ALTER TABLE `reports` ADD `code` varchar(10) NOT NULL',
		)
		await queryRunner.query(
			'CREATE INDEX `content_index` ON `questions` (`content`)',
		)
		await queryRunner.query(
			'CREATE INDEX `created_at_index` ON `questions` (`created_at`)',
		)
		await queryRunner.query(
			'CREATE INDEX `updated_at_index` ON `questions` (`updated_at`)',
		)
		await queryRunner.query(
			'CREATE INDEX `status_index` ON `reports` (`status`)',
		)
		await queryRunner.query(
			'CREATE INDEX `reported_at_index` ON `reports` (`reported_at`)',
		)
		await queryRunner.query(
			'CREATE INDEX `updated_at_index` ON `reports` (`updated_at`)',
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP INDEX `updated_at_index` ON `reports`')
		await queryRunner.query('DROP INDEX `reported_at_index` ON `reports`')
		await queryRunner.query('DROP INDEX `status_index` ON `reports`')
		await queryRunner.query('DROP INDEX `updated_at_index` ON `questions`')
		await queryRunner.query('DROP INDEX `created_at_index` ON `questions`')
		await queryRunner.query('DROP INDEX `content_index` ON `questions`')
		await queryRunner.query('ALTER TABLE `reports` DROP COLUMN `code`')
		await queryRunner.query(
			'CREATE INDEX `IDX_fd92c56e473da3bae8cfd96074` ON `reports` (`updated_at`)',
		)
		await queryRunner.query(
			'CREATE INDEX `IDX_dab4d78b3be05c1ca4a626f57f` ON `reports` (`status`)',
		)
		await queryRunner.query(
			'CREATE INDEX `IDX_389de02a0af9f716bfc59af019` ON `reports` (`reported_at`)',
		)
		await queryRunner.query(
			'CREATE INDEX `IDX_e05765efbd271985fbd7c705c6` ON `questions` (`updated_at`)',
		)
		await queryRunner.query(
			'CREATE INDEX `IDX_03d214f92d9f3788afa3d6c6cb` ON `questions` (`created_at`)',
		)
	}
}
