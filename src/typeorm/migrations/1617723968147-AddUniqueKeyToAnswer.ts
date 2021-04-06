import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUniqueKeyToAnswer1617723968147 implements MigrationInterface {
	name = 'AddUniqueKeyToAnswer1617723968147'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'DROP INDEX `IDX_393e69a4091fcf8a5d7a52d861` ON `answers`',
		)
		await queryRunner.query(
			'CREATE UNIQUE INDEX `answers_question_id_answer_unique_key` ON `answers` (`question_id`, `answer`)',
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'DROP INDEX `answers_question_id_answer_unique_key` ON `answers`',
		)
		await queryRunner.query(
			'CREATE UNIQUE INDEX `IDX_393e69a4091fcf8a5d7a52d861` ON `answers` (`answer`)',
		)
	}
}
