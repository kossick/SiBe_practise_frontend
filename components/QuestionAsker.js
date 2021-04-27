app.component('question-asker',
{
    template:
    /*html*/
    `
    <div class="outline">
        <div class="question">
            <h1>{{ askedQuestion }}</h1>

            <div class="choices">
                <button class="leftButton" 
                 @click="updateAnswer(optionOne)">
                    {{ optionOne }}
                </button>
                <button class="rightButton" 
                 @click="updateAnswer(optionTwo)">
                    {{ optionTwo }}
                </button>
            </div>
        </div>
        <div class="navBar">
            <button class="navButton" 
            id="prevQ"
            :class = "{ disabledButton: pageIndex===0 }"
            :disabled="pageIndex===0"
            @click="incrementIndex(-1)">
                &lt- Previous question
            </button>
            <button class="navButton" 
            id="nextQ"
            :class = "{ disabledButton: pageIndex===questions.length - 1 }"
            :disabled="pageIndex===questions.length - 1"
            @click="incrementIndex()">
                Next question ->
            </button>
        </div>
    </div>
    <p class="info" v-if="this.answer">{{ '{Question: ' + askedQuestion + ', Answer: ' + answer + '}' }}</p>
    `,
    mounted: function () {
        this.getQuestions()
    },
    data() {
        return{
            pageIndex: 1,
            questions: [],
            activeQuestion: '',
            askedQuestion: '',
            optionOne: '',
            optionTwo: '',
            answer: ''
    }
},
    methods:{ 
        async getQuestions() {
            const response = await fetch("http://localhost:8080/questions/view", {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            this.questions = await response.json();
            this.updateInformation(this.pageIndex);
        },
        updateInformation(pageIndex) {
            this.activeQuestion = this.questions[pageIndex];
            this.askedQuestion = this.activeQuestion.question;
            this.optionOne = this.activeQuestion.option_1;
            this.optionTwo = this.activeQuestion.option_2;
            this.answer = '';
        },
        updateAnswer(answer) {
            let response = {
                question: this.askedQuestion,
                answer: answer
            }

            this.answer = answer;
        },
        incrementIndex(step=1) {
            this.pageIndex += step;
            this.updateInformation(this.pageIndex);
        }
    },
})