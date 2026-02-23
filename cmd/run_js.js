async function run_js(code) {

    let resultOutput = "";

    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
        resultOutput += args.join(" ") + "\n";
    };

    console.error = (...args) => {
        resultOutput += args.join(" ") + "\n";
    };

    console.warn = (...args) => {
        resultOutput += args.join(" ") + "\n";
    };

    try {
        let result = await eval(`(async () => { ${code} })()`);

        if (result !== undefined) {
            resultOutput += String(result) + "\n";
        }

        if (resultOutput.trim() !== "") {
            output(resultOutput.trim(), "lime");
        }else{
	   output("𝙽𝚘 𝙾𝚞𝚝𝚙𝚞𝚝 !","red");
	   }

    } catch (err) {
        output(err.toString(), "red");
    }

    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
}

function  copy(cf,nf){

	if(!cf || !nf){
		output("𝙿𝚕𝚎𝚊𝚜𝚎 𝙴𝚗𝚝𝚎𝚛 𝙵𝚒𝚕𝚎𝚜 !","red");
		return;
		}

	if(!file_names.includes(cf)){
		output("𝙵𝚒𝚕𝚎 '"+cf+"'  𝙽𝚘𝚝 𝙵𝚘𝚞𝚗𝚍 !","red");
		return;
	}

	fileMemory[nf]=fileMemory[cf];

	uf(nf);

	if(!file_names.includes(nf)){
		file_names.push(nf);
	}
   output("𝚌𝚘𝚙𝚒𝚎𝚍 𝚏𝚒𝚕𝚎 𝚏𝚛𝚘𝚖  "+cf+" \t𝚝𝚘\t"+nf,"green");
}