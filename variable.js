    //Plate Element
const plateText = document.getElementsByClassName('switchText');
const plateBg = document.querySelector('.switchBackground');

    //Preview
const previewContainer = document.getElementById('preview');

const previewTop = document.querySelector('.top');
const previewPrefecture = document.getElementById('prefecture');
const previewEngine = document.getElementById('engine');
const previewEngine1 = document.querySelector('.engine1');
const previewEngine2 = document.querySelector('.engine2');
const previewEngine3 = document.querySelector('.engine3');

const previewBottom = document.querySelector('.bottom');
const previewHiragana = document.getElementById('hiragana');
const previewNumber = document.getElementById('number');
const previewDigit1 = document.querySelector('.num1');
const previewDigit2 = document.querySelector('.num2');
const previewDigit3 = document.querySelector('.num3');
const previewDigit4 = document.querySelector('.num4');
const previewDigit5 = document.querySelector('.num5');

    //Editor
const inputContainer = document.getElementById('editor');

const inputCarType = document.getElementById('inputCarType');

const inputRegion = document.getElementById('inputRegion');
const inputPrefecture = document.getElementById('inputPrefecture');
const inputMunicipality = document.getElementById('inputMunicipality');
const inputWards = document.getElementById('inputWards');

const inputEngine = document.getElementById('inputEngine');
const inputHiragana = document.getElementById('inputHiragana');
const inputNumber = document.getElementById('inputNumber');
const inputScale = document.getElementById('inputScale');

const inputGenerate = document.getElementById('inputGenerate');
const inputDownload = document.getElementById('inputDownload');
const inputReset = document.getElementById('inputReset');
    
    //Generate
const generateContainer = document.getElementById('generate');

    //Array
var arrayHiraganaWhite = [
    'さ', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'ほ',
    'ま', 'み', 'む', 'め',
    'ゆ',
    'ら', 'り', 'る'
]
var arrayHiraganaGreen = [
    'あ', 'い', 'う', 'え',
    'か', 'き', 'く', 'け', 'こ',
    'を'
]

    //General
const imgEmpty = 'url(img/undefined.png)';
const imgDefault = 'url(img/num/0.png)';
const imgDash = 'url(img/num/-.png)'