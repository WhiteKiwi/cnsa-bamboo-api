import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1620542527544 implements MigrationInterface {
	name = 'Initial1620542527544'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "questions" ("created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), "id" SERIAL NOT NULL, "content" character varying(500) NOT NULL, CONSTRAINT "UQ_dc27acebbb5c3f0d47a378a40ed" UNIQUE ("content"), CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`,
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
		await queryRunner.query(
			`CREATE TABLE "answers" ("created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), "id" SERIAL NOT NULL, "question_id" integer NOT NULL, "answer" character varying(100) NOT NULL, CONSTRAINT "answers_question_id_answer_unique_key" UNIQUE ("question_id", "answer"), CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`,
		)
		await queryRunner.query(
			`ALTER TABLE "answers" ADD CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "answers" DROP CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3"`,
		)
		await queryRunner.query(`DROP TABLE "answers"`)
		await queryRunner.query(`DROP INDEX "status_index"`)
		await queryRunner.query(`DROP TABLE "reports"`)
		await queryRunner.query(`DROP TYPE "reports_status_enum"`)
		await queryRunner.query(`DROP TABLE "questions"`)
	}
}
