function run(file){
	let fn=file;
	file=file.split('.');
	if(file[1]==="py"){
		run_python(fileMemory[fn]);
		}else if(file[1]==="js"){
			run_js(fileMemory[fn]);
		}else{
			output("𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎  𝙻𝚊𝚗𝚐𝚞𝚊𝚐𝚎𝚜 :\n\n𝙿𝚢𝚝𝚑𝚘𝚗\n𝙹𝚊𝚟𝚊 𝚜𝚌𝚛𝚒𝚙𝚝\n\n𝚆𝚘𝚛𝚔𝚒𝚗𝚐 𝚒𝚜 𝚐𝚘𝚒𝚗𝚐 𝚘𝚗......","lime");
		}
}

const observer = new MutationObserver(() => {

    document.querySelectorAll("textarea").forEach(ta => {
        ta.autocomplete = "off";
        ta.spellcheck = false;
        ta.setAttribute("autocorrect","off");
        ta.setAttribute("autocapitalize","off");
    });

});

observer.observe(document.body, {
    childList: true,
    subtree: true
});


document.addEventListener("keydown", function(e){

    if(e.target.tagName === "TEXTAREA"){

        if(e.key === "Tab"){

            e.preventDefault();

            let textarea = e.target;

            let start = textarea.selectionStart;
            let end = textarea.selectionEnd;

            let spaces = "    "; 

            textarea.value =
                textarea.value.substring(0,start) +
                spaces +
                textarea.value.substring(end);

            textarea.selectionStart =
                textarea.selectionEnd =
                start + spaces.length;
        }
    }

});