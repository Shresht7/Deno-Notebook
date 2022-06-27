//  JSON Data
//  ---------

const jsonResponse = await fetch("https://api.github.com/users/denoland");
const jsonData = await jsonResponse.json();
console.log(jsonData);

//  HTML Data
//  ---------

const textResponse = await fetch("https://deno.land/");
const textData = await textResponse.text();
console.log(textData);

//  Recieving a file
//  ----------------

import { writableStreamFromWriter } from "https://deno.land/std@0.121.0/streams/mod.ts";

//  Get SVG from deno.land
const logoSvgResponse = await fetch("https://deno.land/logo.svg");

if (logoSvgResponse.body) {
  const file = await Deno.open("./logo.svg", { write: true, create: true }); //  Open target file (create if needed)
  const writeableStream = writableStreamFromWriter(file);
  await logoSvgResponse.body.pipeTo(writeableStream);
}

//  Sending a file

import { readableStreamFromReader } from "https://deno.land/std@0.121.0/streams/mod.ts";

const file = await Deno.open("./logo.svg", { read: true });
const readableStream = readableStreamFromReader(file);

await fetch("https://example.com/", {
  method: "POST",
  body: readableStream,
});
