import { MigrationInterface, QueryRunner } from 'typeorm'

export class migration1612080922895 implements MigrationInterface {
	name = 'migration1612080922895'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `answers` CHANGE `id` `id` int NOT NULL',
		)
		await queryRunner.query('ALTER TABLE `answers` DROP PRIMARY KEY')
		await queryRunner.query('ALTER TABLE `answers` DROP COLUMN `id`')
		await queryRunner.query(
			'ALTER TABLE `answers` ADD PRIMARY KEY (`answer`, `question_id`)',
		)
		await queryRunner.query(
			'ALTER TABLE `questions` CHANGE `content` `content` varchar(500) NOT NULL',
		)
		await queryRunner.query(
			'ALTER TABLE `questions` ADD UNIQUE INDEX `IDX_dc27acebbb5c3f0d47a378a40e` (`content`)',
		)
		await queryRunner.query(
			'ALTER TABLE `answers` DROP FOREIGN KEY `FK_677120094cf6d3f12df0b9dc5d3`',
		)
		await queryRunner.query(
			'ALTER TABLE `answers` CHANGE `question_id` `question_id` int NOT NULL',
		)
		await queryRunner.query(
			'CREATE INDEX `IDX_03d214f92d9f3788afa3d6c6cb` ON `questions` (`created_at`)',
		)
		await queryRunner.query(
			'CREATE INDEX `IDX_e05765efbd271985fbd7c705c6` ON `questions` (`updated_at`)',
		)
		await queryRunner.query(
			'ALTER TABLE `answers` ADD CONSTRAINT `FK_677120094cf6d3f12df0b9dc5d3` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `answers` DROP FOREIGN KEY `FK_677120094cf6d3f12df0b9dc5d3`',
		)
		await queryRunner.query(
			'DROP INDEX `IDX_e05765efbd271985fbd7c705c6` ON `questions`',
		)
		await queryRunner.query(
			'DROP INDEX `IDX_03d214f92d9f3788afa3d6c6cb` ON `questions`',
		)
		await queryRunner.query(
			'ALTER TABLE `answers` CHANGE `question_id` `question_id` int NULL',
		)
		await queryRunner.query(
			'ALTER TABLE `answers` ADD CONSTRAINT `FK_677120094cf6d3f12df0b9dc5d3` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		)
		await queryRunner.query(
			'ALTER TABLE `questions` DROP INDEX `IDX_dc27acebbb5c3f0d47a378a40e`',
		)
		await queryRunner.query(
			'ALTER TABLE `questions` CHANGE `content` `content` varchar(500) NOT NULL',
		)
		await queryRunner.query('ALTER TABLE `answers` DROP PRIMARY KEY')
		await queryRunner.query(
			'ALTER TABLE `answers` ADD `id` int NOT NULL AUTO_INCREMENT',
		)
		await queryRunner.query('ALTER TABLE `answers` ADD PRIMARY KEY (`id`)')
		await queryRunner.query(
			'ALTER TABLE `answers` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT',
		)
	}
}
