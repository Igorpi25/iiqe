<template>
	<div class="quiz-container-fluid">
		<div class="container">
			<h2>Lesson 1</h2>
			<p>Lesson topic</p>
			<div class="question" v-for="(q, index) in quiz" :key="index">
				<div class="question-item" v-if="questionIndex===index" v-html="q.question"></div>
				<div @click.prevent="next" v-if="isCorrect">
					<div class="answer" v-for="a in q.answers" :key="a.text">
						<label v-if="questionIndex===index">
							<input type="radio" :name="index" :value="a.correct" />({{ a.literal }}) {{ a.text }}						
						</label>
					</div>
				</div>
			</div>
			<div v-show="!isCorrect">
				<div class="wrong">{{ picked }}</div>
				<div class="correct">{{ correct }}</div>
				<p>try again</p>
			</div>
		</div>
	</div>
</template>

<script>
import { quiz as quizList } from "../quizList"
export default {
	data() {
		return {
			questionIndex: 0,
			isCorrect: true,
			correct: '',
			picked: null,	
			quiz: quizList,
		}
	},
	methods: {
		next(e) {
			if (e.target.value) { 
				this.questionIndex++
			}
			else {
				this.isCorrect = false
			}  

			this.picked = e.target.innerText

			let correct = this.quiz[this.questionIndex].answers.filter(corr => corr.hasOwnProperty('correct'))
			this.correct = `(${correct[0].literal}) ${correct[0].text}`
		}
	}
}
</script>

<style lang="scss">
html, body {
	margin: 0;
	overflow: hidden;
}
.quiz-container-fluid {
	width: 100vw;
	height: 100vh;
	padding: 20px;	
	background-color: #F5F6FC;

	.container {
		max-width: 800px;
		margin: auto;
		text-align: left;

		.question-item {
			max-width: 100%;
			background-color: #fff;
			box-sizing: border-box;
			padding: 16px;
		}
	}
}

.wrong {
	background-color: rgb(235, 43, 43);
}
.correct {
	background-color: rgb(43, 235, 53);
}
</style>

