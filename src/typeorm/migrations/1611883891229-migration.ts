import { MigrationInterface, QueryRunner } from 'typeorm'

export class migration1611883891229 implements MigrationInterface {
	name = 'migration1611883891229'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			"CREATE TABLE `reports` (`id` varchar(36) NOT NULL, `content` longtext NOT NULL, `status` enum ('REPORTED', 'APPLIED', 'DENIED') NOT NULL DEFAULT 'REPORTED', `reporter_ip` varchar(30) NOT NULL, `reported_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB",
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE `reports`')
	}
}
