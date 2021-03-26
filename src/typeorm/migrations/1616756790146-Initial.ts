import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1616756790146 implements MigrationInterface {
	name = 'Initial1616756790146'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE `questions` (`created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `updated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), `id` int UNSIGNED NOT NULL AUTO_INCREMENT, `content` varchar(500) NOT NULL, UNIQUE INDEX `IDX_dc27acebbb5c3f0d47a378a40e` (`content`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
		)
		await queryRunner.query(
			"CREATE TABLE `reports` (`created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `updated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), `id` int UNSIGNED NOT NULL AUTO_INCREMENT, `content` longtext NOT NULL, `status` enum ('REPORTED', 'APPLIED', 'DENIED') NOT NULL DEFAULT 'REPORTED', `code` varchar(10) NOT NULL, `reporter_ip` varchar(30) NOT NULL, INDEX `status_index` (`status`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
		)
		await queryRunner.query(
			'CREATE TABLE `answers` (`created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `updated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), `id` int UNSIGNED NOT NULL AUTO_INCREMENT, `question_id` int UNSIGNED NOT NULL, `answer` varchar(100) NOT NULL, UNIQUE INDEX `IDX_393e69a4091fcf8a5d7a52d861` (`answer`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
		)
		await queryRunner.query(
			'ALTER TABLE `answers` ADD CONSTRAINT `FK_677120094cf6d3f12df0b9dc5d3` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `answers` DROP FOREIGN KEY `FK_677120094cf6d3f12df0b9dc5d3`',
		)
		await queryRunner.query(
			'DROP INDEX `IDX_393e69a4091fcf8a5d7a52d861` ON `answers`',
		)
		await queryRunner.query('DROP TABLE `answers`')
		await queryRunner.query('DROP INDEX `status_index` ON `reports`')
		await queryRunner.query('DROP TABLE `reports`')
		await queryRunner.query(
			'DROP INDEX `IDX_dc27acebbb5c3f0d47a378a40e` ON `questions`',
		)
		await queryRunner.query('DROP TABLE `questions`')
	}
}
