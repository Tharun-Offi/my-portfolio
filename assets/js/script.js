const menu = document.querySelector(".menu");
const menuItems = menu.querySelectorAll("li");
const showContactsBtn = document.getElementById("showContacts");
const aside = document.querySelector(".aside");
const main = document.querySelector("main");
const section = main.querySelectorAll("section");

const formInput = document.querySelectorAll("[data-form-input]");
const form = document.querySelector("[data-form]");
const formBtn = document.querySelector(".formBtn");
console.log(formBtn);
console.log(form);
console.log(formInput);

menuItems.forEach((item, index) => {
	item.addEventListener("click", () => {
		const activeItem = menu.querySelector(".active");
		activeItem.classList.remove("active");
		item.classList.add("active");

		const activeSection = main.querySelector("section.active");
		activeSection.classList.toggle("active");
		section[index].classList.toggle("active");
	});
});

showContactsBtn.addEventListener("click", () => {
	aside.classList.toggle("active");
});

formInput.forEach((element) => {
	element.addEventListener("input", () => {
		if (form.checkValidity()) {
			formBtn.removeAttribute("disabled");
		} else {
			formBtn.setAttribute("disabled", "");
		}

		console.log('hi')
	});
});

document.querySelector("[data-form]").addEventListener("submit", async function (e) {
	e.preventDefault();

	const form = e.target;
	const formData = new FormData(form);
	const fullname = formData.get("name");
	const email = formData.get("email");
	const message = formData.get("message");

	// Set custom subject line
	const subject = `${fullname} sent a message from the website`;
	formData.set("subject", subject);

	// Display overlay message
	const status = document.createElement("div");
	status.id = "form-status";
	status.textContent = "Sending...";
	status.style.position = "fixed";
	status.style.top = "10px";
	status.style.left = "50%";
	status.style.fontFamily = "Montserrat, sans - serif";
	status.style.transform = "translateX(-50%)";
	status.style.backgroundColor = "#333";
	status.style.color = "#fff";
	status.style.padding = "10px 20px";
	status.style.borderRadius = "5px";
	status.style.zIndex = "1000";
	document.body.appendChild(status);

	try {
		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			body: formData,
		});

		const result = await response.json();

		if (response.ok) {
			status.textContent = "Thank you! Your message has been sent successfully.";
			form.reset();
		} else {
			status.textContent = `Error: ${result.message}`;
		}
	} catch (error) {
		status.textContent = "An unexpected error occurred. Please try again later.";
	}

	// Hide the overlay message after 5 seconds
	setTimeout(() => {
		status.remove();
	}, 5000);
});