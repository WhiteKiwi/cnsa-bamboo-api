import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1620543846645 implements MigrationInterface {
	name = 'Initial1620543846645'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "questions" ("created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), "id" SERIAL NOT NULL, "content" character varying(500) NOT NULL, "answers" json NOT NULL DEFAULT '[]', CONSTRAINT "UQ_dc27acebbb5c3f0d47a378a40ed" UNIQUE ("content"), CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`,
		)
		await queryRunner.query(
			`CREATE TYPE "reports_status_enum" AS ENUM('REPORTED', 'APPLIED', 'DENIED')`,
		)
		await queryRunner.query(
			`CREATE TABLE "reports" ("created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), "id" SERIAL NOT NULL, "content" text NOT NULL, "status" "reports_status_enum" NOT NULL DEFAULT 'REPORTED', "code" character varying(10) NOT NULL, "reporter_ip" character varying(30) NOT NULL, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`,
		)
		await queryRunner.query(
			`CREATE INDEX "status_index" ON "reports" ("status") `,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "status_index"`)
		await queryRunner.query(`DROP TABLE "reports"`)
		await queryRunner.query(`DROP TYPE "reports_status_enum"`)
		await queryRunner.query(`DROP TABLE "questions"`)
	}
}
