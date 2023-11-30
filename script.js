const typing_area = document.querySelector('#textarea');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const show_sen=document.querySelector('#showSentence');
const show_time = document.querySelector('#show-time');

let startTime, endTime, totalTimeTaken;

const sentences=['The quick brown fox jumps over the lazy dog', 'The quick brown fox sleep on the lazy dog', 'The quick brown fox shorter than the lazy dog'];

const errorChecking = (words)=>{
    let num=0;
    sentence_to_write = show_sen.innerHTML;
    sentence_to_write=sentence_to_write.trim().split(" ");

    for(let i=0; i<words.length; i++){
        if (words[i] === sentence_to_write[i]) {
            num++;
        }
    }
    return num;
}

const calculateTypingSpeed=(time_taken)=>{
    let totalWords = typing_area.value.trim();
    let actualWords = totalWords === '' ? 0 : totalWords.split(" ");

    actualWords = errorChecking(actualWords);

    if(actualWords !==0){
        let typing_speed = (actualWords /  time_taken)*60;
        typing_speed = Math.round(typing_speed);
        score.innerHTML = `Your typing speed is ${typing_speed} words per minutes & you wrote ${actualWords} correct words out of ${sentence_to_write.length} & time taken ${time_taken} sec`;
    }else{
        score.innerHTML = `Your typing speed is 0 words per minutes & time taken ${time_taken} sec`;
    }
}

const endTypingTest=()=>{
    btn.innerText="Start";
    showTimer();

    let date=new Date();
    endTime=date.getTime();

    totalTimeTaken=(endTime-startTime)/1000;

    calculateTypingSpeed(totalTimeTaken);
    show_sen.innerHTML="";
    typing_area.value="";
}

let intervalID, elapsedTime=0;

const showTimer=()=>{
    if (btn.innerText === "Done") {
        intervalID=setInterval(() => {
            elapsedTime++;
            show_time.innerHTML=elapsedTime;
        }, 1000)
    }else if (btn.innerText === "Start") {
        elapsedTime=null;
        clearInterval(intervalID);
        show_time.innerHTML=elapsedTime;
    }
}

const startTyping=()=>{
    let randomNumber= Math.floor(Math.random()*sentences.length);
    show_sen.innerHTML= sentences[randomNumber]; 

    let date = new Date();
    startTime=date.getTime();

    btn.innerText="Done";

    showTimer();
}

btn.addEventListener('click', ()=>{
    switch (btn.innerText.toLowerCase()) {
        case "start":
            typing_area.removeAttribute('disabled');
            startTyping();
            break;

        case "done":
            typing_area.setAttribute('disabled','true');
            endTypingTest();
            break;

        default:
            break;
    }
})