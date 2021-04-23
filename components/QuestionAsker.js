app.component('question-asker',
{
    template:
    /*html*/
    `
    <h1>{{ askedQuestion }}</h1>

    <form>
        <button>{{ optionOne }}</button>
        <button>{{ optionTwo }}</button>
    </form>

    `,
    mounted: function () {
        this.getQuestions()
    },
    data() {
        return{
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
            console.log('Does this work?')
            const response = await fetch("http://localhost:8080/questions/view", {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            this.questions = await response.json()
            this.activeQuestion = this.questions[1]
            this.askedQuestion = this.activeQuestion.question
            this.optionOne = this.activeQuestion.option_1
            this.optionTwo = this.activeQuestion.option_2
        }
    },
})