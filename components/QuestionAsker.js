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
        /*async getQuestions() {
            const response = await fetch("http://localhost:8080/pages/view", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(typeof(data))
            this.questions.value = data.parse
        }  */  
        async getQuestions() {
            return fetch("http://localhost:8080/pages/view", {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => {
                    return res.json();
                })
                .then(json => {
                    console.log(json);
                    this.questions.value = json;
                })
        }
    },
})