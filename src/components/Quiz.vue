<template>
	<div class="quiz-container-fluid">
		<div class="container">
			<div>
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
			<div class="counter">{{questionIndex + 1}} / {{quizList.length}}</div>

			<div class="progress-footer" v-if="!congrats && isCorrect">
				<div class="digital">
				<div class="digital__correct" style="color:#43B136">{{ correctColor.length }}</div>
					<div class="digital__wrong" style="color:#FF4848">{{ wrongColor.length }}</div>
				</div>
				<div class="progress-bar">
					<div class="pending" 
						:class="[{ good: correctColor.indexOf(index) !== -1 }, { bad: wrongColor.indexOf(index) !== -1 }, { current: questionIndex == index}]" 
						v-for="(n, index) in quizList" :key="index">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
	props: {
		name: String,
		quizList: Array,
		progressKey: String,
	},
	data() {
		return {
			questionIndex: parseInt(localStorage.getItem(this.progressKey)) || 0,
			isCorrect: true,
			congrats: false,
			correct: '',
			picked: '',	
			correctColor: JSON.parse(localStorage.getItem('correct')) || [],
			wrongColor: JSON.parse(localStorage.getItem('wrong')) || []
		}
	},
	methods: {
		next(obj) {	
			let correct = this.quizList[this.questionIndex].answers.filter(corr => corr.hasOwnProperty('correct'))
			this.correct = `(${correct[0].literal}) ${correct[0].text}`

			this.picked = `(${obj.literal}) ${obj.text}`

			if(obj.hasOwnProperty('correct')) {
				this.congrats = true
				this.isWrong = false

				this.correctColor.indexOf(this.questionIndex) === -1 && 
					this.wrongColor.indexOf(this.questionIndex) === -1 ? 
					this.correctColor.push(this.questionIndex) : this.correctColor
				
				localStorage.setItem('correct', JSON.stringify(this.correctColor))
				
				setTimeout(() => {
					this.congrats = false
					this.questionIndex++
					localStorage.setItem(this.progressKey, this.questionIndex)	
				}, 1600)

				if(this.questionIndex == this.quizList.length) {
					this.questionIndex = 0	
				}
			}
			else {
				this.isCorrect = false
				this.wrongColor.indexOf(this.questionIndex) === -1 ? 
					this.wrongColor.push(this.questionIndex) : this.wrongColor
				
				localStorage.setItem('wrong', JSON.stringify(this.wrongColor))
			}
			console.log('correct: ' + this.correctColor)
			console.log('wrong: '  + this.wrongColor)
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
		height: 90vh;
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
				padding: 12px 20px;
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
			color: #FF4848;
			font-size: 1.5rem;
			cursor: pointer;
			transition: .3s;

			@media (max-width: 768px) {
				height: 100px;
				line-height: 100px;
			}

			&:hover {
				background: rgba(100,100,100,0.1);
			}
		}
	}
	.counter {
		position: absolute;
		top: 0;
		right: 20px;
	}

	.digital {
		width: 100px;
		margin: auto;
		margin-top: 180px;
		margin-bottom: 20px;
		display: flex;
		justify-content: space-around;
		font-size: 1.5rem;
		font-weight: bold;

		@media (max-width: 768px) {
			margin-top: 20px;
		}
	}

	.progress-bar {
		// $w: 100%;
		// $k: 8px;
		// $count: 20px;
		// $alpha: calc($w / $count);
		// $delta: calc($alpha / $k * 2);
		// $beta: $delta;

		width: 100%;
		display: grid;
		grid-template-columns: repeat(20, 1fr);
		grid-template-rows: none;
		grid-column-gap: 5px;
		grid-row-gap: 5px;
		align-items: end;

		.pending, .good, .bad {
			width: 100%;
			height: 5px;
			background-color: #666666;

			@media(max-width: 768px) {
				height: 3px;
			}
		}
		.good {
			background-color: #43B136;
		}
		.bad {
			background-color: #FF4848;
		}
		.current {
			background-color: #1A8DFF;
		}
	}
}


</style>

