function help(){
	let text=`ALL COMMANDS WITH USAGES
==============================================================

COMMAND           |\t USAGE
--------------------------------------------------------------
about           \t\t|\t developer info
clear           \t\t|\t to clear screen
copy            \t\t|\t file copy
create          \t\t|\t new file
delete          \t\t|\t deleting file
files           \t\t|\t list out files
get             \t\t|\t download file
help            \t\t|\t to get help
install         \t\t|\t download app
open            \t\t|\t opening file
rename          \t\t|\t change file_name
run             \t\t|\t custom language
show            \t\t|\t displaying file content
update          \t\t|\t modify user
upload          \t\t|\t add files
user            \t\t|\t account details
zip             \t\t|\t download more files
lang            \t\t|\t available languages

==============================================================
All JS Commands Are Allowed
==============================================================
`;
	output(text,"lightblue");
}

function lang(){
	let text=`AVAILABLE LANGUAGES
==============================================================

LANGUAGE         |\t VERSION
--------------------------------------------------------------
asm              \t|\t NASM 2.14.02
bash             \t\t|\t 5.0.0
basic            \t\t|\t FBC 1.07.1
bosque           \t\t|\t latest
c                \t\t|\t Clang 19.1.7
c3               \t\t|\t latest
cpp              \t\t|\t GCC 14.1.0
cs               \t\t|\t .NET SDK 8.0.302
clojure          \t\t|\t 1.10.1
cobol            \t\t|\t GnuCOBOL 2.2
lisp             \t\t|\t SBCL 2.0.0
dart             \t\t|\t 2.19.2
d                \t\t|\t DMD 2.089.1
elixir           \t\t|\t 1.9.4
erlang           \t\t|\t OTP 22.2
fsharp           \t\t|\t .NET Core 3.1.202
fortran          \t\t|\t GFortran 9.2.0
go               \t\t|\t 1.23.5
groovy           \t\t|\t 3.0.3
haskell          \t\t|\t GHC 8.8.1
java             \t\t|\t JDK 17.0.6
javafx           \t\t|\t JDK 17.0.6 + OpenJFX 22.0.2
js               \t\t|\t Node.js 22.08.0
kotlin           \t\t|\t 2.1.10
lua              \t\t|\t 5.3.5
nim              \t\t|\t stable
objc             \t\t|\t Clang 7.0.1
ocaml            \t\t|\t 4.09.0
octave           \t\t|\t 5.1.0
pascal           \t\t|\t FPC 3.0.4
perl             \t\t|\t 5.28.1
php              \t\t|\t 8.3.11
prolog           \t\t|\t GNU Prolog 1.4.5
python           \t\t|\t 3.14.0
r                \t\t\t|\t 4.4.1
ruby             \t\t|\t 2.7.0
rust             \t\t|\t 1.85.0
scala            \t\t|\t 3.4.2
sql              \t\t|\t SQLite 3.27.2
swift            \t\t|\t 5.2.3
ts               \t\t|\t 5.6.2
vb               \t\t|\t vbnc 0.0.0.5943

==============================================================
Use: run filename.extension
==============================================================
`;
	output(text,"lightblue");
}