const url = Deno.args[0]; //  Get url from arguments

//  Exit if invalid url
if (!url) {
  console.log("No url provided");
  Deno.exit(1);
}

const res = await fetch(url); //  Make fetch request

const body = new Uint8Array(await res.arrayBuffer()); // read the response

await Deno.stdout.write(body); //  Write to stdout
