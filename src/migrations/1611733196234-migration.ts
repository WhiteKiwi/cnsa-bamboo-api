import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1611733196234 implements MigrationInterface {
    name = 'migration1611733196234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `report` (`id` varchar(36) NOT NULL, `content` longtext NOT NULL, `status` enum ('REPORTED', 'APPLIED', 'DENIED') NOT NULL DEFAULT 'REPORTED', `reportedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `report`");
    }

}
