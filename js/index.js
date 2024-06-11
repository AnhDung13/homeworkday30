var btn = document.querySelector(".btn");
var action = document.querySelector(".action");
var result = document.querySelector(".result");

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();

var links = {
  youtube: "https://youtube.com",
  facebook: "https://facebook.com",
  google: "https://google.com",
  "google drive": "https://drive.google.com/drive/home",
  "google maps":
    "https://www.google.com/maps/@21.0337792,105.7882112,14z?entry=ttu",
  video: "https://www.youtube.com/results?search_query=",
  hát: "https://zingmp3.vn/tim-kiem/tat-ca?q=",
  "đường đi": "https://www.google.com/maps/search/",
  "chỉ đường tới": "https://www.google.com/maps/search/",
};

// Đặt một số thuộc tính cho việc nhận diện
recognition.continuous = false;
recognition.lang = "vi-VN"; // Sử dụng tiếng Việt
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Bắt đầu nhận diện khi màn hình được nhấp vào
btn.addEventListener("click", function () {
  recognition.start();
  action.classList.remove("success");
  action.innerHTML = "Hãy nói nội dung bạn muốn";
});

// Xử lý sự kiện kết quả
recognition.onresult = (event) => {
  var text = event.results[0][0].transcript;
  // Xử lý chuỗi văn bản để biết được người dùng vừa đọc gì
  result.style.border = "1px solid green";

  // if (links[text.toLowerCase()]) {
  // window.open(ulr + searchText, "_blank");
  // } else {
  //   result.innerHTML = `Không thực hiện được yêu cầu`;
  // }
  var keys = Object.keys(links);
  keys.forEach(function (key) {
    if (text.toLowerCase().indexOf(key) !== -1) {
      var ulr = links[key];
      var searchText = text
        .slice(text.toLowerCase().indexOf(key) + key.length)
        .trim();
      searchText = searchText.split(" ").join("+");
      window.open(ulr + searchText, "_blank");
      console.log(searchText);
      console.log(ulr);
      result.innerHTML = `${text}`;
    } else {
      result.innerHTML = `Không thực hiện được yêu cầu`;
    }
  });
  console.log(text);
};

// Dừng nhận diện khi giọng nói kết thúc
recognition.onspeechend = () => {
  recognition.stop();
  action.classList.add("success");
  action.innerHTML = "Đã nói xong. Hy vọng kết quả như ý bạn";
};
