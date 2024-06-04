const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 20; //끝지점 정의(20문항)
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
//각 질문에 대한 결과를 저장할 배열 생성

function calResult(){ // 선택한 결과를 계산하는 함수 정의
  console.log(select);
  var result = select.indexOf(Math.max(...select)); // 가장 높은 점수를 가진 결과 계산
  return result;
}

function setResult(){ // 결과 설정 함수 정의
  let point = calResult(); // 선택한 결과 계산
  const resultName = document.querySelector('.resultname'); // 결과 이름을 표시할 요소 선택(16가지 이름)
  resultName.innerHTML = infoList[point].name; // 결과 이름 설정

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc'); // 결과 설명을 표시할 요소 선택 
  resultDesc.innerHTML = infoList[point].desc;// 결과 설명 설정
}

function goResult(){ // 결과 페이지로 이동하는 함수 정의
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";// qna요소 숨김
      result.style.display = "block" // result요소 표시
    }, 450)}) // 450밀리초 후에 실행
    setResult(); // setResult함수 호출
}

function addAnswer(answerText, qIdx, idx){ // 질문지 답변 박스 함수 정의
  var a = document.querySelector('.answerBox'); // 답변을 표시할 요소 선택
  a.style.display = 'flex';
  a.style.flexDirection = 'row'; // 가로 정렬
  var answer = document.createElement('button'); //답변 버튼 요소 생성
  answer.classList.add('answerList');
  answer.classList.add('my-3'); // top, buttom margin 중간정도(3)
  answer.classList.add('py-3'); // top, buttom padding 중간정도(3)
  answer.classList.add('mx-auto'); // 자동으로 요소 정렬,bootstrap제공 클래스
  answer.classList.add('fadeIn');

 
  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){ //답변버튼에 클릭이벤트 추가
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){// 모든 답변에 대해 반복
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type; //선택한 답변의 타입을 불러온다.
      for(let i = 0; i < target.length; i++){ //선택한 타입에 대해 반복
        select[target[i]] += 1; //해당 타입의 결과값을 증가시킴
      }

      for(let i = 0; i < children.length; i++){ //모든 답변 버튼에 대해 반복
        children[i].style.display = 'none'; //답변버튼 숨김
      }
      goNext(++qIdx); //다음질문으로 이동
    },450)
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){ //질문개수와 endpoint(20)이 동일해지면 결과 반환(마지막질문인경우)
    goResult(); // 결과페이지로 이동
    return;
  }

  var q = document.querySelector('.qBox'); //질문표스
  q.innerHTML = qnaList[qIdx].q; //질문 설정 1~20
  for(let i in qnaList[qIdx].a){ //질문에 대한 답변 추가(i는 5개)
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%'; // 점점 statusBar 색깔차게 만듦
}

function begin(){ // 
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block"
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}
