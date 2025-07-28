import fs from "node:fs";

//* Lee el contenido del archivo sincronamente
const packacageData = fs.readFileSync("hola.txt", "utf-8");


if (!packacageData.includes("adios")) {
	//* Escribir contenido dentro del archivo
	fs.writeFileSync("hola.txt",packacageData +" adios");
}

console.log(packacageData);
