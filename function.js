
//Get Car Type
// function checkJson(region) {
//     fetch('json/region.json')
//         .then(response => response.json())
//         .then(data => {
//             var count = Object.keys(data[region]).length;
//             inputPrefecture.innerHTML = "";
//             for (var i = 0; i < count; i++) {
//                 var result = data[region][i]["name"];
//                 inputPrefecture.appendChild(
//                     new Option(result, result, true, true)
//                 )
//             }
//             inputPrefecture.selectedIndex = "0";
//         })
//         .catch(function (error) {
//             console.error(error);
//         })
// }

// function getRegion() {
//     var region = document.getElementById('inputRegion');
//     var selected = region.value;
//     checkJson(selected);
// }
// document.getElementById('inputRegion').addEventListener('change', getRegion)


// function check() {
//     previewPrefecture.style.webkitMaskImage = 'url(img/issueOffice/Chubu/Aichi/Komaki/Ichinomiya.png)'
// }

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



    //Plate Type
function getCarType() {
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
    if (charCode != 46 && charCode != 45 && charCode > 31
    && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
function getSerial() {
    var serialNumber = inputNumber.value.split('');
    return serialNumber;
}
function setDigit(cond, i, num) {
    num.style.webkitMaskImage = `url(img/num/${cond[i]}.png)`;
    if (cond[i] != '-') {
        num.style.transform = 'scale(1)';
    } else {
        num.style.transform = 'scale(.5)';
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
function capture() {
    var renderScale = inputScale.value;
    var option = {
        "target": ".capture",
        'format': 'png',
        'hd': 1,
        'width': previewContainer.offsetWidth * renderScale,
        'height': previewContainer.offsetHeight * renderScale,
        'bwidth': previewContainer.clientWidth * renderScale,
        'bheight': previewContainer.clientHeight *renderScale
    }
    GrabzIt("NTlhZjEzYTg2MzljNDcyMDk3MDQzZTEzMDM1ZGVkNWI=")
        .ConvertPage(option)
        .AddTo('generate');
    console.log('Rendered ' + renderScale + ' bigger!');
}
inputGenerate.addEventListener('click', capture);

