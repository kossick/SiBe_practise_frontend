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
            <a class="prevQ">&lt- Previous question</a>
            <a class="nextQ">Next question -></a>
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
            console.log('Does this work?');
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
            this.activeQuestion = this.questions[pageIndex]
            this.askedQuestion = this.activeQuestion.question
            this.optionOne = this.activeQuestion.option_1
            this.optionTwo = this.activeQuestion.option_2
        },
        updateAnswer(answer) {
            let response = {
                question: this.askedQuestion,
                answer: answer
            }

            this.answer = answer;

            console.log(response);
        }
    },
})