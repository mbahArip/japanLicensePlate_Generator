function init() {
	// console.clear();
	layoutNavigation.version();
	layoutNavigation.checkPage();
	layoutNotification.listChangelog();
}
function filterEngine(evt) {
	evt = evt ? evt : window.event;
	let charCode = evt.which ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}
function filterSerial(evt) {
	evt = evt ? evt : window.event;
	let charCode = evt.which ? evt.which : evt.keyCode;
	if ((charCode > 32 && (charCode < 45 || charCode > 57)) || charCode == 47) {
		return false;
	}
	return true;
}

class input {
	listPlateType() {
		let vehType = inputVehType.value;
		//0 - 3 = Car | 4++ = Motorcycle
		let type = [
			['Private Vehicle', 'private'],
			['Commercial Vehicle', 'commercial'],
			['Private Kei', 'kprivate'],
			['Commercial Kei', 'kcommercial'],
		];

		switch (vehType) {
			case 'car':
				inputPlateType.innerHTML = '';
				inputPlateType.appendChild(new Option('Plate Type', '', true, true));
				let firstOptionCar = inputPlateType.firstElementChild;
				firstOptionCar.setAttribute('disabled', '');
				firstOptionCar.setAttribute('hidden', '');

				for (let i = 0; i <= 3; i++) {
					inputPlateType.appendChild(new Option(type[i][0], type[i][1], false, false));
				}
				break;

			case 'motorcycle':
				inputPlateType.innerHTML = '';
				inputPlateType.appendChild(new Option('Plate Type', '', true, true));
				let firstOptionBike = inputPlateType.firstElementChild;
				firstOptionBike.setAttribute('disabled', '');
				firstOptionBike.setAttribute('hidden', '');

				for (let i = 4; i <= 7; i++) {
					inputPlateType.appendChild(new Option(type[i][0], type[i][1], false, false));
				}
				break;

			case '':
				inputPlateType.innerHTML = '';
				inputPlateType.appendChild(new Option('Plate Type', '', true, true));
				let firstOptionReset = inputPlateType.firstElementChild;
				firstOptionReset.setAttribute('disabled', '');
				firstOptionReset.setAttribute('hidden', '');
				inputPlateType.appendChild(new Option('Please select Vehicle Type first!', '', false, false));
				let secondOption = inputPlateType.firstElementChild.nextElementSibling;
				secondOption.setAttribute('disabled', '');
		}
	}
	listHiragana() {
		let hiraganaPriv = [
			'さ',
			'す',
			'せ',
			'そ',
			'た',
			'ち',
			'つ',
			'て',
			'と',
			'な',
			'に',
			'ぬ',
			'ね',
			'の',
			'は',
			'ひ',
			'ふ',
			'ほ',
			'ま',
			'み',
			'む',
			'め',
			'ゆ',
			'ら',
			'り',
			'る',
		];
		let hiraganaCom = ['あ', 'い', 'う', 'え', 'か', 'き', 'く', 'け', 'こ', 'を'];
		let plateType = inputPlateType.value;
		let hiraganaList;

		inputHiragana.innerHTML = '';
		inputHiragana.appendChild(new Option('Hiragana', '', true, true));
		let firstOption = inputHiragana.firstElementChild;
		firstOption.setAttribute('disabled', '');
		firstOption.setAttribute('hidden', '');

		if (plateType == 'private' || plateType == 'kprivate') {
			hiraganaList = hiraganaPriv;
		} else if (plateType == 'commercial' || plateType == 'kcommercial') {
			hiraganaList = hiraganaCom;
		} else if (plateType == '') {
			hiraganaList = [];
			inputHiragana.appendChild(new Option('Please select Plate Type first!', '', false, false));
			let secondOption = inputHiragana.firstElementChild.nextElementSibling;
			secondOption.setAttribute('disabled', '');
		}

		for (let i = 0; i < hiraganaList.length; i++) {
			inputHiragana.appendChild(new Option(hiraganaList[i], hiraganaList[i], false, false));
		}
	}

	listPrefecture() {
		let getRegion = inputRegion.value;
		fetch('json/region.json')
			.then((r) => r.json())
			.then((data) => {
				let length = Object.keys(data[getRegion]).length;

				inputPrefecture.innerHTML = '';
				inputPrefecture.appendChild(new Option('Prefecture', '', true, true));
				let firstOption = inputPrefecture.firstElementChild;
				firstOption.setAttribute('disabled', '');
				firstOption.setAttribute('hidden', '');

				for (let i = 0; i < length; i++) {
					let prefecture = data[getRegion][i]['name'];

					inputPrefecture.appendChild(new Option(prefecture, prefecture, false, false));
				}
			});
	}
	listMunicipality() {
		let getPrefecture = inputPrefecture.value;
		fetch('json/municipality.json')
			.then((r) => r.json())
			.then((data) => {
				let length = Object.keys(data[getPrefecture][0]).length;
				let getName = Object.keys(data[getPrefecture][0]);

				inputMunicipality.innerHTML = '';
				inputMunicipality.appendChild(new Option('Municipality', '', true, true));
				let firstOption = inputMunicipality.firstElementChild;
				firstOption.setAttribute('disabled', '');
				firstOption.setAttribute('hidden', '');

				for (let i = 0; i < length; i++) {
					let municipality = getName[i];

					inputMunicipality.appendChild(new Option(municipality, municipality, false, false));
				}
			});
	}
	listWard() {
		let getPrefecture = inputPrefecture.value;
		let getMunicipality = inputMunicipality.value;
		fetch('json/municipality.json')
			.then((r) => r.json())
			.then((data) => {
				let length = Object.keys(data[getPrefecture][0][getMunicipality]).length;

				inputWard.innerHTML = '';
				inputWard.appendChild(new Option('Wards', '', true, true));
				let firstOption = inputWard.firstElementChild;
				firstOption.setAttribute('disabled', '');
				firstOption.setAttribute('hidden', '');

				for (let i = 0; i < length; i++) {
					let romaji = data[getPrefecture][0][getMunicipality][i]['romaji'];
					let kanji = data[getPrefecture][0][getMunicipality][i]['kanji'];
					let wards = `${romaji} - ${kanji}`;

					inputWard.appendChild(new Option(wards, wards, false, false));
				}
			});
	}

	updateSizePreview() {
		let renderScale = optionScale.value;
		let width = 660 * renderScale;
		let height = 330 * renderScale;

		previewSize.innerHTML = `Plate dimension : ${width}px x ${height}px`;
	}

	resetRegion() {
		function reset(input, option, secondOpt) {
			input.innerHTML = '';
			input.appendChild(new Option(`${option}`, '', true, true));
			let firstOption = input.firstElementChild;
			firstOption.setAttribute('disabled', '');
			firstOption.setAttribute('hidden', '');
			input.appendChild(new Option(`Please select ${secondOpt} first!`, '', false, false));
			let secondOption = input.firstElementChild.nextElementSibling;
			secondOption.setAttribute('disabled', '');
		}
		reset(inputPrefecture, 'Prefecture', 'Region');
		reset(inputMunicipality, 'Municipality', 'Prefecture');
		reset(inputWard, 'Wards', 'Municipality');
	}

	async viewTerms() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		await sleep(100);
		layoutNotification.expandTerms();
	}
}

class preview {
	updatePlateType() {
		funcInput.listHiragana();
		let plateType = inputPlateType.value;
		let color = [
			['bgWhite', 'filterGreen'],
			['bgGreen', 'filterWhite'],
			['bgYellow', 'filterBlack'],
			['bgBlack', 'filterYellow'],
		];
		platePreview.removeAttribute('class');
		previewTop.removeAttribute('class');
		previewBottom.removeAttribute('class');
		let i;

		switch (plateType) {
			case 'private':
				i = 0;
				platePreview.setAttribute('class', color[i][0]);
				previewTop.setAttribute('class', color[i][1]);
				previewBottom.setAttribute('class', color[i][1]);
				break;

			case 'commercial':
				i = 1;
				platePreview.setAttribute('class', color[i][0]);
				previewTop.setAttribute('class', color[i][1]);
				previewBottom.setAttribute('class', color[i][1]);
				break;

			case 'kprivate':
				i = 2;
				platePreview.setAttribute('class', color[i][0]);
				previewTop.setAttribute('class', color[i][1]);
				previewBottom.setAttribute('class', color[i][1]);
				break;

			case 'kcommercial':
				i = 3;
				platePreview.setAttribute('class', color[i][0]);
				previewTop.setAttribute('class', color[i][1]);
				previewBottom.setAttribute('class', color[i][1]);
				break;

			case '':
				i = 0;
				platePreview.setAttribute('class', color[i][0]);
				previewTop.setAttribute('class', color[i][1]);
				previewBottom.setAttribute('class', color[i][1]);
				break;
		}
	}

	updateRegion() {
		let getRegion = inputRegion.value;
		let getPrefecture = inputPrefecture.value;
		let getMunicipality = inputMunicipality.value;
		let wardValue = inputWard.value;
		let getWard = wardValue.split(' - ');
		let imgName = `img/issueOffice/${getRegion}/${getPrefecture}/${getMunicipality}/${getWard[0]}.png`;

		if (getRegion == '') {
			imgName = `img/undefined.png`;
		}

		previewPrefecture.style.background = `url(${imgName}) right center / contain no-repeat`;
	}
	updateEngine() {
		let engineNumber = inputEngine.value.split('');

		switch (engineNumber.length) {
			case 0:
				previewEngine1.style.background = imageZero;
				previewEngine2.style.background = imageZero;
				previewEngine3.style.background = imageZero;
				break;
			case 1:
				previewEngine1.style.background = `url('img/num/num_${engineNumber[0]}.svg') center center no-repeat`;
				previewEngine2.style.background = imageZero;
				previewEngine3.style.background = imageZero;
				break;
			case 2:
				previewEngine1.style.background = `url('img/num/num_${engineNumber[0]}.svg') center center no-repeat`;
				previewEngine2.style.background = `url('img/num/num_${engineNumber[1]}.svg') center center no-repeat`;
				previewEngine3.style.background = imageZero;
				break;
			case 3:
				previewEngine1.style.background = `url('img/num/num_${engineNumber[0]}.svg') center center no-repeat`;
				previewEngine2.style.background = `url('img/num/num_${engineNumber[1]}.svg') center center no-repeat`;
				previewEngine3.style.background = `url('img/num/num_${engineNumber[2]}.svg') center center no-repeat`;
				break;
		}
	}

	updateHiragana() {
		let selectedHiragana = `img/hiragana/hiragana_${inputHiragana.value}.svg`;
		if (inputHiragana.value == '') {
			selectedHiragana = `img/undefined.png`;
		}
		previewHiragana.style.background = `url('${selectedHiragana}') right center / 90px no-repeat`;
	}
	updateSerial() {
		let serialNumber = inputSerial.value.split('');

		//check digit
		if (serialNumber.length == 6) {
			previewHiragana.classList.add('hiragana5digit');
			previewSerial.classList.add('serial5digit');
			previewSerial6.style.display = 'block';
		} else {
			previewHiragana.classList.remove('hiragana5digit');
			previewSerial.classList.remove('serial5digit');
			previewSerial6.style.display = 'none';
		}
		//check symbol
		if (serialNumber[serialNumber.length - 1] === '-' /* || serialNumber[serialNumber.length - 1] === '.' */) {
			let i = serialNumber.length - 1;
			previewSerialNumber[i].classList.add('symbol');
		} else {
			let i = serialNumber.length - 1;
			if (i == -1) {
				i = 0;
			}
			previewSerialNumber[i].classList.remove('symbol');
		}
		if (serialNumber[serialNumber.length - 1] === ' ') {
			previewSerialNumber[serialNumber.length - 1].style.background = imageEmpty;
		}

		switch (serialNumber.length) {
			case 0:
				previewSerial1.style.background = imageZero;
				previewSerial2.style.background = imageZero;
				previewSerial3.style.background = imageDash;
				previewSerial4.style.background = imageZero;
				previewSerial5.style.background = imageZero;
				previewSerial6.style.background = imageZero;

				previewSerial1.classList.remove('symbol');
				previewSerial3.classList.add('symbol');
				break;

			case 1:
				previewSerial1.style.background = `url(img/num/num_${serialNumber[0]}.svg) center center / contain no-repeat`;
				previewSerial2.style.background = imageZero;
				previewSerial3.style.background = imageDash;
				previewSerial4.style.background = imageZero;
				previewSerial5.style.background = imageZero;
				previewSerial6.style.background = imageZero;

				previewSerial2.classList.remove('symbol');
				break;

			case 2:
				previewSerial1.style.background = `url(img/num/num_${serialNumber[0]}.svg) center center / contain no-repeat`;
				previewSerial2.style.background = `url(img/num/num_${serialNumber[1]}.svg) center center / contain no-repeat`;
				previewSerial3.style.background = imageDash;
				previewSerial4.style.background = imageZero;
				previewSerial5.style.background = imageZero;
				previewSerial6.style.background = imageZero;

				previewSerial3.classList.add('symbol');
				break;

			case 3:
				previewSerial1.style.background = `url(img/num/num_${serialNumber[0]}.svg) center center / contain no-repeat`;
				previewSerial2.style.background = `url(img/num/num_${serialNumber[1]}.svg) center center / contain no-repeat`;
				previewSerial3.style.background = `url(img/num/num_${serialNumber[2]}.svg) center center / contain no-repeat`;
				previewSerial4.style.background = imageZero;
				previewSerial5.style.background = imageZero;
				previewSerial6.style.background = imageZero;

				previewSerial4.classList.remove('symbol');
				break;

			case 4:
				previewSerial1.style.background = `url(img/num/num_${serialNumber[0]}.svg) center center / contain no-repeat`;
				previewSerial2.style.background = `url(img/num/num_${serialNumber[1]}.svg) center center / contain no-repeat`;
				previewSerial3.style.background = `url(img/num/num_${serialNumber[2]}.svg) center center / contain no-repeat`;
				previewSerial4.style.background = `url(img/num/num_${serialNumber[3]}.svg) center center / contain no-repeat`;
				previewSerial5.style.background = imageZero;
				previewSerial6.style.background = imageZero;

				previewSerial5.classList.remove('symbol');
				break;

			case 5:
				previewSerial1.style.background = `url(img/num/num_${serialNumber[0]}.svg) center center / contain no-repeat`;
				previewSerial2.style.background = `url(img/num/num_${serialNumber[1]}.svg) center center / contain no-repeat`;
				previewSerial3.style.background = `url(img/num/num_${serialNumber[2]}.svg) center center / contain no-repeat`;
				previewSerial4.style.background = `url(img/num/num_${serialNumber[3]}.svg) center center / contain no-repeat`;
				previewSerial5.style.background = `url(img/num/num_${serialNumber[4]}.svg) center center / contain no-repeat`;
				previewSerial6.style.background = imageZero;

				previewSerial6.classList.remove('symbol');
				break;

			case 6:
				previewSerial1.style.background = `url(img/num/num_${serialNumber[0]}.svg) center center / contain no-repeat`;
				previewSerial2.style.background = `url(img/num/num_${serialNumber[1]}.svg) center center / contain no-repeat`;
				previewSerial3.style.background = `url(img/num/num_${serialNumber[2]}.svg) center center / contain no-repeat`;
				previewSerial4.style.background = `url(img/num/num_${serialNumber[3]}.svg) center center / contain no-repeat`;
				previewSerial5.style.background = `url(img/num/num_${serialNumber[4]}.svg) center center / contain no-repeat`;
				previewSerial6.style.background = `url(img/num/num_${serialNumber[5]}.svg) center center / contain no-repeat`;
				break;
		}
	}
}

class generate {
	async render() {
		var renderScale = optionScale.value;
		var renderWidth = 660 * renderScale;
		var renderHeight = 330 * renderScale;
		var renderOption = {
			width: renderWidth,
			height: renderHeight,
			style: {
				transform: `scale(${renderScale})`,
				'transform-origin': 'top left',
			},
		};

		normalContainer.style.display = 'none';
		this.diffuse(renderOption);
		if (optionHeight.checked) {
			await sleep(150);
			normalContainer.style.display = 'flex';
			this.height(renderOption);
		}

		layoutRender.showResult();
		buttonDownload.firstElementChild.removeAttribute('disabled');
	}

	diffuse(option) {
		domtoimage
			.toPng(platePreview, option)
			.then(function (dataUrl) {
				diffuseRender.innerHTML = '';
				var img = new Image();
				img.src = dataUrl;
				diffuseRender.appendChild(img);
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	height(option) {
		if (inputPlateType.value == 'private' || inputPlateType.value == 'kprivate') {
			platePreview.style.filter = 'grayscale(1) contrast(1.75)';
		} else {
			platePreview.style.filter = 'grayscale(1) contrast(1.75) invert(1)';
		}
		domtoimage
			.toPng(platePreview, option)
			.then(function (dataUrl) {
				normalRender.innerHTML = '';
				funcGenerate.normal(dataUrl, option);
				platePreview.style.filter = '';
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	normal(base64, option) {
		let strength = 0.5;
		let strengthx = 1;
		let strengthy = 1;

		let heightMap = document.createElement('img');
		heightMap.addEventListener('load', onLoad, false);
		heightMap.src = base64;

		let normalMap = document.createElement('canvas');
		normalRender.appendChild(normalMap);

		function onLoad() {
			normalMap.width = heightMap.width;
			normalMap.height = heightMap.height;

			normalMap.getContext('2d').drawImage(heightMap, 0, 0);

			generateNormal(normalMap);
		}

		function generateNormal(canvas) {
			let factor = strength * 4;
			// let factor = 4;
			let factorx = strengthx * 4 * factor;
			let factory = strengthy * 4 * factor;

			let ctx = canvas.getContext('2d');
			let width = canvas.width;
			let height = canvas.height;

			let src = ctx.getImageData(0, 0, width, height);
			let dst = ctx.createImageData(width, height);

			for (let i = 0, l = width * height * 4; i < l; i += 4) {
				let x1, x2, y1, y2;
				let valueX1 = i + factorx;
				let valueX2 = i - factorx;
				let valueY1 = i - width * factory;
				let valueY2 = i + width * factory;

				x1 = src.data[valueX1];
				x2 = src.data[valueX2];
				y1 = src.data[valueY1];
				y2 = src.data[valueY2];
				// if(i % (width * factor) == 0) {
				//     x1 = src.data[i];
				//     x2 = src.data[i + factor];
				// } else if (i % (width * factor) == (width - 5) * factor) {
				//     x1 = src.data[i - factor];
				//     x2 = src.data[i];
				// } else {
				//     x1 = src.data[i - factor];
				//     x2 = src.data[i + factor];
				// }

				// if (i < width * factor) {
				//     y1 = src.data[i];
				//     y2 = src.data[i + width * factor];
				// } else if(i > width * (height - 5) * factor){
				//     y1 = src.data[i - width * factor];
				//     y2 = src.data[i];
				// } else {
				//     y1 = src.data[i - width * factor];
				//     y2 = src.data[i + width * factor];
				// }

				dst.data[i] = x1 - x2 + 127;
				dst.data[i + 1] = y1 - y2 + 127;
				dst.data[i + 2] = 255;
				dst.data[i + 3] = 255;
			}
			ctx.putImageData(dst, 0, 0);

			domtoimage
				.toPng(normalMap)
				.then(function (dataUrl) {
					normalRender.innerHTML = '';
					var img = new Image();
					img.src = dataUrl;
					normalRender.appendChild(img);
				})
				.catch(function (error) {
					console.error(error);
				});
		}
	}
}

class button {
	terms() {
		if (checkAgreement.checked == true) {
			buttonGenerate.firstElementChild.removeAttribute('disabled');
		} else {
			buttonGenerate.firstElementChild.setAttribute('disabled', '');
		}
	}
	download() {
		let zip = new JSZip();
		let zipName = `jpLicensePlate - ${inputPlateType.value}_${inputWard.value.split(' - ')[0]}${
			inputEngine.value
		}_${inputHiragana.value}${inputSerial.value}@${optionScale.value}x.zip`;

		let diffuseB64 = diffuseRender.firstElementChild.src.split('base64,')[1];
		let normalB64 = normalRender.firstElementChild.src.split('base64,')[1];
		// let sealB64 = sealRender.firstElementChild.split('base64,')[1];
		// let sealNormalB64 = sealNrmRender.firstElementChild.split('base64,')[1];

		zip.file(`diffuseMap@${optionScale.value}.png`, diffuseB64, { base64: true });
		if (inputHeight.checked) {
			zip.file(`normalMap@${optionScale.value}.png`, normalB64, { base64: true });
		}
		zip.generateAsync({ type: 'blob' }).then(function (content) {
			saveAs(content, zipName);
		});
	}

	async reset() {
		//Vehicle Type
		inputVehType.selectedIndex = 0;

		//Plate Type
		inputPlateType.selectedIndex = 0;
		funcInput.listPlateType();
		funcPreview.updatePlateType();

		//Region
		inputRegion.selectedIndex = 0;
		inputPrefecture.selectedIndex = 0;
		inputMunicipality.selectedIndex = 0;
		inputWard.selectedIndex = 0;
		funcInput.resetRegion();
		funcPreview.updateRegion();

		//Engine
		inputEngine.value = '';
		funcPreview.updateEngine();

		//Hiragana
		funcPreview.updateHiragana();

		//Serial
		inputSerial.value = '';
		funcPreview.updateSerial();

		//Option
		optionScale.value = 1;
		optionHeight.checked = false;

		//Button
		if (buttonDownload.firstElementChild.hasAttribute('disabled') == false) {
			buttonDownload.firstElementChild.setAttribute('disabled', '');
		}

		//Result
		layoutRender.hideResult();
		await sleep(250);
		diffuseRender.firstElementChild.remove();
		normalRender.firstElementChild.remove();
		// sealRender.firstElementChild.remove();
		// sealNrmRender.firstElementChild.remove();
	}
}

var funcInput = new input();
var funcPreview = new preview();
var funcGenerate = new generate();
var funcButton = new button();
