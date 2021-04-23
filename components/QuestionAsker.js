app.component('question-asker',
{
    template:
    /*html*/
    `
    <div class="outline">
        <div class="question">
            <h1>{{ askedQuestion }}</h1>

            <form>
                <button class="leftButton">{{ optionOne }}</button>
                <button class="rightButton">{{ optionTwo }}</button>
            </form>
        </div>
        <div class="navBar">
            <a class="prevQ"><- Previous question</a>
            <a class="nextQ">Next question -></a>
        <div>
    </div>
    `,
    mounted: function () {
        this.getQuestions()
    },
    data() {
        return{
            pageIndex: 0,
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
            this.activeQuestion = this.questions[this.pageIndex]
            this.askedQuestion = this.activeQuestion.question
            this.optionOne = this.activeQuestion.option_1
            this.optionTwo = this.activeQuestion.option_2
        }
    },
})