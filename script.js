import faker from 'faker';

function wait(ms = 0) {
	return new Promise(resolve => setTimeout(resolve, ms));	
}


const tbody = document.querySelector('tbody');

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
	persons.push(persons);
});

const displayList = data => {
	tbody.innerHTML = data
		.map(
			(person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td>${person.lastName}</td>
        <td>${person.firstName}</td>
        <td>${person.jobTitle}</td>
        <td>${person.jobArea}</td>
        <td>${person.phone}</td>
        <td>
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
};

const editPartnerPopup = (e) => {
	// create edit popup here
	const tableRow = e.currentTarget;
	const firstName = tableRow.querySelector('td ~ td').textContent;
	console.log(firstName);

	return new Promise(async function(resolve) {
		const popupForm = document.createElement('form');
		popupForm.classList.add('popup');
		popupForm.insertAdjacentHTML('afterbegin',
		`
		<fieldset>
			<form action="/">
				<label for="last-Name">Enter your lastname
					<input type="text" id="last-name" required>
				</label>
				<label for="first-name">Enter your firstname
					<input type="text" id="first-name" required>
				</label>
				<label for="job-title">Enter your job title
					<input type="text" id="job-title" required>
				</label>
				<label for="job-area">Enter your job area
					<input type="text" id="job-area" required>
				</label>
				<label for="phone-number">Entr your phone number
					<input type="number" id="phone-number" required>
				</label>
				<button type="submit" class="save-btn">Save</button>
				<button class="cancel-btn">Cancel</button>
			</form>
		</fieldset>
		`)
	
		 // insert popup into DOM
		document.body.appendChild(popupForm);
		popupForm.classList.add('open');
		await wait(20);
		//popupForm.classList.add('open');
	})
};

const deletePartner = (e) => {
	// code delete function gere
};

const deleteDeletePopup = (e) => {
	// create confirmation popup here
	const deletePopup = e.target.matches('button.cancel-btn');
	if(e.target.matches('button.cancel-btn')) {
		deletePopup.classList.remove('.cancel-btn');
	}
};

displayList(persons);

tbody.addEventListener('click', editPartner);
tbody.addEventListener('click', deleteDeletePopup)
