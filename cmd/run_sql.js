let db;

async function initDB(){
    const SQL = await initSqlJs({
        locateFile: file => 
        "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm"
    });

    db = new SQL.Database();

    loadDatabaseFromStorage();
}

initDB();

function saveDatabase(){
    if(!db) return;

    let data = db.export();
    let base64 = btoa(
        String.fromCharCode(...new Uint8Array(data))
    );

    localStorage.setItem("SQL_DB", base64);
}

function loadDatabaseFromStorage(){
    let stored = localStorage.getItem("SQL_DB");

    if(stored && db){
        let binary = atob(stored);
        let bytes = new Uint8Array(binary.length);

        for(let i=0;i<binary.length;i++){
            bytes[i] = binary.charCodeAt(i);
        }

        db = new (initSqlJs()).Database(bytes);
    }
}


async function run_sql(code){
   
   code=code.replace("sql ","");

    try{

        if(!db){
            await initDB();
        }

        let results = db.exec(code);

        if(results.length === 0){
            output("Query executed successfully","lightblue");
            saveDatabase();
            return;
        }

        let display = "";

        results.forEach(table=>{
            display += table.columns.join(" | ") + "\n";
            display += "-".repeat(40) + "\n";

            table.values.forEach(row=>{
                display += row.join(" | ") + "\n";
            });
        });

        output(display,"lightblue");

        saveDatabase();

    }catch(e){
        output("Error: "+e.message,"red");
    }
}


async function loadDatabase(){

    let stored = localStorage.getItem("SQL_DB");

    if(!stored){
        output("𝙽𝚘 𝚍𝚊𝚝𝚊𝚋𝚊𝚜𝚎 𝚏𝚘𝚞𝚗𝚍 𝚒𝚗 𝚜𝚝𝚘𝚛𝚊𝚐𝚎","red");
        return null;
    }

    const SQL = await initSqlJs({
        locateFile: file =>
        "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm"
    });

    let binary = atob(stored);

    let bytes = new Uint8Array(binary.length);

    for(let i=0;i<binary.length;i++){
        bytes[i] = binary.charCodeAt(i);
    }

    db = new SQL.Database(bytes);

    output("𝙳𝚊𝚝𝚊𝚋𝚊𝚜𝚎 𝚕𝚘𝚊𝚍𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢","cyan");
}