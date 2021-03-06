import { Question } from '../../../src/typeorm/entities'

function createQuestion({
	id,
	content,
	answers = [],
}: {
	id?: number
	content: string
	answers?: string[]
}): Question {
	const question = new Question()

	question.id = id
	question.content = content
	question.answers = answers

	return question
}

const question1 = createQuestion({
	id: 1,
	content: '1+1은?',
})

const question2 = createQuestion({
	id: 2,
	content: '2*2는?',
})

export const questionFixtures = {
	question1,
	question2,
}
export const questions: Question[] = Object.values(questionFixtures)
