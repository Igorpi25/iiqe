<template>
    <div class="quiz-container">
      <h2>Lesson 1</h2>
      <p>Lesson topic</p>
      <div class="question" v-for="(q, index) in quiz" :key="index">
        <div v-if="qIndex===index" v-html="q.question"></div>
        <div class="" @click="next">
          <div class="answer" v-for="a in q.answers">
            <label v-if="qIndex===index" for="index">
              <input type="radio" :name="index" :value="a.correct">
                {{ a.literal }} {{ a.text }}
            </label>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      qIndex: 0,
      quiz: [
          {
            question:
              `Which of the following statements concerning risk are correct?
                <br>
                i. All risks are insurable <br>
                ii. Not all risk are commerically insurable <br>
                iii. The only remedy for any kind of risk is insurance <br>
                iv. Insurers may use the work risk with other meanings`,
              answers: [
                {
                  text: "i and ii",
                  literal: "a"
                },
                {
                  text: "ii and iii",
                  literal: "b"
                },
                {
                  text: "ii and iv",
                  literal: "c",
                  correct: true
                },
                {
                  text: "iii and iv",
                  literal: "d"
                }
              ]

            },
            {
            question:
                `Risk may be described as the uncertainty concerning a potential loss.
                Which of the following potential losses are insurable?`,
            answers: [
              {
                text: "iFinancial and Physical",
                literal: "a",
                correct: true
              },
              {
                text: "Emotional and Physical",
                literal: "b"
              },
              {
                text: "Emotional and Financial",
                literal: "c",
              },
              {
                text: "inancial , Physical and Emotional",
                literal: "d"
              }
          ]
        }
      ]
    }
  },
  methods: {
    next(e) {
      console.log(e.target)
      if(e.target.value == true)
        this.qIndex++
    }
  }
}
</script>
