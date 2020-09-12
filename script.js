import faker from 'faker';

function wait(ms = 0) {
	return new Promise(resolve => setTimeout(resolve, ms));	
}

const tbody = document.querySelector('tbody');

async function destroyPopup(popupForm) {
    popupForm.classList.remove('open');
    // delete the popupForm right after
    await wait(1000);
   	// remove it from the DOM
    popupForm.remove();
    // remove it from the javascript memory
	popupForm = null;
	console.log(destroyPopup());
}


let persons = Array.from({ length: 10 }, () => {
	return {
		id: faker.random.uuid(),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		jobTitle: faker.name.jobTitle(),
		jobArea: faker.name.jobArea(),
		phone: faker.phone.phoneNumber(),
		picture: faker.image.avatar(100, 100),
	};
});

const displayList = data => {
	tbody.innerHTML = data
		.map(
			(person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
        <td class="td"><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td class="lastname">${person.lastName}</td>
        <td class="firstname">${person.firstName}</td>
        <td class="jobtitle">${person.jobTitle}</td>
        <td class="jobarea">${person.jobArea}</td>
        <td class="phone">${person.phone}</td>
        <td class="delete">
            <button class="edit">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
        </td>
    </tr>
`
		)
		.join('');
};

const editPartner = (e) => {
	// code edit function here
	if (e.target.closest(".edit")) {
		editPartnerPopup(e);	
	}

	if(e.target.closest('button.delete')) {
		deleteDeletePopup(e);
	 }
};

const editPartnerPopup = (e) => {
	// create edit popup here
	let tableRow = e.target.closest("tr");
	let lastName = tableRow.querySelector('.lastname');
	let firstName = tableRow.querySelector('.firstname');
	let jobTitle = tableRow.querySelector('.jobtitle');
	let jobArea = tableRow.querySelector('.jobarea');
	let phone = tableRow.querySelector('.phone');

	return new Promise(async function(resolve) {
		const popupForm = document.createElement('form');
		popupForm.classList.add('popup');
		popupForm.classList.add('open');
		popupForm.insertAdjacentHTML('afterbegin',
		`
		<fieldset>
			<form action="/" class="formEl">
				<label for="last-Name">Enter your lastname
					<input value="${lastName.textContent}" type="text" id="last-name" required>
				</label>
				<label for="first-name">Enter your firstname
					<input value="${firstName.textContent}" type="text" id="first-name" required>
				</label>
				<label for="job-title">Enter your job title
					<input value="${jobTitle.textContent}" type="text" id="job-title" required>
				</label>
				<label for="job-area">Enter your job area
					<input value="${jobArea.textContent}" type="text" id="job-area" required>
				</label>
				<label for="phone-number">Entr your phone number
					<input value="${phone.textContent}" type="text" id="phone-number" required>
				</label>
				<button type="submit" class="save-btn">Save</button>
				<button class="cancel-btn" name="cancel">Cancel</button>
			</form>
		</fieldset>
		`)
	
		 // insert popup into DOM
		document.body.appendChild(popupForm);
		popupForm.classList.add('open');
		await wait(20);
		//popupForm.classList.add('open');
		popupForm.addEventListener('submit', e => {
			e.preventDefault();
			const inputSubmit = e.target.closest('form');
			const lastNameInput = inputSubmit.querySelector('#last-name').value;
			const firstNameInput = inputSubmit.querySelector('#first-name').value;
			const jobTitleInput = inputSubmit.querySelector('#job-title').value;
			const jobAreaInput = inputSubmit.querySelector('#job-area').value;
			const phoneNumberInput = inputSubmit.querySelector('#phone-number').value;
			// resolve(e.target.input.value);

			firstName.textContent = firstNameInput;
			lastName.textContent = lastNameInput;
			jobTitle.textContent = jobTitleInput;
			jobArea.textContent = jobAreaInput;
			phone.textContent = phoneNumberInput;
			// editPartner(popupForm);
			 destroyPopup(popupForm);
		}, { once: true });
		if(popupForm.cancel) {
			const cancelBtn = popupForm.cancel;
			cancelBtn.addEventListener('click', (e) => {
				console.log('I am a cancel');
				destroyPopup(popupForm);
			},{ once: true });
		}
	})
	
};


 const deletePartner = (e) => {
	 // code delete function gere
	// e.preventDefault();
 	// const deletePopup = e.target.closest('button.cancel-btn');
 	// if(deletePopup) {
	// deletePopup.classList.remove('open');
	
	// console.log(e.target);
	// }
 	// deleteDeletePopup();

 };
 

const deleteDeletePopup = (e) => {
	// // create confirmation popup here
	return new Promise(async function(resolve) {
		const popupConfirm = document.createElement('div');
		popupConfirm.classList.add('popup');
		popupConfirm.insertAdjacentHTML('afterbegin',
		`
		<div class="delete-confirm">
			<p>Are you sure you want to delete it!</p>
			<button class="delete-btn">Delete</button>
			<button class="cancel-btn cancel" name="cancel">Cancel</button>
		</div>
		`);

		const confirmation = (e) => {
			const confirmDelete = e.target.closest('button.cancel-btn');
			const deleteDelete = e.target.closest('button.delete-btn');
			if(confirmDelete) {
				console.log('You cancel it');
				destroyPopup(popupConfirm);
			}
			if(deleteDelete) {
				e.preventDefault();
				console.log("deleted");
				popupConfirm.classList.remove('open');
				destroyPopup(popupConfirm);

			}
		}
		
		window.addEventListener('click', confirmation);

	
		 // insert popup into DOM
		document.body.appendChild(popupConfirm);
		// popupConfirm.classList.add('open');
		await wait(20);
		popupConfirm.classList.add('open');
		// if(popupConfirm.cancel) {
		// 	const btnCancel = popupConfirm.cancel;
		// 	btnCancel.addEventListener('click', (e) => {
		// 		console.log('I am a cancel');
		// 		destroyPopup(popupConfirm);
		// 	},{ once: true });
		// }
	})

};


displayList(persons);

window.addEventListener('click', editPartner);
window.addEventListener('click', deletePartner);
