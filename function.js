    //General
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}
setInputFilter(inputEngine, function(value) {
    return /^\d*$/.test(value);
});

    //Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var element = document.querySelector(this.getAttribute('href')).getAttribute('id');
        var ele = document.getElementById(element);
        var elePosition = ele.offsetTop;
        var navHeight = 90;
        var scrollPosition = elePosition - navHeight;

        // document.querySelector(this.getAttribute('href')).scrollIntoView({
        //     top: scrollPosition,
        //     behavior: 'smooth'
        // });
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        })
    });
});
function showTop() {
    var navHidden = document.querySelector('.navHidden')
    var scrollPosition = window.scrollY;

    if (scrollPosition != 0) {
        navHidden.style.display = 'flex';
        setTimeout(function () {
            navHidden.style.opacity = 1;
        }, 10);
    }
    if (scrollPosition == 0) {
        setTimeout(function () {
            navHidden.style.opacity = 0;
        }, 10);
        setTimeout(function () {
            navHidden.style.display = 'none';
        }, 250);
    }
}
window.addEventListener('scroll', showTop);

    //Plate Type
function getCarType() {
    previewContainer.style.filter = '';
    let carType = inputCarType.value;
    
    switch (carType) {
        case 'private':
            changePlate('clWhite', 'clGreen');
            break;
        case 'commercial':
            changePlate('clGreen', 'clWhite');
            break;
        case 'k-private':
            changePlate('clYellow', 'clBlack');
            break;
        case 'k-commercial':
            changePlate('clBlack', 'clYellow');
            break;
    }
}
function changePlate(background, text) {
    plateBg.classList.remove('clWhite');
    plateBg.classList.remove('clGreen');
    plateBg.classList.remove('clYellow');
    plateBg.classList.remove('clBlack');
    plateBg.classList.add(background);
    for (i = 0; i < plateText.length; i++){
        plateText[i].classList.remove('clWhite');
        plateText[i].classList.remove('clGreen');
        plateText[i].classList.remove('clYellow');
        plateText[i].classList.remove('clBlack');
        plateText[i].classList.add(text);
    }
} 
inputCarType.addEventListener('change', getCarType);

    //Region
function listPrefecture() {
    var getRegion = inputRegion.value;
    fetch('json/region.json')
        .then(response => response.json())
        .then(data => {
            let countLength = Object.keys(data[getRegion]).length;
            inputPrefecture.innerHTML = "";
            inputPrefecture.appendChild(
                new Option('Prefecture', '', true, true)
            )
            let first = inputPrefecture.firstElementChild;
            first.setAttribute('disabled', '');
            first.setAttribute('hidden', '');
            
            for (i = 0; i < countLength; i++){
                let prefecture = data[getRegion][i]['name'];

                inputPrefecture.appendChild(
                    new Option(prefecture, prefecture, false, false)
                )
            }

            inputMunicipality.selectedIndex = 0;
            inputWards.selectedIndex = 0;
            previewPrefecture.style.webkitMaskImage = imgEmpty;
        })
        .catch(function (error) {
            console.error('Error!', error)
        })
}
inputRegion.addEventListener('change', listPrefecture);

function listMunicipality() {
    var getPrefecture = inputPrefecture.value;
    fetch('json/municipality.json')
        .then(response => response.json())
        .then(data => {
            let countLength = Object.keys(data[getPrefecture][0]).length;
            let getName = Object.keys(data[getPrefecture][0]);
            inputMunicipality.innerHTML = "";
            inputMunicipality.appendChild(
                new Option('Municipality', '', true, true)
            )
            let first = inputMunicipality.firstElementChild;
            first.setAttribute('disabled', '');
            first.setAttribute('hidden', '');

            for (i = 0; i < countLength; i++){
                let municipality = getName[i];

                inputMunicipality.appendChild(
                    new Option(municipality, municipality, false, false)
                )
            }

            inputWards.selectedIndex = 0;
            previewPrefecture.style.webkitMaskImage = imgEmpty;
        })
        .catch(function (error) {
            console.error('Error!', error)
        })
}
inputPrefecture.addEventListener('change', listMunicipality);

function listWards() {
    var getPrefecture = inputPrefecture.value;
    var getMunicipality = inputMunicipality.value;
    fetch('json/municipality.json')
        .then(response => response.json())
        .then(data => {
            let countLength = Object.keys(data[getPrefecture][0][getMunicipality]).length;
            // console.log(data[getPrefecture][0][getMunicipality][0]['romaji']);
            inputWards.innerHTML = "";
            inputWards.appendChild(
                new Option('Wards', '', true, true)
            )
            let first = inputWards.firstElementChild;
            first.setAttribute('disabled', '');
            first.setAttribute('hidden', '');

            for (i = 0; i < countLength; i++){
                let romaji = data[getPrefecture][0][getMunicipality][i]['romaji'];
                let kanji = data[getPrefecture][0][getMunicipality][i]['kanji'];
                let wards = `${romaji} - ${kanji}`;

                inputWards.appendChild(
                    new Option(wards, wards, false, false)
                )
            }
            previewPrefecture.style.webkitMaskImage = imgEmpty;
        })
}
inputMunicipality.addEventListener('change', listWards);

function updatePlateRegion() {
    let getRegion = inputRegion.value;
    let getPrefecture = inputPrefecture.value;
    let getMunicipality = inputMunicipality.value;
    let getWards = inputWards.value;
    let romaji = getWards.split(' - ');
    let imgName = `img/issueOffice/${getRegion}/${getPrefecture}/${getMunicipality}/${romaji[0]}.png`;
    
    previewPrefecture.style.webkitMaskImage = `url(${imgName})`;
}
inputWards.addEventListener('change', updatePlateRegion);

    //Engine Class
function filterEngine(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (
        charCode < 48 || charCode > 57
    )
        return false;
    return true;
}
function getNumber() {
    var engineNumber = inputEngine.value.split('');
    return engineNumber;
}
function updateNumber() {
    var engineNumber = getNumber();
    
    switch (engineNumber.length) {
        case 0:
            previewEngine1.style.webkitMaskImage = imgDefault;
            previewEngine2.style.webkitMaskImage = imgDefault;
            previewEngine3.style.webkitMaskImage = imgDefault;
            break;
        case 1:
            previewEngine1.style.webkitMaskImage = `url(img/num/${engineNumber[0]}.png)`;
            previewEngine2.style.webkitMaskImage = imgDefault;
            break;
        case 2:
            previewEngine1.style.webkitMaskImage = `url(img/num/${engineNumber[0]}.png)`;
            previewEngine2.style.webkitMaskImage = `url(img/num/${engineNumber[1]}.png)`;
            previewEngine3.style.webkitMaskImage = imgDefault;
            break;
        case 3:
            previewEngine1.style.webkitMaskImage = `url(img/num/${engineNumber[0]}.png)`;
            previewEngine2.style.webkitMaskImage = `url(img/num/${engineNumber[1]}.png)`;
            previewEngine3.style.webkitMaskImage = `url(img/num/${engineNumber[2]}.png)`;
            break;
    }
}

    //Hiragana
function listHiragana() {
    let plateType = inputCarType.value;
    if (plateType == 'private' || plateType == 'commercial' || plateType == 'temp') {
        let countLength = arrayHiraganaWhite.length;
        inputHiragana.innerHTML = "";
        inputHiragana.appendChild(
            new Option('Hiragana', '', true, true)
        )
        let first = inputHiragana.firstElementChild;
        first.setAttribute('disabled', '');
        first.setAttribute('hidden', '');

        for (i = 0; i < countLength; i++){
            inputHiragana.appendChild(
                new Option(arrayHiraganaWhite[i], arrayHiraganaWhite[i], false, false)
            )
        }
        previewHiragana.style.webkitMaskImage = imgEmpty;
    } else {
        let countLength = arrayHiraganaGreen.length;
        inputHiragana.innerHTML = "";
        inputHiragana.appendChild(
            new Option('Hiragana', '', true, true)
        )
        let first = inputHiragana.firstElementChild;
        first.setAttribute('disabled', '');
        first.setAttribute('hidden', '');

        for (i = 0; i < countLength; i++){
            inputHiragana.appendChild(
                new Option(arrayHiraganaGreen[i], arrayHiraganaGreen[i], false, false)
            )
        }
        previewHiragana.style.webkitMaskImage = imgEmpty;
    }
}
inputCarType.addEventListener('change', listHiragana);
function updateHiragana() {
    let hiragana = inputHiragana.value;
    let imgName = `img/hiragana/${hiragana}.png`;

    previewHiragana.style.webkitMaskImage = `url(${imgName})`;
}
inputHiragana.addEventListener('change', updateHiragana);

    //NumberPlate
function filterNumber(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (
        charCode != 32 &&
        charCode != 46 &&
        charCode != 45 &&
        charCode > 31 &&
        (charCode < 48 || charCode > 57)
    )
        return false;
    return true;
}
function getSerial() {
    var serialNumber = inputNumber.value.split('');
    return serialNumber;
}
function setDigit(cond, i, num) {
    num.style.webkitMaskImage = `url(img/num/${cond[i]}.png)`;
    if (cond[i] == '-' || cond[i] == '.') {
        num.style.transform = 'scale(.5)';
    } else {
        num.style.transform = 'scale(1)';
    }
    if (cond[i] == ' ') {
        num.style.webkitMaskImage = imgEmpty;
    }
}
function updateSerial() {
    var serialNumber = getSerial();
    
    switch (serialNumber.length) {
        case 0:
            previewDigit1.style.webkitMaskImage = imgDefault;
            previewDigit2.style.webkitMaskImage = imgDefault;
            previewDigit3.style.webkitMaskImage = imgDash;
            previewDigit4.style.webkitMaskImage = imgDefault;
            previewDigit5.style.webkitMaskImage = imgDefault;
            previewDigit1.style.transform = 'scale(1)'
            previewDigit2.style.transform = 'scale(1)'
            previewDigit3.style.transform = 'scale(.5)'
            previewDigit4.style.transform = 'scale(1)'
            previewDigit5.style.transform = 'scale(1)'
            break;
        case 1:
            setDigit(serialNumber, 0, previewDigit1);
            previewDigit2.style.webkitMaskImage = imgDefault;
            previewDigit2.style.transform = 'scale(1)';
            break;
        case 2:
            setDigit(serialNumber, 0, previewDigit1);
            setDigit(serialNumber, 1, previewDigit2);
            previewDigit3.style.webkitMaskImage = imgDash;
            previewDigit3.style.transform = 'scale(.5)';
            break;
        case 3:
            setDigit(serialNumber, 0, previewDigit1);
            setDigit(serialNumber, 1, previewDigit2);
            setDigit(serialNumber, 2, previewDigit3);
            previewDigit4.style.webkitMaskImage = imgDefault;
            previewDigit4.style.transform = 'scale(1)';
            break;
        case 4:
            setDigit(serialNumber, 0, previewDigit1);
            setDigit(serialNumber, 1, previewDigit2);
            setDigit(serialNumber, 2, previewDigit3);
            setDigit(serialNumber, 3, previewDigit4);
            previewDigit5.style.webkitMaskImage = imgDefault;
            previewDigit5.style.transform = 'scale(1)';
            break;
        case 5:
            setDigit(serialNumber, 0, previewDigit1);
            setDigit(serialNumber, 1, previewDigit2);
            setDigit(serialNumber, 2, previewDigit3);
            setDigit(serialNumber, 3, previewDigit4);
            setDigit(serialNumber, 4, previewDigit5);
            break;
    }
}
function updateStyle() {
    var serialNumber = getSerial();
}
inputNumber.addEventListener('keyup', updateStyle);

    //Check Scale
function checkScale() {
    if (inputScale.value < 1 || inputScale.value > 5) {
        inputGenerate.setAttribute('disabled', '');
    } else {
        inputGenerate.removeAttribute('disabled');
    }
}
inputScale.addEventListener('keyup', checkScale);

    //Generate Image
function showLoading() {
    loading.style.display = 'block';
}
function hideLoading() {
    loading.style.display = 'none';
    if (inputDownload.hasAttribute('disabled')) {
        inputDownload.removeAttribute('disabled');
    }
    inputDownload.removeAttribute('disabled');
}
function setDiffuse(dataUri) {
    imageDiffuse.src = dataUri;
}
function setHeight(dataUri) {
    imageHeight.src = dataUri;
}
function generateDiffuse(scale) {
    var option = {
        'target': '#preview',
        'format': 'jpg',
        'hd': 1,
        'displayclass': 'diffuseMap',
        'download': 1,
        'filename': 'diffuseMap.png',
        'onstart': showLoading,
        'onfinish': hideLoading,
        'width': previewContainer.offsetWidth * scale,
        'height': previewContainer.offsetHeight * scale,
        'bwidth': document.body.clientWidth,
        'bheight': document.body.clientHeight
    };

    GrabzIt(APIkey)
        .ConvertPage(option)
        .DataURI(setDiffuse)
}
function generateHeight(scale) {
    if (inputCarType.value == 'commercial' || inputCarType.value == 'k-commercial') {
        previewContainer.style.filter = 'grayscale(1) contrast(2) invert(1)';
    } else {
        previewContainer.style.filter = 'grayscale(1) contrast(2)'
    };
    previewTop.style.filter = 'blur(1px)';
    previewBottom.style.filter = 'blur(1px)';

    var optionHeight = {
        'target': '#preview',
        'format': 'png',
        'hd': 1,
        'displayclass': 'heightMap',
        'onfinish': hideLoading,
        'width': previewContainer.offsetWidth * scale,
        'height': previewContainer.offsetHeight * scale,
        'bwidth': document.body.clientWidth,
        'bheight': document.body.clientHeight
    };

    GrabzIt(APIkey)
        .ConvertPage(optionHeight)
        .DataURI(setHeight)
    
    previewContainer.style.filter = '';
    previewTop.style.filter = '';
    previewBottom.style.filter = '';
}
function generatePlate() {
    imageDiffuse.src = '';
    imageHeight.src = '';

    var renderScale = inputScale.value;

    generateDiffuse(renderScale);
    if (inputHeight.checked) {
        generateHeight(renderScale);
    }
}

async function newMethod() {
    await domtoimage.toPng(previewContainer)
        .then(function (dataURL) {
            var img = new Image();
            img.src = dataURL;
            generateContainer.appendChild(img);
        })
        .catch(function (error) {
            console.error(error);
        })
}
inputGenerate.addEventListener('click', newMethod);

    //Download Image
function fileSave() {
    var nameType = inputCarType.value;
    var nameWards = inputWards.value.split(' - ')[0];
    var nameEngine = inputEngine.value;
    if (nameEngine == '') {
        nameEngine = '000';
    }
    var nameHiragana = inputHiragana.value;
    var nameSerial = inputNumber.value;
    if (nameSerial == '') {
        nameSerial = '00-00';
    }
    var nameScale = inputScale.value;
    var name = `Map_${nameType}_${nameWards}${nameEngine}_${nameHiragana}${nameSerial}@${nameScale}x`

    var imgDiffuse = document.createElement('a');
    imgDiffuse.href = imageDiffuse.src;
    imgDiffuse.download = `diffuse${name}.png`;
    imgDiffuse.click();

    if (inputHeight.checked) {
        var imgHeight = document.createElement('a');
        imgHeight.href = imageHeight.src;
        imgHeight.download = `height${name}.png`;
        imgHeight.click();
    }
}
inputDownload.addEventListener('click', fileSave);

    //Reset
function resetSelect(type, text, prev) {
    type.innerHTML = '';
    type.appendChild(
        new Option(text, '', true, true)
    )
    type.appendChild(
        new Option(prev, '', false, false)
    )
    type.children[0].setAttribute('disabled', '');
    type.children[0].setAttribute('hidden', '');
    type.children[1].setAttribute('disabled', '');
    
}
function reset() {
    //Plate Type
    inputCarType.selectedIndex = 0;
    changePlate('clWhite', 'clGreen');

    //Region
    inputRegion.selectedIndex = 0;
    //Prefecture
    resetSelect(inputPrefecture, 'Prefecture', 'Please select Region first');
    //Municipality
    resetSelect(inputMunicipality, 'Municipality', 'Please select Prefecture first');
    //Wards
    resetSelect(inputWards, 'Wards', 'Please select Municipality first');
    previewPrefecture.style.webkitMaskImage = imgEmpty;
    //RegionalPride
    inputRegionalPride.selectedIndex = '0';
    resetRegionalPridePlate();

    //Vehicle Engine
    inputEngine.value = '';
    updateNumber();

    //Hiragana
    resetSelect(inputHiragana, 'Hiragana', 'Please select Plate type first');
    previewHiragana.style.webkitMaskImage = imgEmpty;

    //NumberPlate
    inputNumber.value = '';
    updateSerial();
}
inputReset.addEventListener('click', reset);


    //Regional
function listRegionalPride() {
    var wards = inputWards.value.split(' - ');
    var prefecture = inputPrefecture.value;

    if (arrayRegionalPride.includes(wards[0])) {
        regionalPrideContainer.style.display = 'flex';
        imgRegionalColor = `url('img/regionalPride/${prefecture}/${wards[0]}.svg')`;
        imgRegionalGrayscale = `url('img/regionalPride/${prefecture}/gray_${wards[0]}.svg' )`;
    } else {
        regionalPrideContainer.style.display = 'none';
    }
    // if (arrayRegionalPride.includes(wards[0])) {
    //     regionalPrideContainer.style.display = 'flex';
    //     imgRegionalColor = `url('img/regionalPride/Ibaraki/${wards[0]}.svg')`;
    // } else {
    //     regionalPrideContainer.style.display = 'none';
    // }
    // return wards;
}
inputWards.addEventListener('change', listRegionalPride);
function updateRegionalPridePlate() {
    // let wards = listRegionalPride();
    listRegionalPride();
    let selected = inputRegionalPride.value;
    let plateType = inputCarType.value;
    switch (selected) {
        case 'regPrideNo':
            switch (plateType) {
                case 'private':
                    changePlate('clWhite', 'clGreen');
                    previewContainer.style.background = '#EEEEEE';
                    previewContainer.style.boxShadow = '';
                    break;
                case 'commercial':
                    changePlate('clGreen', 'clWhite');
                    previewContainer.style.background = '#EEEEEE';
                    previewContainer.style.boxShadow = '';
                    break;
                case 'k-private':
                    changePlate('clYellow', 'clBlack');
                    previewContainer.style.background = '#EEEEEE';
                    previewContainer.style.boxShadow = '';
                    break;
                case 'k-commercial':
                    changePlate('clBlack', 'clYellow');
                    previewContainer.style.background = '#EEEEEE';
                    previewContainer.style.boxShadow = '';
                    break;
            }
            break;
        case 'regPrideGrayscale':
            previewContainer.style.background = imgRegionalGrayscale;
            switch (plateType) {
                case 'private':
                    changePlate('clWhite', 'clGreen');
                    previewContainer.style.boxShadow = '';
                    break;
                case 'commercial':
                    changePlate('clWhite', 'clGreen');
                    previewContainer.style.boxShadow = 'inset 0 0 0 10px #104524';
                    break;
                case 'k-private':
                    changePlate('clWhite', 'clGreen');
                    previewContainer.style.boxShadow = 'inset 0 0 0 10px #FEC338';
                    break;
                case 'k-commercial':
                    changePlate('clWhite', 'clGreen');
                    previewContainer.style.boxShadow = 'inset 0 0 0 10px #313131';
                    break;
            }
            break;
        case 'regPrideColor':
            previewContainer.style.background = imgRegionalColor;
            switch (plateType) {
                case 'private':
                    changePlate('clWhite', 'clGreen');
                    previewContainer.style.boxShadow = '';
                    break;
                case 'commercial':
                    changePlate('clWhite', 'clGreen');
                    previewContainer.style.boxShadow = 'inset 0 0 0 10px #104524';
                    break;
                case 'k-private':
                    changePlate('clWhite', 'clGreen');
                    previewContainer.style.boxShadow = 'inset 0 0 0 10px #FEC338';
                    break;
                case 'k-commercial':
                    changePlate('clWhite', 'clGreen');
                    previewContainer.style.boxShadow = 'inset 0 0 0 10px #313131';
                    break;
            }
            break;
    }
}
function resetRegionalPridePlate() {
    inputRegionalPride.selectedIndex = '0';
    setTimeout(function () {
        regionalPrideContainer.removeAttribute('style');
    }, 0)
    changePlate('clWhite', 'clGreen');
    previewContainer.style.background = '#EEEEEE';
    previewContainer.style.boxShadow = '';
    updateRegionalPridePlate();
    setTimeout(function () {
        listRegionalPride();
    }, 10)
}
inputCarType.addEventListener('change', updateRegionalPridePlate)
inputRegion.addEventListener('change', resetRegionalPridePlate);
inputPrefecture.addEventListener('change', resetRegionalPridePlate);
inputMunicipality.addEventListener('change', resetRegionalPridePlate);
inputWards.addEventListener('change', resetRegionalPridePlate);
inputRegionalPride.addEventListener('change', updateRegionalPridePlate);