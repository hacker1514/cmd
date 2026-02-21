let history = [];
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

            if (command === "about") {
                about();
                return;
            }
            if (command === "install") {
                install();
	output("𝙸𝚗𝚜𝚝𝚊𝚕𝚕𝚎𝚍 !","lime");
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
	let text=`𝙰𝚕𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜 𝚠𝚒𝚝𝚑 𝚞𝚜𝚊𝚐𝚎𝚜\n----------------------------------------------------\n𝚌𝚘𝚖𝚖𝚊𝚗𝚍   \t:\t𝚞𝚜𝚊𝚐𝚎\n𝚌𝚕𝚎𝚊𝚛      \t:\t𝚝𝚘 𝚌𝚕𝚎𝚊𝚛 𝚜𝚌𝚛𝚎𝚎𝚗\n𝚑𝚎𝚕𝚙        \t:\t𝚝𝚘 𝚐𝚎𝚝 𝚑𝚎𝚕𝚙\n𝚊𝚋𝚘𝚞𝚝     \t:\t𝚍𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛 𝚒𝚗𝚏𝚘\n𝚒𝚗𝚜𝚝𝚊𝚕𝚕   \t:\t𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚊𝚙𝚙\n\n𝙰𝚕𝚕 𝙹𝚂 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 𝚊𝚛𝚎 𝚊𝚕𝚕𝚘𝚠𝚎𝚍\n\n----------------------------------------------------\n`;
	output(text,"lightblue");
}

function about(){
	let text=`𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛     \t:  𝙽𝚒𝚛𝚊𝚗𝚓𝚊𝚗 𝙺𝚞𝚖𝚊𝚛 𝙺\n𝙴𝚖𝚊𝚒𝚕           \t \t:  𝚑𝚊𝚌𝚔𝚎𝚛𝚎𝚗𝚟𝚒𝚛𝚘𝚗𝚖𝚎𝚗𝚝𝟸𝟶𝟸𝟻@𝚐𝚖𝚊𝚒𝚕.𝚌𝚘𝚖\n𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗  \t:  𝙸𝚝𝚜 𝚊 𝚙𝚕𝚊𝚝𝚏𝚘𝚛𝚖 𝚠𝚑𝚎𝚛𝚎 𝚊𝚕𝚕 𝙻𝚊𝚗𝚐𝚞𝚊𝚐𝚎𝚜 𝚊𝚗𝚍 𝚝𝚘𝚘𝚕𝚜 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚏𝚘𝚛 𝚏𝚛𝚎𝚎\n`;
	output(text,"tomato");
}
