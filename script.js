const q=[
    {
        question:"Which is largest animal in world ?",
        answers:[
            {text:'shark',correct:'false'},
            {text:'Blue Whale',correct:'true'},
            {text:'Elephant',correct:'false'},
            {text:'Giraffe',correct:'false'}
        ]
    },
    {
        question:"Which language is the most difficult to learn ?",
        answers:[
            {text:'Python',correct:'false'},
            {text:'Javascript',correct:'true'},
            {text:'Java',correct:'false'},
            {text:'C#',correct:'false'}
        ]
    },
    {
        question:"Which is my hobby ?",
        answers:[
            {text:'watching movies',correct:'false'},
            {text:'eating while coding',correct:'true'},
            {text:'Baking',correct:'false'},
            {text:'Nothing',correct:'false'}
        ]
    }
];


const ques=document.getElementById('question');
const answerbuttons=document.getElementById('answer-buttons');
const nextbtn=document.getElementById('next-btn');

console.log(nextbtn);

let currentQuestionIndex=0;
let score=0;



function start(){
    currentQuestionIndex=0;
    score=0;
    nextbtn.innerHTML="Next";
    showQuestion();
}


function showQuestion(){
    resetstate();
    //put question
    let currentQuestion=q[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    ques.innerHTML=questionNo+ ". "+ currentQuestion.question;
    console.log(ques.innerHTML);

    //put answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);

        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetstate()
{
    nextbtn.style.display="none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedbtn=e.target;
    const iscorrect=selectedbtn.dataset.correct==="true";
    if(iscorrect)
    {
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextbtn.style.display="block";
}



nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex<q.length){
        handlenextbtn();
    }
    else
    start();
})


function handlenextbtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex<q.length){
        showQuestion();
    }
    else
    {
        showscore();
    }
}

function showscore(){
    resetstate();
    ques.innerHTML= `You have scored ${score} out of ${q.length}!`;
    nextbtn.innerHTML='Play Again';
    nextbtn.style.display='block';
}
start();