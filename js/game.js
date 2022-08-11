// PERGUNTAS
let askedQuestions = [];
const questions = [
    {
        question: "📅Quais dessas linguagens não são linguagens de programação?",
        answers: ["🧑‍💻HTML", "🧑‍💻TypeScript", "🧑‍💻JavaScript", "🧑‍💻C#"],
        correct: "answer0"
    },
    {
        question: "1️⃣Qual desses é o nome do primeiro computador do mundo?",
        answers: ["💻ENIAC", "💻Mactosh", "💻Motolix", "💻Apple ||"],
        correct: "answer0"
    },
    {
        question: "O que é a internet?",
        answers: ["🖥️Uma central de servidores", "🖥️Uma rede mundial de computadores", "🖥️Um ecossistema elétrico", "🖥️Um único servidor global"],
        correct: "answer1"
    },
    {
        question: "📏Quais memórias dessas listadas são as mais velozes?",
        answers: ["SSD / HDD", "Memórias RAMs", "Cachês", "Armazenamento Primário?"],
        correct: "answer2"
    },
    {
        question: "❓Qual é o significado de HTML?",
        answers: ["📔HyperText Marked Language", "📔Hyper Markup Language", "📔HyperText Markuping Language", "📔HyperText Markup Language"],
        correct: "answer3"
    } 
];

let numberQuestions = questions.length - 1;
generateQuestions(numberQuestions);

// END

// GERAR PERGUNTAS E ORDENS DE RESPOSTAS ALEATÓRIAS
function generateQuestions(maxQuestions) {
    let random = (Math.random() * maxQuestions).toFixed(); 
    random = Number(random);

    if(!askedQuestions.includes(random)) {
        askedQuestions.push(random);
        const selectQuestion = questions[random].question;

        $('#question').html(selectQuestion);
        $('#question').attr('data-id', random);

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
            $('#mensagem').html('Você acertou todas🥳.');
            $('#status').removeClass('hidden');
            $('#quiz').addClass('hidden');
        }
    }
}

// END

//REMOVER BOTÕES SELECIONADOS
$('.answer').on('click', function() {

    if($('#quiz').attr('data-status') !== 'stop') {
        resetButtons();
        $(this).addClass('active');
    }
});

//BOTÃO DE CONFIRMAR RESPOSTA
$('#confirm').on('click', function() {
    const id = $('#question').attr('data-id');
    var correct = questions[id].correct   ;

    $('.answer').each(function() {
        if($(this).hasClass('active')){
            const selectedAnswer = $(this).attr('id');

            if(correct == selectedAnswer) {
                $('#'+selectedAnswer).removeClass('active');
                $('#'+selectedAnswer).removeClass('correct');
                nextQuestion();
            } else {
                $('#'+correct).addClass('correct');
                $('#confirm').addClass('hidden');
                $('#quiz').attr('data-status', 'stop');
                $('#'+selectedAnswer).removeClass('active');
                $('#'+selectedAnswer).addClass('error');

                setTimeout(function() {
                    gameOver();
                }, 4000);
            }
        }
    });
});


// BOTÃO DE GAME OVER
$('#gameOverError').on('click', function() {
    newGame();
});

// AVANÇAR QUESTÕES SEM REPETILAS
function nextQuestion() {
    resetButtons();
    generateQuestions(numberQuestions);
}

// NOVO JOGO
function newGame() {
    askedQuestions= [];
    resetButtons();
    $('#confirm').removeClass('hidden');
    generateQuestions(numberQuestions);
    $('#quiz').attr('data-status', 'ok');
    $('#quiz').removeClass('hidden');
    $('#status').addClass('hidden');
}

// RESETAR BOTÕES SELECIONADOS
function resetButtons() {
    $('.answer').each( function(){
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
    });
    $('.answer').each( function(){
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        }

        if($(this).hasClass('correct')) {
            $(this).removeClass('correct');
        } 
        
        if($(this).hasClass('error')){
            $(this).removeClass('error');
        }
    });
}


function gameOver() {
    $('#quiz').addClass('hidden');
    $('#mensagem').html('❌ Game Over ❌');
    $('#status').removeClass('hidden');
}