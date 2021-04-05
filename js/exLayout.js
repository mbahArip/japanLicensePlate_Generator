function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

class burger {
	async showList() {
		for (let i = 0; i < navbarBurgerList.length; i++) {
			navbarBurgerList[i].style.right = '0px';
			await sleep(250);
			navbarBurgerList[i].style.opacity = 1;
		}
	}
	async hideList() {
		for (let i = 0; i < navbarBurgerList.length; i++) {
			navbarBurgerList[i].style.right = '-200px';
			await sleep(100);
			navbarBurgerList[i].style.opacity = 0;
		}
	}

	async burgerOpen() {
		navbarBurgerMenu.style.display = 'flex';
		await sleep(50);
		navbarBurgerMenu.style.opacity = 1;
		this.showList();
	}
	async burgerClose() {
		this.hideList();
		await sleep(500);
		navbarBurgerMenu.style.opacity = 0;
		await sleep(250);
		navbarBurgerMenu.style.display = 'none';
	}

	async changeBurger(destination, url) {
		this.burgerClose();
		let currentURL = window.location.hash;
		let current;

		switch (currentURL) {
			case '':
				current = generatorContainer;
				break;
			case '#generator':
				current = generatorContainer;
				break;

			case '#download':
				current = downloadContainer;
				break;
		}

		window.location.hash = `#${url}`;
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;

		current.style.opacity = 0;
		await sleep(500);
		current.style.display = 'none';
		destination.style.display = 'flex';
		await sleep(50);
		destination.style.opacity = 1;

		layoutNavigation.checkPage();
	}
}

class navigation {
	hideContainer(container) {
		container.style.display = 'none';
		container.style.opacity = 0;
	}
	showContainer(container) {
		container.style.display = 'flex';
		container.style.opacity = 1;
	}

	checkPage() {
		let currentPage = window.location.hash;

		if (currentPage == '' || currentPage == '#generator') {
			this.hideContainer(downloadContainer);
			this.showContainer(generatorContainer);
			buttonNavDownload.removeAttribute('disabled');
			buttonNavGenerator.setAttribute('disabled', '');
		} else if (currentPage == '#download') {
			this.hideContainer(generatorContainer);
			this.showContainer(downloadContainer);
			buttonNavGenerator.removeAttribute('disabled');
			buttonNavDownload.setAttribute('disabled', '');
		}
	}
	async changePage(destination, url) {
		let currentURL = window.location.hash;
		let current;

		switch (currentURL) {
			case '':
				current = generatorContainer;
				break;
			case '#generator':
				current = generatorContainer;
				break;

			case '#download':
				current = downloadContainer;
				break;
		}

		window.location.hash = `#${url}`;
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;

		current.style.opacity = 0;
		await sleep(500);
		current.style.display = 'none';
		destination.style.display = 'flex';
		await sleep(50);
		destination.style.opacity = 1;

		this.checkPage();
	}

	version() {
		fetch('json/changelog.json')
			.then((r) => r.json())
			.then((data) => {
				version.innerHTML = `v${data[0]['version']}/${data[0]['build']}`;
			});
	}
}

class notification {
	expandChangelog() {
		if (changelogBottom.style.maxHeight) {
			changelogBottom.style.maxHeight = null;
		} else {
			changelogBottom.style.maxHeight = changelogBottom.firstElementChild.scrollHeight + 'px';
		}
	}

	expandTerms() {
		if (termsBottom.style.maxHeight) {
			termsBottom.style.maxHeight = null;
		} else {
			termsBottom.style.maxHeight = termsBottom.firstElementChild.scrollHeight + 'px';
		}
	}

	listChangelog() {
		fetch('json/changelog.json')
			.then((r) => r.json())
			.then((data) => {
				let sort = Object.keys(data).sort(function (a, b) {
					return b - a;
				});
				let length = Object.keys(data).length;
				changelogBottom.innerHTML = '';
				let table = document.createElement('table');
				changelogTop.firstElementChild.innerText = `Last Update : ${data[0]['update']}`;

				for (let i = 0; i < 10; i++) {
					let tr = document.createElement('tr');
					let tdDate = document.createElement('td');
					tdDate.innerHTML = data[sort[i]]['date'];
					let tdChange = document.createElement('td');
					tdChange.innerHTML = data[sort[i]]['change'];
					tr.appendChild(tdDate);
					tr.appendChild(tdChange);
					table.appendChild(tr);
				}

				changelogBottom.appendChild(table);
			});
	}
}

class render {
	async showResult() {
		resultLoading.style.opacity = 0;
		await sleep(250);
		resultLoading.style.display = 'none';
		renderContainer.style.display = 'flex';
		await sleep(50);
		renderContainer.style.opacity = 1;
	}

	async hideResult() {
		renderContainer.style.opacity = 0;
		await sleep(250);
		renderContainer.style.display = 'none';
		resultLoading.style.display = 'flex';
		await sleep(50);
		resultLoading.style.opacity = 1;
	}
}

var layoutBurger = new burger();
var layoutNavigation = new navigation();
var layoutNotification = new notification();
var layoutRender = new render();
