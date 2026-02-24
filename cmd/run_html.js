function run_html(code){

	let iframe = document.getElementById("html_output");

	iframe.style.display = "block";
	iframe.style.width = "100vw";
	iframe.style.height = "100vh";
	iframe.style.border = "none";

	let html = `
	<button onclick="parent.postMessage('HTML_CLOSE','*')">
	🔺 Close
	</button>
	<br><br>
	` + code;

	iframe.srcdoc = html;
}

