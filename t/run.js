async function run(fn){

    if(!fn){
        output("Provide file name","red");
        return;
    }

    if(!fileMemory[fn]){
        output("File not found","red");
        return;
    }

    let parts = fn.split('.');
    let ext = parts[parts.length - 1];

    if(ext === "html"){
        run_html(fileMemory[fn]);
        return;
    }


    let code = fileMemory[fn];
    let language_id = getLanguageId(ext);

    if(!language_id){
        output("Unsupported file extension","red");
        return;
    }

    let userInput = await inputforcode();
    run_judge0(code, language_id, userInput);
}



function inputforcode(){
    return new Promise((resolve) => {

        let modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.background = "rgba(0,0,0,0.85)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "flex-start";
        modal.style.paddingTop = "100px";
        modal.style.zIndex = "9999";

        let box = document.createElement("div");
        box.style.background = "black";
        box.style.border = "1px solid orange";
        box.style.padding = "20px";
        box.style.width = "400px";

        let textarea = document.createElement("textarea");
        textarea.placeholder = "Enter program input...";
        textarea.style.width = "90%";
        textarea.style.height = "120px";
        textarea.style.background = "black";
        textarea.style.color = "orange";
        textarea.style.border = "1px solid orange";
        textarea.style.outline = "none";
        textarea.style.caretColor = "orange";
        textarea.style.padding = "8px";
        textarea.style.resize = "none";
        textarea.style.fontFamily = "monospace";

        textarea.value = "";
        textarea.innerHTML = "";

        let btn = document.createElement("button");
        btn.innerText = "🚀";
        btn.style.marginTop = "10px";
        btn.style.background = "black";
        btn.style.color = "orange";
        btn.style.border = "1px solid orange";
        btn.style.padding = "5px 14px";
        btn.style.cursor = "pointer";
        btn.style.display = "block";
        btn.style.marginLeft = "auto";

        btn.onclick = () => {
            let value = textarea.value.trim();
            document.body.removeChild(modal);
            resolve(value);
        };

        box.appendChild(textarea);
        box.appendChild(btn);
        modal.appendChild(box);
        document.body.appendChild(modal);

        setTimeout(() => {
            textarea.focus();
        }, 10);
    });
}






if(!document.getElementById("placeholder-style")){
    let style = document.createElement("style");
    style.id = "placeholder-style";
    style.innerHTML = `
        textarea::placeholder {
            color: orange;
            opacity: 0.6;
        }
    `;
    document.head.appendChild(style);
}

function getLanguageId(ext){

const languages = {
    "asm": 45,
    "sh": 46,
    "bash": 46,
    "c": 110,
    "cpp": 105,
    "cc": 105,
    "cs": 30,
    "clj": 86,
    "cbl": 77,
    "lisp": 55,
    "dart": 90,
    "d": 56,
    "ex": 57,
    "erl": 58,
    "fs": 87,
    "f90": 59,
    "go": 107,
    "groovy": 88,
    "hs": 61,
    "java": 91,
    "js": 102,
    "ts": 101,
    "kt": 111,
    "lua": 64,
    "nim": 9,
    "m": 79,
    "ml": 65,
    "pas": 67,
    "pl": 85,
    "php": 98,
    "pro": 69,
    "py": 113,
    "r": 99,
    "rb": 72,
    "rs": 108,
    "scala": 112,
    "swift": 83,
    "vb": 84,
    "sql": 82
};

    return languages[ext];
}

async function run_judge0(code, language_id, input){

    try {

        const submission = await fetch(
            "https://ce.judge0.com/submissions?base64_encoded=false&wait=false",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source_code: code,
                    stdin: input,
                    language_id: language_id
                })
            }
        );

        const submissionData = await submission.json();
        const token = submissionData.token;

        let resultData;
        let status;

        do {
            await new Promise(r => setTimeout(r, 800));
            const result = await fetch(
                `https://ce.judge0.com/submissions/${token}?base64_encoded=false`
            );
            resultData = await result.json();
            status = resultData.status.id;
        } while (status <= 2);

        let finalOutput = "";

        if(resultData.stdout){
            finalOutput = resultData.stdout;
        }
        else if(resultData.stderr){
            finalOutput = resultData.stderr;
        }
        else if(resultData.compile_output){
            finalOutput = resultData.compile_output;
        }
        else{
            finalOutput = "No output.";
        }

        output(finalOutput,"lime");

    } catch (error){
        output("Error: " + error.message,"red");
    }
}

document.addEventListener("keydown", function(e){

    if(e.target.tagName === "TEXTAREA" && e.key === "Tab"){

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
});