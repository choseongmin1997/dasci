const url = 'https://mytravelerstyle.netlify.app/';

function copyToClipboard() {
  const t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = url;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
}
function copy() {
  copyToClipboard('Hello World');
  console.log('Copied!');
}


function setShare() {
  var resultImg = document.querySelector('#resultImg');
  var resultAlt = resultImg.firstElementChild.alt;
  const shareTitle = '여행성향 확인하기';
  const shareDes = infoList[resultAlt].name;
  const shareImage = url + 'img/' + resultAlt + '.jpg';
  const shareURL = url + 'page/result-' + resultAlt + '.html';

  Kakao.Link.sendDefault({
  objectType: 'feed',
  content: {
    title: shareTitle,
    description: shareDes,
    imageUrl:
      shareImage,
    link: {
      mobileWebUrl: shareURL,
      webUrl: shareURL
    },
  },
  buttons: [
    {
      title: shareTitle,
      link: {
        mobileWebUrl: shareURL,
      },
    }
  ]
});
}
