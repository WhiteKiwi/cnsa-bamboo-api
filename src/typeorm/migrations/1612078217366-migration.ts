import { MigrationInterface, QueryRunner } from 'typeorm'

export class migration1612078217366 implements MigrationInterface {
	name = 'migration1612078217366'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE `questions` (`id` int NOT NULL AUTO_INCREMENT, `content` varchar(500) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB',
		)
		await queryRunner.query(
			'CREATE TABLE `answers` (`id` int NOT NULL AUTO_INCREMENT, `answer` varchar(100) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `question_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
		)
		await queryRunner.query(
			'ALTER TABLE `answers` ADD CONSTRAINT `FK_677120094cf6d3f12df0b9dc5d3` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `answers` DROP FOREIGN KEY `FK_677120094cf6d3f12df0b9dc5d3`',
		)
		await queryRunner.query('DROP TABLE `answers`')
		await queryRunner.query('DROP TABLE `questions`')
	}
}
