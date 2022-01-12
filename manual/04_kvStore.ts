//  Get command and args from cli arguments
const [cmd, ...rest] = Deno.args

if (!cmd) {
    console.error('Invalid command')
    Deno.exit()
}

switch (cmd) {
    case 'set': {
        const [k, v] = rest
        localStorage.setItem(k, v)
        break
    }
    case 'get': {
        const [k] = rest
        const v = localStorage.getItem(k)
        console.log(v)
        break
    }
    case 'remove':
    case 'delete': {
        const [k] = rest
        localStorage.removeItem(k)
        break
    }
    case 'clear': {
        localStorage.clear()
        break
    }
    case 'len': {
        console.log(localStorage.length)
        break
    }
    default:
        break
}