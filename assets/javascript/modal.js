const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close-btn");

const modalClose = () => modal.close();
const modalOpen = (msg = null, type = 'text-dark') =>
{
	if (msg) modalBody.innerHTML = msg;
	if (type) modal.classList.add(type);	
	modal.showModal();
}
modal.onclose = e => 
{
	[
		"text-primary",
		"text-info",
		"text-secondary",
		"text-dark",
		"text-danger",
		"text-warning",
		"text-success",
		"splash"
	].map(e => modal.classList.remove(e));
	modalBody.innerHTML = null;
};
modalCloseBtn.onclick = modalClose;
// window.onload = modalOpen("Opened without navigation options");

export { modalOpen, modalClose };