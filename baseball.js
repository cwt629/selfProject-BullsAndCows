let answer = [];
const submitted = document.querySelector('form');
const howToPlay_Kor = document.getElementById('help_kor');
const howToPlay_Eng = document.getElementById('help_eng');
let strike = 0;
let ball = 0;
let try_count = 0;
let kor_opened = false; let eng_opened = false; let gotCorrect = false;

function setAnswer(){
    let i = 0;
    let rand;
    while (i < 3){
        // 0~9까지 숫자 랜덤 배정(단, 백의 자리 수는 0이 되지 않음)
        if (i == 0){
            rand = Math.floor(Math.random() * 9) + 1;
        }
        else{
            rand = Math.floor(Math.random() * 10);
        }
        
        // 중복되지 않은 경우 배정
        if (answer.indexOf(rand) < 0){
            answer[i] = rand;
            i++;
        }
    }
}

// 무작위 세자리 숫자 정하기
setAnswer();

// For Checking
/*for (let i = 0; i < 3; i++){
    console.log(`${i+1}번째 : ${answer[i]}`);
}*/

// 제출 결과를 로그에 출력하는 함수
function recordLog(first, second, third, message, try_count){
    // 로그 div 받아옴
    const logDiv = document.querySelector(".log");
    // 로그에 추가할 p 만들기
    const p = document.createElement('p');
    // 입력했던 숫자와 그에 따른 메시지를 텍스트에 입력
    p.textContent = `[TRY ${try_count}] ${first}${second}${third} : ${message}`;
    if (gotCorrect){
        p.style.color = "red";
    }
    
    // 텍스트 반영
    logDiv.appendChild(p);
}

// 제출을 누른 경우, 채점하게 된다
submitted.addEventListener('submit', function(e){
    e.preventDefault();
    let needRetry = false;
    var input = document.querySelectorAll('.input');
    let resultMessage = ``;
    
    // 이미 정답을 맞춘 경우
    if (gotCorrect){
        alert("You've got correct number already! \n이미 정답을 맞추셨습니다!");
    }
    else{
        // 입력칸이 비어있거나, 숫자가 아닌 것이 쓰여있는 경우를 걸러낸다
        for (let i = 0; i < 3; i++){
            if (input[i].value == null || input[i].value < '0' || input[i].value > '9'){
                needRetry = true;
                break;
            }
        }
        // 입력칸이 비어있거나, 숫자가 아닌 것이 쓰여있는 경우
        if (needRetry){
            alert("Please input numbers! \n숫자를 입력하세요!");
        }
        // 중복되는 숫자가 있는 경우
        else if (input[0].value == input[1].value || input[1].value == input[2].value
            || input[2].value == input[0].value){
            alert("Redundant Number is detected! \n중복된 숫자가 있습니다.");
            } 
        // 그 외의 경우, 정상적으로 작동
        else{
            // n번째 시도
            try_count++;

            for (let i = 0; i < 3; i++){
                // 숫자와 위치 일치
                if (input[i].value == answer[i]){
                    strike++;
                }
                // 숫자만 일치 - Problem!! 볼 작동이 안된다.
                /* 여기서의 경우, value가 숫자가 아닌 문자라서
                비교가 제대로 작동하지 않았다.
                그래서, 문자열을 숫자로 바꿔주는
                parseInt 함수를 사용했다. */
                else if (answer.indexOf(parseInt(input[i].value)) >= 0){
                    ball++;
                }
                // 모두 불일치(아무 일도 없다)
            }

            // 결과 출력
            if (strike == 3){
                // 정답인 경우
                resultMessage = "Congratulations! You got correct! \n축하합니다! 정답입니다!";
                for (let i = 0; i < 3; i++){
                    input[i].style.backgroundColor = 'yellowgreen';
                 }
                gotCorrect = true;
            }
            else if (strike > 0 && ball > 0){
                resultMessage = `${strike} Strike, ${ball} Ball!`;
            }
            else if (strike > 0){
                resultMessage = `${strike} Strike!`;
            }
            else if (ball > 0){
                resultMessage = `${ball} Ball!`;
            }
            else{
                resultMessage = "Out!";
            }
            // alert를 통해 메시지 출력
            alert(resultMessage);

            // 이 결과를 로그에 출력
            recordLog(input[0].value, input[1].value, input[2].value, resultMessage, try_count);

            // 각 칸 비워주기
            if (!gotCorrect){
                for (let i = 0; i < 3; i++){
                     input[i].value = "";
                }
            }
        }
    }

    // 초기화
    strike = 0;
    ball = 0;
})

// 도움말 버튼 클릭 시
howToPlay_Kor.addEventListener('click', function(){
    const korDiv = document.getElementById('howToPlay_kor');
    // 이미 열려있었다면, 닫아준다
    if (kor_opened){
        korDiv.style.display = "none";
        howToPlay_Kor.style.backgroundColor = "black";
        howToPlay_Kor.style.color = "white";
        kor_opened = false;
    }
    // 영어 도움말이 열려있지 않다면, 열어준다
    else if (!eng_opened){
        korDiv.style.display = "inline-block";
        howToPlay_Kor.style.backgroundColor = "white";
        howToPlay_Kor.style.color = "black";
        kor_opened = true;
    }
})

howToPlay_Eng.addEventListener('click', function(){
    const engDiv = document.getElementById('howToPlay_eng');
    // 이미 열려있었다면, 닫아준다
    if (eng_opened){
        engDiv.style.display = "none";
        howToPlay_Eng.style.backgroundColor = "black";
        howToPlay_Eng.style.color = "white";
        eng_opened = false;
    }
    // 한글 도움말이 열려있지 않다면, 열어준다
    else if (!kor_opened){
        engDiv.style.display = "inline-block";
        howToPlay_Eng.style.backgroundColor = "white";
        howToPlay_Eng.style.color = "black";
        eng_opened = true;
    }
})