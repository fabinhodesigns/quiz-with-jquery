let askedQuestions = [];
const questions = [
    {
        question: "Quais dessas linguagens não são linguagens de programação?",
        answers: ["HTML", "TypeScript", "JavaScript", "C#"],
        correct: "answer0"
    },
    {
        question: "Qual desses é o nome do primeiro computador do mundo?",
        answers: ["ENIAC", "Mactosh", "Motolix", "Apple ||"],
        correct: "answer0"
    },
    {
        pergunquestionta: "O que é a internet?",
        answers: ["Uma central de servidores", "Uma rede mundial de computadores", "Um ecossistema elétrico", "Um único servidor global"],
        correct: "answer1"
    },
    {
        question: "Quais memórias dessas listadas são as mais velozes?",
        answers: ["SSD / HDD", "Memórias RAMs", "Cachês", "Armazenamento Primário?"],
        correct: "answer2"
    },
    {
        question: "Qual é o significado de HTML?",
        answers: ["HyperText Marked Language", "Hyper Markup Language", "HyperText Markuping Language", "HyperText Markup Language"],
        correct: "answer3"
    } 
];

let numberQuestions = questions.length - 1;
generateQuestions(numberQuestions);

function generateQuestions(maxQuestions) {
    let random = (Math.random() * maxQuestions).toFixed(); 
    random = Number(random);

    if(!askedQuestions.includes(random)) {
        askedQuestions.push(random);
        const selectQuestion = questions[random].question;

        $('#question').html(selectQuestion);

        for(var i = 0; i<4; i++) {
            $('#answer'+i).html(questions[random].answers[i]);
        }

        const father = $('#answers');
        const buttons = father.children();

        for(var i = 1; i < buttons.length; i++) {
            father.append(buttons.eq(Math.floor(Math.random() * buttons.length)));
        }
    } else {
        if(askedQuestions.length < numberQuestions + 1) {   
            return generateQuestions(maxQuestions);
        } else {
            console.log('Acabaram as perguntas!');
        }
    }
}