const navTop = document.getElementById('top');
const version = document.querySelector('.version');

//Navbar
const navbarMenu = document.getElementById('navbarMenu');
const buttonNavGenerator = document.getElementById('btnNavGenerator');
const buttonNavDownload = document.getElementById('btnNavDownload');

//Burger
const navbarOpenBurger = document.getElementById('navbarBurger');
const navbarBurgerMenu = document.getElementById('navbarMenuBurger');
const navbarCloseBurger = document.getElementById('navbarBurgerClose');
const navbarBurgerList = document.getElementsByClassName('burgerMenu');
const buttonBurgerGenerator = document.getElementById('btnBurgerGenerator');
const buttonBurgerDownload = document.getElementById('btnBurgerDownload');

// -------------------------------------------------------

//Notification
const notificationContainer = document.getElementById('notification');

// ******************************

//Changelog
const changelogContainer = document.getElementById('noticeChangelog');
const changelogTop = document.querySelector('.changelogTop');
const changelogBottom = document.querySelector('.changelogExpand');
const buttonChangelog = document.getElementById('buttonChangelog');
const changelogTable = document.getElementById('changelogTable');

// ******************************

//Terms
const termsContainer = document.getElementById('noticeTerms');
const termsTop = document.querySelector('.termsTop');
const termsBottom = document.querySelector('.termsExpand');
const buttonTerms = document.getElementById('buttonTerms');

// ******************************

//Wiki
const wikiContainer = document.getElementById('noticeWiki');

// -------------------------------------------------------

//Generator
const generatorContainer = document.getElementById('generatorContainer');

// ******************************

//Preview
const previewContainer = document.getElementById('previewContainer');
const previewSize = document.getElementById('plateSize');

const platePreview = document.getElementById('platePreview');
//Top
const previewTop = document.getElementById('plateTop');
const previewPrefecture = document.getElementById('platePrefecture');
const previewEngine = document.getElementById('plateEngine');
const previewEngine1 = document.querySelector('.engine1');
const previewEngine2 = document.querySelector('.engine2');
const previewEngine3 = document.querySelector('.engine3');
const previewEngineNumber = document.getElementsByClassName('engineNumber');
//Bottom
const previewBottom = document.getElementById('plateBottom');
const previewHiragana = document.getElementById('hiragana');
const previewSerial = document.getElementById('serial');
const previewSerial1 = document.querySelector('.serial1');
const previewSerial2 = document.querySelector('.serial2');
const previewSerial3 = document.querySelector('.serial3');
const previewSerial4 = document.querySelector('.serial4');
const previewSerial5 = document.querySelector('.serial5');
const previewSerial6 = document.querySelector('.serial6');
const previewSerialNumber = document.getElementsByClassName('serialNumber');

// ******************************

//Input
const inputContainer = document.getElementById('inputContainer');
const inputForm = document.getElementById('inputForm');

//Type
const formType = document.getElementById('formType');

const listVehType = document.getElementById('typeVehicle');
const inputVehType = document.getElementById('inputVehicle');

const listPlateType = document.getElementById('typePlate');
const inputPlateType = document.getElementById('inputPlate');

//Region
const formRegion = document.getElementById('formRegion');

const listRegion = document.getElementById('regionRegion');
const inputRegion = document.getElementById('inputRegion');

const listPrefecture = document.getElementById('regionPrefecture');
const inputPrefecture = document.getElementById('inputPrefecture');

const listMunicipality = document.getElementById('regionMunicipality');
const inputMunicipality = document.getElementById('inputMunicipality');

const listWard = document.getElementById('regionWards');
const inputWard = document.getElementById('inputWards');

//Identification
const formIdentification = document.getElementById('formIdentification');

const listEngine = document.getElementById('identificationEngine');
const inputEngine = document.getElementById('inputEngine');

const listHiragana = document.getElementById('identificationHiragana');
const inputHiragana = document.getElementById('inputHiragana');

const listSerial = document.getElementById('identificationSerial');
const inputSerial = document.getElementById('inputSerial');

//Option
const formOption = document.getElementById('formOption');

const optionScale = document.getElementById('inputScale');
const optionHeight = document.getElementById('inputHeight');

//Button
const formButton = document.getElementById('formButton');

const checkAgreement = document.getElementById('agreement');
const buttonGenerate = document.getElementById('buttonGenerate');
const buttonDownload = document.getElementById('buttonDownload');
const buttonReset = document.getElementById('buttonReset');

// ******************************

//Result
const generatedContainer = document.getElementById('result');
const resultSize = document.getElementById('resultSize');

const resultLoading = document.getElementById('resultWait');
const renderContainer = document.getElementById('resultContainer');

const diffuseContainer = document.getElementById('generatedDiffuse');
const diffuseRender = document.querySelector('.diffuse');

const normalContainer = document.getElementById('generatedHeight');
const normalCanvas = document.querySelector('.normalCanvas');
const normalRender = document.querySelector('.height');

const sealContainer = document.getElementById('generatedSeal');
const sealRender = document.querySelector('.diffuse');

const sealNrmContainer = document.getElementById('generatedSealNrm');
const sealNrmRender = document.querySelector('.sealNrm');

// -------------------------------------------------------

//Download
const downloadContainer = document.getElementById('downloadContainer');

/*      -------------------------------------------------------
        -------------------------------------------------------
        -------------------------------------------------------         */

const imageEmpty = `url('img/undefined.png') center center no-repeat`;
const imageZero = `url('img/num/num_0.svg') center center no-repeat`;
const imageDash = `url('img/num/num_-.svg') center center no-repeat`;

// var renderScale = optionScale.value;
