document.addEventListener('DOMContentLoaded', (event) => {
    var imageUrl = "https://deepseacat.moe/images/foam.png";

    function createImage() {
        var img = new Image();
        img.src = imageUrl;
        img.style.position = 'absolute';
        img.style.bottom = '0px';
        img.style.left = Math.random() * window.innerWidth + 'px';
        img.style.width = Math.random() * 3 + 10 + 'px';
        img.speed = Math.random() * 3 + 2;
        img.style.zIndex = -1;
        document.body.appendChild(img);
        return img;
    }

    function moveImage(img) {
        img.style.bottom = parseInt(img.style.bottom) + (img.speed*Math.random()+2) + 'px';
        if (parseInt(img.style.bottom) > window.innerHeight) {
            document.body.removeChild(img);
        } else {
            img.style.left = parseInt(img.style.left) + Math.sin(new Date().getTime() / 100) * 0.1 + 'px';
            requestAnimationFrame(function() { moveImage(img); });
        }
    }

    function generateImages() {
        var img = createImage();
        moveImage(img);
        setTimeout(generateImages, Math.random() * 2000);
    }

    generateImages();
});
