//  READING A TEXT FILE
//  ===================

const text = await Deno.readTextFile('./manual/00_helloWorld.ts')
console.log(text)

//  WRITING A TEXT FILE
//  ===================

await Deno.writeTextFile('.gitignore', '*.svg')