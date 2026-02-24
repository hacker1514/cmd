function shw(fn){
	output("𝙵𝚒𝚕𝚎 𝙲𝚘𝚗𝚝𝚎𝚗𝚝 :\n\n"+fileMemory[fn],"lightblue");
}

function starter(){

	for(let i=0;i<localStorage.length;i++){

		let key=localStorage.key(i);
		let val=localStorage.getItem(key);

		if(key.startsWith("f$")){

			let fname=key.substring(2);

			if(!file_names.includes(fname)){
				file_names.push(fname);
			}

			fileMemory[fname]=val;
		}
	}

	loadDatabase();
}

function uf(fname){
	if(fname && fileMemory[fname]!==undefined){
		localStorage.setItem("f$"+fname,fileMemory[fname]);
	}
}

function df(fname){

	if(!fname) return;

	localStorage.removeItem("f$"+fname);

	delete fileMemory[fname];

	file_names=file_names.filter(x=>x!=fname);
}

function rn(cf,nf){

	if(!cf || !nf) return;

	if(!file_names.includes(cf)){
		output("𝙵𝚒𝚕𝚎 '"+cf+"'  𝙽𝚘𝚝 𝙵𝚘𝚞𝚗𝚍 !","red");
		return;
	}

	fileMemory[nf]=fileMemory[cf];

	uf(nf);

	df(cf);

	if(!file_names.includes(nf)){
		file_names.push(nf);
	}
   output("𝚛𝚎𝚗𝚊𝚖𝚎𝚍 𝚏𝚒𝚕𝚎 𝚏𝚛𝚘𝚖  "+cf+" \t𝚝𝚘\t"+nf,"green");
}


function get(fname){

	if(!fname) return;

	let allowed = /^[a-zA-Z0-9_\-]+\.[a-zA-Z0-9]+$/;

	if(!allowed.test(fname)){
		output("𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝙵𝚒𝚕𝚎 𝙽𝚊𝚖𝚎 !","red");
		return;
	}

	let data=fileMemory[fname];

	if(data===undefined){
		output("𝙵𝚒𝚕𝚎 𝙽𝚘𝚝 𝙵𝚘𝚞𝚗𝚍 !","red");
		return;
	}

	let blob=new Blob([data],{type:"text/plain"});
	let url=URL.createObjectURL(blob);

	let a=document.createElement("a");
	a.href=url;
	a.download=fname;
	a.click();

	URL.revokeObjectURL(url);

	output("𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎 !","lime");
}


function upload(){

	let input=document.createElement("input");
	input.type="file";

	input.onchange=function(){

		let file=input.files[0];
		if(!file) return;

		let fname=file.name;

		let reader=new FileReader();

		reader.onload=function(){

			let content=reader.result;

			fileMemory[fname]=content;
			localStorage.setItem("f$"+fname,content);

			if(!file_names.includes(fname)){
				file_names.push(fname);
			}

			output("𝚄𝚙𝚕𝚘𝚊𝚍 𝚂𝚞𝚌𝚌𝚎𝚜𝚜 !","lime");
		};

		reader.readAsText(file);
	};

	input.click();
}

async function zip(...fnames){

	if(fnames.length===0) return;

	if(typeof JSZip==="undefined"){
		output("Zip library not loaded !","red");
		return;
	}

	let zip=new JSZip();

	for(let f of fnames){

		if(fileMemory[f]!==undefined){
			zip.file(f,fileMemory[f]);
		}
	}

	let content=await zip.generateAsync({type:"blob"});

	let a=document.createElement("a");
	a.href=URL.createObjectURL(content);
	a.download="files.zip";
	a.click();

	output("𝚉𝙸𝙿 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚎𝚍 !","lime");
}