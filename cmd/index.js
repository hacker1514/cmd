let history = [];
let file_names=[];


let historyIndex = 0;

let main = document.getElementById("main");

console.log = function (...args) {
    output(args.join(" "), "lime");
};

console.clear = function () {
    clear();
};

function k(input) {
    input.addEventListener("keydown", async function (event) {

        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
            }
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                input.value = "";
            }
        }

        if (event.key === "Enter") {

            history.push(input.value);
            historyIndex = history.length;

            let rawCommand = input.value;
            let command = rawCommand.trim().toLowerCase();

            input.disabled = true;

            if (command === "clear") {
                clear();
                return;
            }

            if (command === "user") {
                user();
                return;
            }

            if (command === "update") {
                modify();
                return;
            }

            if (command === "about") {
                about();
                return;
            }
            if (command === "files") {
                show();
                return;
            }
            if (command === "install") {
                install();
	output("𝙸𝚗𝚜𝚝𝚊𝚕𝚕𝚎𝚍 !","lime");
                return;
            }



	if((command.split(' '))[0]==="get"){
		get((command.split(' '))[1]);
		return;
		}


	if((command.split(' '))[0]==="copy"){
		copy((command.split(' '))[1],(command.split(' '))[2]);
		return;
		}


	if((command.split(' '))[0]==="run"){
		run((command.split(' '))[1]);
		return;
		}

	if(command==="upload"){
		upload();
		return;
		}


            if ((command.split(' '))[0] === "create") {
                  let fname = (command.split(' '))[1];

    		create(fname);

    		if(fname && !file_names.includes(fname)){
       		 file_names.push(fname);
   		}
                return;
            }
            if ((command.split(' '))[0] === "open") {
                create((command.split(' '))[1]);
                return;
            }

            if ((command.split(' '))[0] === "delete") {
                del((command.split(' '))[1]);
       output("𝙵𝚒𝚕𝚎 𝙳𝚎𝚕𝚎𝚝𝚎𝚍 !","red");
                return;
            }

            if ((command.split(' '))[0] === "show") {
                shw((command.split(' '))[1]);
                return;
            }

            if ((command.split(' '))[0] === "rename") {
                rn((command.split(' '))[1],(command.split(' '))[2]);
                return;
            }

	if((command.split(' '))[0]==="zip"){

	let parts=command.split(' ');
	parts.shift();

	await zip(...parts);

	return;
	}


            if (command === "help") {
                help();
                return;
            }

            try {

                rawCommand = rawCommand.replace(
                    /console\.log\s*\((.*?)\)/g,
                    'output($1,"lime")'
                );

                rawCommand = rawCommand.replace(
                    /alert\s*\((.*?)\)/g,
                    'output($1,"lime")'
                );

                rawCommand = rawCommand.replace(
                    /console\.clear\s*\(\s*\)/g,
                    'clear()'
                );


                rawCommand = rawCommand.replace(
                    /prompt\s*\((.*?)\)/g,
                    'await take($1)'
                );

                let ot = await eval(`(async()=>{return ${rawCommand}})()`);

                if (ot !== undefined) {
                    output(String(ot), "lime");
                }	

            } catch (e) {
                output("𝙴𝚛𝚛𝚘𝚛 : " + e.message, "red");
            }
        }
    });
}

function createInput() {
    let p = document.createElement("p");
    p.innerHTML = `>>> <input type="text" autocomplete="off">`;

    let input = p.querySelector("input");

    main.appendChild(p);
    input.focus();

    k(input);
}

function clear() {
    main.innerHTML = "";
    createInput();
}

function output(t, c) {
    let p = document.createElement("p");
    p.textContent = t;
    p.style.color = c;
    main.appendChild(p);
    createInput();
}

async function take(question) {
    return new Promise(resolve => {

        let p = document.createElement("p");
        p.textContent = question;
        p.style.color = "orange";
        main.appendChild(p);

        let answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.autocomplete = "off";

        main.appendChild(answerInput);
        answerInput.focus();

        answerInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                let value = answerInput.value;
                answerInput.disabled = true;
                resolve(value);
                createInput();
            }
        });

    });
}

createInput();

function help(){
	let text=`𝙰𝚕𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜 𝚠𝚒𝚝𝚑 𝚞𝚜𝚊𝚐𝚎𝚜\n-------------------------------------------------------------------\n𝚌𝚘𝚖𝚖𝚊𝚗𝚍   \t:\t𝚞𝚜𝚊𝚐𝚎\n𝚌𝚕𝚎𝚊𝚛      \t:\t𝚝𝚘 𝚌𝚕𝚎𝚊𝚛 𝚜𝚌𝚛𝚎𝚎𝚗\n𝚑𝚎𝚕𝚙        \t:\t𝚝𝚘 𝚐𝚎𝚝 𝚑𝚎𝚕𝚙\n𝚊𝚋𝚘𝚞𝚝     \t:\t𝚍𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛 𝚒𝚗𝚏𝚘\n𝚒𝚗𝚜𝚝𝚊𝚕𝚕   \t:\t𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚊𝚙𝚙\n𝚌𝚛𝚎𝚊𝚝𝚎    \t:\t𝚗𝚎𝚠 𝚏𝚒𝚕𝚎\n𝚘𝚙𝚎𝚗      \t:\t𝚘𝚙𝚎𝚗𝚒𝚗𝚐 𝚏𝚒𝚕𝚎\n𝚍𝚎𝚕𝚎𝚝𝚎    \t:\t𝚍𝚎𝚕𝚎𝚝𝚒𝚗𝚐 𝚏𝚒𝚕𝚎\n𝚏𝚒𝚕𝚎𝚜        \t:\t𝚕𝚒𝚜𝚝 𝚘𝚞𝚝 𝚏𝚒𝚕𝚎𝚜\n𝚞𝚜𝚎𝚛        \t:\t𝚊𝚌𝚌𝚘𝚞𝚗𝚝 𝚍𝚎𝚝𝚊𝚒𝚕𝚜\n𝚞𝚙𝚍𝚊𝚝𝚎    \t:\t𝚖𝚘𝚍𝚒𝚏𝚢 𝚞𝚜𝚎𝚛\n𝚜𝚑𝚘𝚠      \t:\t𝚍𝚒𝚜𝚙𝚕𝚊𝚢𝚒𝚗𝚐 𝚏𝚒𝚕𝚎 𝚌𝚘𝚗𝚝𝚎𝚗𝚝\n𝚛𝚞𝚗  \t\t:\t𝚌𝚞𝚜𝚝𝚘𝚖 𝚕𝚊𝚗𝚐𝚞𝚊𝚐𝚎\n𝚛𝚎𝚗𝚊𝚖𝚎    \t:\t𝚌𝚑𝚊𝚗𝚐𝚎 𝚏𝚒𝚕𝚎_𝚗𝚊𝚖𝚎\n𝚐𝚎𝚝       \t\t:\t𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚏𝚒𝚕𝚎\n𝚞𝚙𝚕𝚘𝚊𝚍 \t\t:\t𝚊𝚍𝚍 𝚏𝚒𝚕𝚎𝚜\n𝚣𝚒𝚙       \t\t:\t𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚖𝚘𝚛𝚎 𝚏𝚒𝚕𝚎𝚜\n\n𝙰𝚕𝚕 𝙹𝚂 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 𝚊𝚛𝚎 𝚊𝚕𝚕𝚘𝚠𝚎𝚍\n-------------------------------------------------------------------\n`;
	output(text,"lightblue");
}

function about(){
	let text=`𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛     \t:  𝙽𝚒𝚛𝚊𝚗𝚓𝚊𝚗 𝙺𝚞𝚖𝚊𝚛 𝙺\n𝙴𝚖𝚊𝚒𝚕           \t \t:  𝚑𝚊𝚌𝚔𝚎𝚛𝚎𝚗𝚟𝚒𝚛𝚘𝚗𝚖𝚎𝚗𝚝𝟸𝟶𝟸𝟻@𝚐𝚖𝚊𝚒𝚕.𝚌𝚘𝚖\n𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗  \t:  𝙸𝚝𝚜 𝚊 𝚙𝚕𝚊𝚝𝚏𝚘𝚛𝚖 𝚠𝚑𝚎𝚛𝚎 𝚊𝚕𝚕 𝙻𝚊𝚗𝚐𝚞𝚊𝚐𝚎𝚜 𝚊𝚗𝚍 𝚝𝚘𝚘𝚕𝚜 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚏𝚘𝚛 𝚏𝚛𝚎𝚎\n`;
	output(text,"tomato");
}


let fileMemory = {};

function create(fn){
    let files = document.getElementById("files");

    let dialog = document.createElement("dialog");
    dialog.id = fn;

    let okBtn = document.createElement("button");
    okBtn.textContent = "";

    let closeBtn = document.createElement("button");
    closeBtn.textContent = "📁 "+fn;

    let textarea = document.createElement("textarea");

    textarea.style.flex = "1";

    textarea.value = fileMemory[fn] || "";

    textarea.addEventListener("input", function(){
        fileMemory[fn] = textarea.value;
    });

    okBtn.onclick = function(){
        dialog.close();
    };

    closeBtn.onclick = function(){
        dialog.remove();
    uf(fn);
   output("𝙵𝚒𝚕𝚎  𝙲𝚛𝚎𝚊𝚝𝚎𝚍  "+fn+" !","lime");
    };

    let topBar = document.createElement("div");
    topBar.appendChild(okBtn);
    topBar.appendChild(closeBtn);

    dialog.appendChild(topBar);
    dialog.appendChild(textarea);

    files.appendChild(dialog);

    dialog.showModal();
}

function del(fn){
    delete fileMemory[fn];
 file_names=file_names.filter(x=>x!=fn);
    let dialog = document.getElementById(fn);
    if(dialog){
        dialog.remove();
    }
  df(fn);
}

function show(){
	let text="𝙵𝚒𝚕𝚎𝚜  :\n\n";
	for(let i=0;i<file_names.length;i++){
		text+=file_names[i]+"   ";
		}
	output(text,"lime");
	}

function user(){
	 let un=localStorage.getItem("un");
	 let em=localStorage.getItem("em");
	 let ph=localStorage.getItem("ph");
	 if(un==null || em==null || ph==null){
			un="User123";
			ph="1234567891";
			em="kni-org@gmail.com";
			}
	 let text=`𝚄𝚜𝚎𝚛  \t:\t${un}\n𝙿𝚑𝚘𝚗𝚎  \t:\t${ph}\n𝙴𝚖𝚊𝚒𝚕  \t:\t${em}\n`;
	 output(text,"violet");
	}



function modify(){
	 let un=prompt("Enter Your Name :\n");
	 let em=prompt("Enter Your Email :\n");
	 let ph=prompt("Enter Your Phone Number:\n");
	 localStorage.setItem("un",un);
	 localStorage.setItem("em",em);
	 localStorage.setItem("ph",ph);
	 let text=`𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝙼𝚘𝚍𝚒𝚏𝚒𝚎𝚍 !`;
	 output(text,"lime");
	}