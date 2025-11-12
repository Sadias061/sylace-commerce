let mainImg = document.getElementById("mainImg");
let smalImg = document.getElementsByClassName("small-img");

for (let i = 0; i < 4; i++) {
    smalImg[i].onclick = function () {
        mainImg.src = smalImg[i].src;
    }

}