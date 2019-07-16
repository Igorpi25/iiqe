<template>
	<div class="quiz-container-fluid">
		<div class="container">
			<h2 class="title">Paper 3</h2>
			<p class="subtitle">Long Term Insurance Examination</p>
			<div class="question" v-for="(q, index) in quiz" :key="index">
				<div v-if="questionIndex===index">
					<div class="question-item" v-html="q.question"></div>
					<div class="answer" v-if="isCorrect">
						<div class="answer-item"  @click="next(a)" v-for="a in q.answers" :key="a.text">
							<div>({{ a.literal }}) {{ a.text }}</div>	
						</div>
					</div>
				</div>
			</div>
			<div class="error" v-show="!isCorrect">
				<div class="err wrong">{{ picked }}</div>
				<div class="err correct">{{ correct }}</div>
				<div class="try-again" @click="tryAgain"><p>try again</p></div>
			</div>
			<div class="progress-bar">{{questionIndex}} / {{quiz.length}}</div>
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
			picked: '',	
			quiz: quizList,
		}
	},
	methods: {
		next(obj) {	
			if(obj.hasOwnProperty('correct')) {
				this.questionIndex++
				if(this.questionIndex == this.quiz.length) this.questionIndex = 0
			}
			else {
				this.picked = `(${obj.literal}) ${obj.text}`

				let correct = this.quiz[this.questionIndex].answers.filter(corr => corr.hasOwnProperty('correct'))
				this.correct = `(${correct[0].literal}) ${correct[0].text}`

				this.isCorrect = false
			}
		},
		tryAgain() {
			this.isCorrect = true
		}
	}
}
</script>

<style lang="scss">
html, body {
	margin: 0;
	overflow-x: hidden;
}
.quiz-container-fluid {
	max-width: 100vw;
	height: 100vh;
	padding: 20px;	
	background-color: #F5F6FC;

	.container {
		max-width: 800px;
		margin: auto;
		text-align: left;

		.title, .subtitle {
			margin-left: 20px;
		}

		.question-item {
			background-color: #fff;
			box-sizing: border-box;
			padding: 20px;
			padding-right: 30%;
			margin-bottom: 30px;
			font-weight: 600;
			border-radius: 16px;
			-webkit-box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			-moz-box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
		}

		.answer-item {
			background-color: #fff;
			box-sizing: border-box;
			padding: 20px;
			margin-bottom: 20px;
			border-radius: 16px;
			-webkit-box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			-moz-box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			cursor: pointer;
			transition: .5s;

			&:hover {
				-webkit-box-shadow: 0px 0px 30px 0px rgba(50,132,229,0.2);
				-moz-box-shadow: 0px 0px 30px 0px rgba(50,132,229,0.2);
				box-shadow: 0px 0px 30px 0px rgba(50,132,229,0.2);
			}
		}

		.err {
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			color: #fff;
		}
		.wrong {
			margin-bottom: 20px;
			background-color: #FF4848;
		}
		.correct {
			background-color: #43B136;
		}
		.try-again {
			height: 400px;
			line-height: 400px;
			text-align: center;
			cursor: pointer;
			transition: .3s;

			&:hover {
				color: #FF4848;
				background: rgba(100,100,100,0.1);
			}
		}

		.progress-bar {
			margin: 30px 0;
			text-align: center;
		}
	}
}


</style>

