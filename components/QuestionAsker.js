app.component('question-asker',
{
    template:
    /*html*/
    `
    <h2>{{ questions }}</h2>
    <p>Will anything print?</p>
    `,
    mounted: function () {
        this.getQuestions()
    },
    data() {
        return{
            questions: []
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
        }
    },
})