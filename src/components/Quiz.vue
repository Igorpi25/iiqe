<template>
	<div class="quiz-container-fluid" :class="{'quiz-container-fluid--dark': isDarkMode}">
		<div class="container">
			<div>
				<h3 class="title">{{ name }}</h3>
				<p class="subtitle">{{ subtitle }}</p>
				<div class="question" v-for="(q, index) in quizList" :key="index">
					<div v-if="questionIndex===index">
						<div class="question-item" :class="{'item--dark': isDarkMode}" v-html="q.question"></div>
						<div class="answer" v-if="isCorrect&&!congrats">
							<div v-if="isRandom">
								<div class="answer-item" :class="{'item--dark': isDarkMode}" @click="next(a, idx)" v-for="(a, idx) in q.answers" :key="idx">
									<div>({{ options[idx] }}) {{ a.text }}</div>
								</div>
							</div>
							<div v-else>
								<div class="answer-item" :class="{'item--dark': isDarkMode}" @click="next(a, idx)" v-for="(a, idx) in fixPosition" :key="idx">
									<div>({{ options[idx] }}) {{ a.text }}</div>
								</div>
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

			<div class="progress-footer">
				<div class="digital">
				<div class="digital__correct" style="color:#43B136">{{ correctColor.length }}</div>
					<div class="digital__wrong" style="color:#FF4848">{{ wrongColor.length }}</div>
				</div>
				<div class="progress-bar">
					<div class="pending"
						:class="[
							{ good: correctColor.indexOf(index) !== -1 },
							{ bad: wrongColor.indexOf(index) !== -1 },
							{ current: questionIndex == index}
						]"
						v-for="(n, index) in quizList" :key="index">
					</div>
				</div>
			</div>

			<p class="copyright">&copy;Zennnn / All Rights Reserved</p>
		</div>
	</div>
</template>

<script>
import { setTimeout } from 'timers';
import IconBase from '@/components/icons/IconBase'
import IconRefresh from '@/components/icons/IconRefresh'
export default {
	components: {
		IconBase,
		IconRefresh
    },
	props: {
		name: String,
		subtitle: String,
		quizList: Array,
		progressKey: String,
		progressWrong: String,
		progressCorrect: String
	},
	data() {
		return {
			questionIndex: parseInt(localStorage.getItem(this.progressKey)) || 0,
			isCorrect: true,
			congrats: false,
			correct: '',
			picked: '',
			correctColor: JSON.parse(localStorage.getItem(`${this.progressCorrect}correct`)) || [],
			wrongColor: JSON.parse(localStorage.getItem(`${this.progressWrong}wrong`)) || [],
			options: ['a', 'b', 'c', 'd'],
			isRandom: JSON.parse(localStorage.getItem('random')) || false,
			isDarkMode: JSON.parse(localStorage.getItem('darkMode')) || false
		}
	},
	computed :{
		randomize() {
			let answers = this.quizList[this.questionIndex].answers
			return answers.sort((a, b) => Math.random() - 0.5)
		},
		fixPosition() {
			let answers = this.randomize
			let i = 0
			while(i < 4) {
				if(answers[i].fixed_position && answers[i].fixed_position -1 != i ) {
					let fixed_position_index = answers[i].fixed_position -1
					let temp = answers[i]
					answers[i] = answers[fixed_position_index]
					answers[fixed_position_index] = temp
				}else{
					i++
				}
			}
			return answers
		}
	},
	methods: {
		next(obj, optionIndex) {
			let correctIndex
			let correct = this.quizList[this.questionIndex].answers.filter((corr, index) => {
				if(corr.hasOwnProperty('correct')) {
					correctIndex = index
					return corr
				}
			})
			this.correct = `(${this.options[correctIndex]}) ${correct[0].text}`
			console.log(this.quizList[this.questionIndex].answers)
			this.picked = `(${this.options[optionIndex]}) ${obj.text}`

			if(obj.hasOwnProperty('correct')) {
				this.congrats = true
				this.isWrong = false

				this.correctColor.indexOf(this.questionIndex) === -1 &&
					this.wrongColor.indexOf(this.questionIndex) === -1 ?
					this.correctColor.push(this.questionIndex) : this.correctColor

				localStorage.setItem(`${this.progressCorrect}correct`, JSON.stringify(this.correctColor))

				setTimeout(() => {
					this.congrats = false
					this.questionIndex++

					localStorage.setItem(this.progressKey, this.questionIndex)

					if(this.questionIndex === this.quizList.length) {
						this.questionIndex = 0

						localStorage.removeItem(this.progressKey)
						localStorage.removeItem(`${this.progressWrong}wrong`)
					}
				}, 1600)
			}
			else {
				this.isCorrect = false
				this.wrongColor.indexOf(this.questionIndex) === -1 ?
					this.wrongColor.push(this.questionIndex) : this.wrongColor

				localStorage.setItem(`${this.progressWrong}wrong`, JSON.stringify(this.wrongColor))
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
	padding: 20px;
	background-color: #F5F6FC;

	.container {
		max-width: 800px;
		height: 100vh;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: left;
		position: relative;

		@media (max-height: 567px) {
			height: 100%;
		}

		.title, .subtitle {
			margin-top: 0;
			margin-left: 20px;
		}

		.title {
			margin-bottom: 5px;
		}

		.subtitle {
			font-family: 'SFProDisplay-Light', 'sans-serif';

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
			font-weight: bold;
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

		.item--dark {
			background-color: #333333;
			color: #F5F6FC;
		}

		.congrats {
			height: 200px;
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
			height: 200px;
			line-height: 200px;
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
		grid-column-gap: 5px;
		grid-row-gap: 5px;

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

	.copyright {
        font-family: 'MyriadPro-Regular', 'sans-serif';
        font-size: 1rem;
		max-width: 800px;
		margin-bottom: 0;
		text-align: center;


        @media (max-width: 768px) {
            font-size: 0.75rem;
        }
    }
}

.quiz-container-fluid--dark {
	background-color: #000;
    color: #F5F6FC
}
</style>
