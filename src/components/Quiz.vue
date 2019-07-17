<template>
	<div class="quiz-container-fluid">
		<div class="container">
			<h3 class="title">{{ name }}</h3>
			<p class="subtitle">Long Term Insurance Examination</p>
			<div class="question" v-for="(q, index) in quizList" :key="index">
				<div v-if="questionIndex===index">
					<div class="question-item" v-html="q.question"></div>
					<div class="answer" v-if="isCorrect&&!congrats">
						<div class="answer-item" @click="next(a)" v-for="a in q.answers" :key="a.text">
							<div>({{ a.literal }}) {{ a.text }}</div>	
						</div>
					</div>
				</div>
			</div>
			<div class="congrats" v-show="congrats">
				<div class="congrats__correct">{{ correct }}</div>
				<p>Yes!</p>
			</div>
			<div class="error" v-show="!isCorrect">
				<div class="err wrong">{{ picked }}</div>
				<div class="err correct">{{ correct }}</div>
				<div class="try-again" @click="tryAgain"><p>try again</p></div>
			</div>
			<div class="progress-bar">{{questionIndex + 1}} / {{quizList.length}}</div>
		</div>
	</div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
	props: {
		name: String,
		quizList: Array
	},
	data() {
		return {
			questionIndex: 0,
			isCorrect: true,
			congrats: false,
			correct: '',
			picked: '',	
		}
	},
	methods: {
		next(obj) {	
			this.picked = `(${obj.literal}) ${obj.text}`

			let correct = this.quizList[this.questionIndex].answers.filter(corr => corr.hasOwnProperty('correct'))
			this.correct = `(${correct[0].literal}) ${correct[0].text}`

			if(obj.hasOwnProperty('correct')) {
				this.congrats = true
				
				setTimeout(() => {
					this.congrats = false
					this.questionIndex++
				}, 1000)

				if(this.questionIndex == this.quizList.length) 
					this.questionIndex = 0
			}
			else {
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
		position: relative;

		.title, .subtitle {
			margin-top: 0;
			margin-left: 20px;
		}

		.title {
			margin-bottom: 5px;
		}

		.subtitle {
			@media (max-width: 768px) {
				font-size: 0.85rem;
			}
		}

		.question-item {
			background-color: #fff;
			box-sizing: border-box;
			padding: 20px;
			padding-right: 30%;
			margin-bottom: 20px;
			font-weight: 600;
			border-radius: 16px;
			-webkit-box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			-moz-box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);

			@media (max-width: 768px) {
				padding-right: 10px;
				font-size: 0.85rem;
			}
		}

		.answer-item {
			background-color: #fff;
			box-sizing: border-box;
			padding: 20px;
			margin-bottom: 10px;
			border-radius: 16px;
			-webkit-box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			-moz-box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			cursor: pointer;
			transition: .5s;

			@media (max-width: 768px) {
				font-size: 0.85rem;
			}

			&:hover {
				-webkit-box-shadow: 0px 0px 30px 0px rgba(50,132,229,0.2);
				-moz-box-shadow: 0px 0px 30px 0px rgba(50,132,229,0.2);
				box-shadow: 0px 0px 30px 0px rgba(50,132,229,0.2);
			}
		}

		.congrats {
			height: 600px;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			
			&__correct {
				padding: 10px 0;
				background-color: #43B136;
				color: #fff;
			}

			p {
				transform: translateY(50%);	
				font-size: 2rem;
				font-weight: 600;
				color: #43B136;
			}

			@media (max-width: 768px) {
				height: 300px;
			}
		}

		.err {
			width: 100%;
			min-height: auto;
			padding: 10px 0;
			vertical-align: middle;
			text-align: center;
			color: #fff;
		}
		.wrong {
			margin-bottom: 10px;
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

			@media (max-width: 768px) {
				height: 100px;
				line-height: 100px;
			}

			&:hover {
				color: #FF4848;
				background: rgba(100,100,100,0.1);
			}
		}
	}
	.progress-bar {
		position: absolute;
		top: 0;
		right: 20px;
	}
}


</style>

