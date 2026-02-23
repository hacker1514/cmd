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

function sql(){
	window.open("https://hacker1514.github.io/sp/db.html","_self");
	output("𝙴𝚗𝚓𝚘𝚢 𝚂𝚚𝚕 !","orange");
	}