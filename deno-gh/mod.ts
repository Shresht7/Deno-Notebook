async function ghExec(...cmd: string[]) {

    const process = Deno.run({
        cmd: ['gh', ...cmd],
        stdout: 'piped',
        stderr: 'piped',
    })

    const [status, stdout, stderr] = await Promise.all([
        process.status(),
        process.output(),
        process.stderrOutput()
    ])

    if (status.code !== 0) {
        const error = new TextDecoder().decode(stderr)
        throw new Error(error)
    }

    return stdout

}