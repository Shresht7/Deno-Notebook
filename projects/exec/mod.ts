async function exec(...cmd: string[]) {
  const process = Deno.run({
    cmd,
    stdout: "piped",
    stderr: "piped",
  });

  const [status, stdout, stderr] = await Promise.all([
    process.status(),
    process.output(),
    process.stderrOutput(),
  ]);

  if (status.code !== 0) {
    const error = new TextDecoder().decode(stderr);
    throw new Error(error);
  }

  return stdout;
}

let stdout, text;

stdout = await exec("git", "branch");
text = new TextDecoder().decode(stdout);
console.log("Current Git Branch:", text.match(/\*\s+(.*)/)?.[1]);

stdout = await exec("gh", "api", "zen");
text = new TextDecoder().decode(stdout);
console.log("Zen:", text);
