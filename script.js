const saveButton = document.getElementById("save-letter");
const letterInput = document.getElementById("letter-input");
const lettersList = document.getElementById("letters-list");

// 将信件内容分成多个部分
const letterParts = [
    "親愛的可維，生日快樂。",
    "你的禮物我苦思冥想許久，某天翻看我們照片的時候發現我們2020年聖誕在新加坡河搭觀光船，而上個月的情人節我們在金沙門前和新加坡河合影。觀光船需在克拉碼頭搭乘，繞一圈到金沙附近然後再回去。今年是很美麗的年，2025，一個漂亮的平方數。而我們花了四年半，也從河的那頭走到這頭，這是比2025這個數字更美麗的事。",
    "我們從19年認識到現在，今年會是整整六週年。六年，也是我們的年齡差。我們初識時你24歲，今年十二月我終於也要24了。寫下這些文字的時候我不禁有些恍惚，感嘆時間的飛逝。轉而再想，我們中間雖說有分開的時間，但戀愛時長總和已經快36個月。在你三十歲的這天，我們緊密相連地交互了你目前生命中十分之一的時長，而我們命運的紅線已佔據你人生的五分之一。",
    "你之前告訴我你對現狀很滿意，三十而立。我也衷心爲你感到開心和驕傲。你的輝煌才剛開始，我會一直爲你應援，見證你邁向偉大。",
    "我愛你"
];

// 用来跟踪当前显示到哪一部分
let currentPartIndex = 0;

// 加载本地存储的信件
window.onload = () => {
    const savedLetters = JSON.parse(localStorage.getItem("letters")) || [];
    savedLetters.forEach(addLetter);
    
    // 如果没有信件内容，则开始显示第一个信件
    if (savedLetters.length === 0 && currentPartIndex < letterParts.length) {
        letterInput.value = letterParts[currentPartIndex];
        currentPartIndex++;
    }
};

// 添加信件到列表
function addLetter(letterContent) {
    const listItem = document.createElement("li");
    const editButton = document.createElement("button");
    editButton.textContent = "編輯";

    listItem.textContent = letterContent;
    listItem.appendChild(editButton);

    editButton.addEventListener("click", () => {
        letterInput.value = listItem.firstChild.textContent;
        listItem.remove();
        saveLettersToLocalStorage();
    });

    lettersList.appendChild(listItem);
}

// 保存信件到本地存储
function saveLettersToLocalStorage() {
    const letters = Array.from(lettersList.children).map(li => li.firstChild.textContent);
    localStorage.setItem("letters", JSON.stringify(letters));
}

// 按钮事件：保存信件
saveButton.addEventListener("click", () => {
    const letterContent = letterInput.value.trim();

    if (letterContent) {
        addLetter(letterContent);
        saveLettersToLocalStorage();
        letterInput.value = "";
        playSound();
        
        // 显示下一个信件部分
        if (currentPartIndex < letterParts.length) {
            letterInput.value = letterParts[currentPartIndex];
            currentPartIndex++;
        }
    } else {
        alert("請寫下內容再保存。");
    }
});

// 播放音效
function playSound() {
    const audio = new Audio("https://example.com/coin-sound.mp3"); // 替换为实际的音效 URL
    audio.play();
}

