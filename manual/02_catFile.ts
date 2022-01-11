import { copy } from 'https://deno.land/std@0.120.0/streams/conversion.ts'

const fileNames = Deno.args //  Get file names from arguments

//  Iterate over fileNames
for (const fileName of fileNames) {
    const file = await Deno.open(fileName)  //  Open the file
    await copy(file, Deno.stdout)   //  Print contents to stdout
    file.close()
}