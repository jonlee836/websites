// puts buttons inside google canvas.... i'm not sure if this is worth the trouble.'
function OverlayCtrl(ctrlDiv, mapdata) {

	// Set the center property upon construction
	ctrlDiv.style.clear = 'both';

	// Set mouse over text for the Stalingrad button
	var Stalingrad_Button = document.createElement('div');
	Stalingrad_Button.id = 'Stalingrad_Button';
	Stalingrad_Button.title = 'Show aerial images';
	ctrlDiv.appendChild(Stalingrad_Button);

	// Set text for Stalingrad button and its control interior
	var Stalingrad_Button_Text = document.createElement('div');
	Stalingrad_Button_Text.id = 'Stalingrad_Button_Text';
	Stalingrad_Button_Text.innerHTML = 'Stalingrad';
	Stalingrad_Button.appendChild(Stalingrad_Button_Text);

	// Set mouse over text for the Volgagrad and button control border
	var Volgagrad_Button = document.createElement('div');
	Volgagrad_Button.id = 'Volgagrad_Button';
	Volgagrad_Button.title = 'Show satellite images';
	ctrlDiv.appendChild(Volgagrad_Button);

	// Set text for Volgagrad button
	var Volgagrad_Button_Text = document.createElement('div');
	Volgagrad_Button_Text.id = 'Volgagrad_Button_Text';
	Volgagrad_Button_Text.innerHTML = 'Volgagrad';
	Volgagrad_Button.appendChild(Volgagrad_Button_Text);

	ctrlDiv.addEventListener('click', function() {
		console.log("worked");
	});

	Stalingrad_Button.addEventListener('click', function() {
		console.log("Stalingrad Button");
	});

	Volgagrad_Button.addEventListener('click', function() {
		console.log("Volgagrad Button");
	});
}
