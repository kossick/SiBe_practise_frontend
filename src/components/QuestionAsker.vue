<template>
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
                &lt;- Previous question
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
</template>

<script>
export default {
    name: 'QuestionAsker',
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
    methods: { 
        async getQuestions() {
            const response = await fetch("https://sibe-practise-backend.herokuapp.com/questions/view", {
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
            this.answer = answer;
            this.submitAnswer();
        },
        async submitAnswer() {
            const response = await fetch("https://sibe-practise-backend.herokuapp.com/questions/submitanswer", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 'question': this.pageIndex + 1, 'answer': this.answer })
            });

            const data = await response.json();
            console.log(data);
        },
        incrementIndex(step=1) {
            this.pageIndex += step;
            this.updateInformation(this.pageIndex);
        }
    }
}
</script>

<style>
body{
background-color: rgb(36, 129, 198);
font-family: Arial, Helvetica, sans-serif;
}

div.question {
    display: flex;
    align-items: center;
}

div.question h1 {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -75%);
    color: rgb(33, 37, 41);
    padding-bottom: 25px;
}

div.question div.choices {
    position: absolute;
    bottom: 45%;
    left: 50%;
    transform: translate(-50%, 75%);
    padding-top: 25px;
    padding-bottom: 25px;
}

button {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: white;
    border: none;
    padding: 15px 75px;
    border-radius: 4px;
    font-size: 10px;
    transition-duration: 0.3s;
}

button.leftButton {
    background-color: rgb(32, 201, 151);
}

button.leftButton:hover {
    background-color: rgb(23, 152, 114);
}

button.rightButton {
    margin-left: 100px;
    background-color: rgb(220, 53, 69);
}

button.rightButton:hover {
    background-color: rgb(189, 33, 48);
}

div.navBar {
    position: absolute;
    bottom: 25%;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 450px;
    display: flex;
    align-items: center;
    font-size: 10px;
    padding-top: 25px;
}

div.navBar button.navButton {
    position: absolute;
    padding: 10px 30px;
}

#prevQ {
    left: -15%;
    background-color: tomato;
}

#nextQ {
    right: -15%;
    background-color: teal;
}

.disabledButton {
    background-color: rgb(65, 154, 220);
    cursor: not-allowed;
}

p.info {
    position: absolute;
    bottom: 5%;
}
</style>