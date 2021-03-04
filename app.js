
function getMunicipality() {
    const prefecture = document.getElementById('editPrefecture');
    const municipality = document.getElementById('editMunicipality');
    var items = [];

    if (prefecture.value == 'Aichi') {
        items = ['Komaki', 'Nagoya', 'Toyohashi', 'Toyota'];
    } else if (prefecture.value == 'Aomori') {
        items = ['Aomori', 'Hachinohe'];
    }
    console.log(prefecture.value);
    console.log(items);

    var option = "";

    for (var item of items) {
        option += "<option>" + item + "</option>"
    }
    municipality.innerHTML = option;
}
document.getElementById('editPrefecture').addEventListener('change', getMunicipality)


function clearNum() {
    const imgEmpty = "url('img/num/0.png')";
    const imgDash = "url('img/num/-.png')";
    num1.style.maskImage = imgEmpty;
    num2.style.maskImage = imgEmpty;
    num3.style.maskImage = imgDash;
    num4.style.maskImage = imgEmpty;
    num5.style.maskImage = imgEmpty;
    num1.style.transform = 'scaleY(1) scaleX(1)';
    num3.style.transform = 'scaleY(.65) scaleX(.75)';
}
function setNum(cond, i, num) {
    num.style.maskImage = "url('img/num/" + cond[i] + ".png')"
    if (cond[i] != '-') {
        num.style.transform = 'scaleY(1) scaleX(1)';
    } else {
        num.style.transform = 'scaleY(.65) scaleX(.75)';
    }
}
function deleteNum(num, i, empty) {
    const imgEmpty = "url('img/num/0.png')";
    const imgDash = "url('img/num/-.png')";

    if (empty == true) {
        num.style.maskImage = imgEmpty;
    } else {
        num.style.maskImage = imgDash;
    }
    if (i == 3) {
        num.style.transform = 'scaleY(.65) scaleX(.75)';
    } else {
        num.style.transform = 'scaleY(1) scaleX(1)';
    }
}
function updateNum() {
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');
    const num3 = document.getElementById('num3');
    const num4 = document.getElementById('num4');
    const num5 = document.getElementById('num5');

    const input = document.getElementById('inputNumber');
    var string = input.value.split('');
    var length = string.length;
    // if (length == 0) {
    //     clearNum();
    // } else if(length == 1){
    //     setNum(string, 0, num1);
    //     setNum(string, 1, num2);
    //     setNum(string, 2, num3);
    //     setNum(string, 3, num4);
    //     setNum(string, 4, num5);
    // }
    switch (length) {
        case 0:
            clearNum();
            break;
        case 1:
            setNum(string, 0, num1);
            deleteNum(num2, 2, true);
            break;
        case 2:
            setNum(string, 0, num1);
            setNum(string, 1, num2);
            deleteNum(num3, 3, false);
            break;
        case 3:
            setNum(string, 0, num1);
            setNum(string, 1, num2)
            setNum(string, 2, num3);
            deleteNum(num4, 4, true);
            break;
        case 4:
            setNum(string, 0, num1);
            setNum(string, 1, num2);
            setNum(string, 2, num3);
            setNum(string, 3, num4);
            deleteNum(num5, 5, true);
            break;
        case 5:
            setNum(string, 0, num1);
            setNum(string, 1, num2);
            setNum(string, 2, num3);
            setNum(string, 3, num4);
            setNum(string, 4, num5);
            // deleteNum(num5, 5, true)
            break;
    }
}
function filterNumber(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode != 45 && charCode > 31
    && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
document.getElementById('inputNumber').addEventListener('keyup', updateNum);
function debugNum() {
    const mask = document.getElementById('num1');
    // mask.style.mask = `url('img/num/${num}.png')`;
    // mask.style.webkitMask = `url('img/num/${num}.png')`;
    // mask.style.maskRepeat = 'no-repeat';
    // mask.style.webkitMaskRepeat = 'no-repeat';
    // mask.style.maskSize = 'contain';
    // mask.style.webkitMaskSize = 'contain';
    // mask.style.maskPosition = 'center';
    // mask.style.webkitMaskPosition = 'center';
    mask.style.webkitMask = 'url(img/num/2.png) center center / contain no-repeat';
    // console.log(mask.style.mask);
}
document.getElementById('inputNumber').addEventListener('focus', debugNum);


    const preview = document.getElementById('preview');
    const generate = document.getElementById('generate');
    const imgSize = document.getElementById('imageSize');
    
    //OutputScale
    var scale = document.getElementById('plateScale').value;
    const imgWidth = preview.offsetWidth * scale;
    const imgHeight = preview.offsetHeight * scale;
    
    //Generate Option
    var option = {
        width: imgWidth,
        height: imgHeight,
        style: {
            'transform': `scale(${scale})`,
            'transform-origin': 'top left',
            'filter': 'invert(1)'
        }
    }
function generateDiffuse() {
    domtoimage.toPng(preview, option)
        .then(function (diffuseImage) {
            var diffuse = new Image();
            diffuse.src = diffuseImage;
            diffuse.style.width = '50%';
            diffuse.style.margin = '2rem';
            diffuse.style.textAlign = 'center';
            diffuse.style.filter = 'invert(17%) sepia(25%) saturate(1518%) hue-rotate(90deg) brightness(98%) contrast(88%);'
            generate.appendChild(diffuse);
        })
}
function generateImage() {
    generate.innerHTML = "";

    generateDiffuse();
}