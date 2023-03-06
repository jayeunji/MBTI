// 상수로 선언
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult() {  // 선택한 답변들의 배열(select)에서 가장 많은 값을 가진 인덱스를 반환
  // select 배열에서 가장 큰 값을 구하기
  // ...은 전개 연산자로, select 배열을 펼쳐서 인수로 전달
  // Math.max(...select)는 select 배열의 가장 큰 값을 반환
  // select.indexOf()는 select 배열에서 가장 큰 값의 인덱스를 찾는 메서드
  // select.indexOf(Math.max(...select))는 select 배열에서 가장 큰 값을 가진 인덱스를 반환
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult() {  // 결과에 따른 정보를 보여주는 화면
  // 가장 큰 값을 가진 인덱스를 point 변수에 저장
  let point = calResult();
  const resultName = document.querySelector(".resultName");
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement("img");
  const imgDiv = document.querySelector("#resultImg");
  var imgURL = "img/image-" + point + ".png";

  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  var resultDesc = document.querySelector(".resultDesc");
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
  // 애니메이션을 적용하여 화면을 사라지게 한다
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    // 애니메이션을 적용하여 화면을 나타나게 한다
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450)
  }) // 여기는 ms 설정 안 하는 건지 확인해 보기
  setResult();
  calResult();
}

function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector(".answerBox");
  // 버튼 생성
  var answer = document.createElement("button");
  // answer 요소의 클래스 속성값과 내용을 추가
  answer.classList.add("answerList");
  answer.classList.add("my-3");
  answer.classList.add("py-3");
  answer.classList.add("mx-auto");
  answer.classList.add("fadeIn");
  answer.style.color = "black";
  // answer이 a의 자식이 될 수 있도록 만들기
  a.appendChild(answer);
  answer.innerHTML = answerText;

  // 버튼 하나를 클릭했을 때
  answer.addEventListener("click", function () {
    var children = document.querySelectorAll(".answerList");
    for (let i = 0; i < children.length; i++) {
      // 버튼 비활성화
      // answerList 클래스를 가진 모든 요소들을 찾아 비활성화하고, 페이드아웃 효과
      children[i].disable = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    // 0.45초 뒤에 실행
    setTimeout(() => {
      // 배열 변수 target
      var target = qnaList[qIdx].a[idx].type;
      // target의 길이만큼 반복문을 돌며 select 객체의 해당 프로퍼티를 1씩 증가
      // 선택한 버튼에 따라 각 type에 해당하는 select 배열에 점수 1씩 부여
      for (let i = 0; i < target.length; i++) {
        select[target[i]] += 1;
      }
      // 모든 버튼 요소 display none 처리
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = "none";
      }
      goNext(++qIdx);
    }, 450)
  }, false);
}

/* addAnswer 함수는 HTML 문서에서 버튼을 생성하고, 
버튼 클릭 이벤트에 대한 이벤트 핸들러를 등록하는 기능을 담당 */

function goNext(qIdx) {
  // 현재 질문의 인덱스가 endPoint와 같으면, goResult() 함수 호출
  if (qIdx === endPoint) {
    goResult();
    return;
  }
  var q = document.querySelector(".qBox");
  // qnaList 배열에서 qIdx에 해당하는 질문의 q 속성 값을 가져와서 qBox 요소의 내용으로 설정
  // 쉽게) 리스트 배열에서 해당 인덱스의 질문 가져와서 HTML 요소(qBox) 변경해 주기
  q.innerHTML = qnaList[qIdx].q;
  // i는 qnaList[qIdx].a 배열의 인덱스이며, 배열의 길이만큼 반복한다
  for (let i in qnaList[qIdx].a) {
    // qnaList[qIdx].a 배열에서 i번째 요소를 의미하며,
    // 이 요소의 answer 값을 매개변수로 받는다
    // a 속성 안에 있는 각 답변들의 answer 속성 값을 출력
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  // 전체 질문 수(endPoint)와 현재 질문의 인덱스(qIdx)를 이용하여 계산
  var status = document.querySelector(".statusBar");
  status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
}

// 시작하기 버튼을 눌렀을 때
// main을 fadeOut 1초 동안 실행한 후, qna 1초 동안 fadeIn 되며 그 후 main display는 none 처리한 후 qna display는 block 처리한 뒤 qIdx 선언하며 0으로 초기화
function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  // 만료된 후 함수나 지정한 코드 조각을 실행하는 타이머를 설정
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
      // delay 주어진 함수 또는 코드를 실행하기 전에 기다릴 밀리초 단위 시간
    }, 450)
    let qIdx = 0;
    // goNext() 함수 호출
    goNext(qIdx);
  }, 450);
}

/* 함수가 실행되면, "main" 요소의 WebkitAnimation 및 animation 속성을 이용하여 "fadeOut" 애니메이션 효과를 적용합니다.
이후 1초(1000ms)가 지난 후, "qna" 요소의 WebkitAnimation 및 animation 속성을 이용하여 "fadeIn" 애니메이션 효과를 적용합니다.
이때 "setTimeout" 함수를 이용하여 450ms(0.45초) 이후에 "main" 요소를 숨기고 "qna" 요소를 보여주는 코드를 실행합니다. */