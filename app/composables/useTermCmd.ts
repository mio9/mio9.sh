export function useTermCmd() {
    const lines = ref<string[]>([]);
    const input = ref<string>('');
    const inputRef = ref<HTMLInputElement | null>(null);

    const commands = {
        'echo': (args: string[]) => {
            return args.join(' ');
        },
        'clear': () => {
            lines.value = [];
            input.value = '';
        },
        'help': () => {
            return 'Available commands: echo, clear, help';
        },
        'exit': () => {
            return '??? why would you do that on a website?';
        },
        '': ()=>''
    }

    const handleInput = () => {
        const [command, ...args] = input.value.split(' ');
        // check if command is valid
        if (command && !commands[command as keyof typeof commands]) {
            lines.value.push(`command not found: ${command}`);
            input.value = '';
            return;
        }
        const result = commands[command as keyof typeof commands](args);
        lines.value.push(`${result}`);
        input.value = '';
    }

    return {
        lines,
        input,
        handleInput
    }
}