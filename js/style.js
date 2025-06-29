// ランダムな角度にする
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.hair-name-list a h3');

    elements.forEach(element => {
        const rotation = Math.floor(Math.random() * 21) - 10; // -10° から +10°のランダムな角度
        const randomX = Math.floor(Math.random() * 21) - 10; // -10pxから+10pxのランダムX移動

        element.classList.add('random');
        element.style.transform = `rotate(${rotation}deg) translateX(${randomX}px)`;
    });
});

// 画像クリックイベント
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("img01");
var closeBtn = document.getElementsByClassName("close")[0];


var images = document.querySelectorAll(".modal-img");
images.forEach(function (img) {
    img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
});

closeBtn.onclick = function () {
    modal.style.display = "none";
}
