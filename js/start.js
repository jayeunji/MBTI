// 상수로 선언
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult() {
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult() {
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
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450)
  })
  setResult();
  calResult();
}

function adddAnswer(answerText, qIdx, idx) {
  var a = document.querySelector(".answerBox");
  var answer = document.createElement("button");
  // answer 요소의 클래스 속성값을 추가
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
      children[i].disable = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      for (let i = 0; i < target.length; i++) {
        select[target[i]] += 1;
      }
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = "none";
      }
      goNext(++qIdx);
    }, 450)
  }, false);
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }
  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    // a 속성 안에 있는 각 답변들의 answer 속성 값을 출력
    adddAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector(".statusBar");
  status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
}

// 시작하기 버튼을 눌렀을 때
function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}