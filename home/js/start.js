const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const header = document.querySelector('header');
const endPoint = 11;
const select = [];
var pointArray = [0,0,0,0,0,0,0,0,0,0,0];

function calResult() {
  var factor = select[0]+select[1]+select[2]+select[5]+select[6];
  for( let i = 0; i < endPoint; i++) {
    var target = qnaList[i].a[select[i]].type2;
    for (let j = 0; j < target.length; j++) {
      pointArray[target[j]] = pointArray[target[j]]+1;
    };
  };
  var maxPoint = Math.max(...pointArray);
  var maxPoints = 0;
  var maxPointIdx = [];

  for (let i = 0; i < pointArray.length; i++) {
    if (pointArray[i] == maxPoint) {
      maxPoints = maxPoints+1;
      maxPointIdx.push(i);
    };
  };


  if (maxPoints > 1) {
    if ( factor > 3) {
      var rightIdx = maxPointIdx.length -1 ;
      var answerKey = maxPointIdx[rightIdx];
    } else {
      var answerKey = maxPointIdx[0];
    };
  } else {
    var answerKey = pointArray.indexOf(Math.max(...pointArray));
  };

  return answerKey;
};

function setResult() {
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;
  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/'+ point + '.jpg';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  const resultInfo = document.querySelector('.resultinfo');
  resultInfo.innerHTML = infoList[point].desc;

  const domPlaces = document.querySelector('.domPlaces');
  domPlaces.innerHTML = infoList[point].dom;

  const overPlaces = document.querySelector('.overPlaces');
  overPlaces.innerHTML = infoList[point].over;

}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 0.5s";
  qna.style.Animation = "fadeOut 0.5s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.Animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = 'block';
      header.style.display= "block";
    }, 200)
  }, 200);
  console.log(select);
  setResult();

}


function addAnswer(aText, qIdx, idx) {
  var a = document.querySelector('.aBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-4');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  a.appendChild(answer);
  answer.innerHTML = aText;
  answer.style.animation = 'fadeIn 0.5s';


  answer.addEventListener("click", function() {
    var children = document.querySelectorAll('.answerList');
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      select[qIdx] = parseInt(idx);
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 400)
  }, false);

}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }
  console.log(qIdx);
  var q = document.querySelector('.qBox');
  var a = document.querySelector('.aBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar')
  var statusNum = document.querySelector('.statusNum')
  status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
  statusNum.innerHTML = "Question "+(qIdx+1);
}

function begin() {
  header.style.display= "none";
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.Animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.Animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = 'block';
    }, 300)
  }, 300);
  let qIdx = 0;
  goNext(qIdx);
}
