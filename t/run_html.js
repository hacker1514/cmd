function run_html(code){

	let iframe = document.getElementById("html_output");

	iframe.style.display = "block";
	iframe.style.position = "fixed";
	iframe.style.top = "0";
	iframe.style.left = "0";
	iframe.style.width = "100vw";
	iframe.style.height = "100vh";
	iframe.style.border = "none";
	iframe.style.zIndex = "9999";

	let html = `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>Preview</title>
		<style>
			body{
				margin:0;
				font-family:Arial, sans-serif;
			}
			#closeBtn{
				position:fixed;
				top:10px;
				right:15px;
				padding:8px 14px;
				background:#ff3b3b;
				color:#fff;
				border:none;
				border-radius:6px;
				cursor:pointer;
				z-index:99999;
			}
		</style>
	</head>
	<body>

	<button id="closeBtn" onclick="parent.postMessage('HTML_CLOSE','*')">
		Close ✖
	</button>

	<script>
		function ensureCloseButton(){
			if(!document.getElementById("closeBtn")){
				let btn=document.createElement("button");
				btn.id="closeBtn";
				btn.innerHTML="✖";
				btn.style.position="fixed";
				btn.style.top="10px";
				btn.style.right="15px";
				btn.style.padding="8px 14px";
				btn.style.background="#ff3b3b";
				btn.style.color="#fff";
				btn.style.border="none";
				btn.style.borderRadius="6px";
				btn.style.cursor="pointer";
				btn.style.zIndex="99999";
				btn.onclick=function(){
					parent.postMessage('HTML_CLOSE','*');
				};
				document.body.appendChild(btn);
			}
		}

		const originalWrite=document.write;
		document.write=function(content){
			originalWrite.call(document,content);
			setTimeout(ensureCloseButton,0);
		};

		window.onload=ensureCloseButton;
	</script>

	` + code + `

	</body>
	</html>
	`;

	iframe.srcdoc = html;
}