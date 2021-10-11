const commandMap = {
    init: {
        description: 'generate a new project from a template',
        usages: [
            'sma init projectName'
        ]
    },
    config: {
        alias: 'cfg',
        description: 'config .smarc',
        usages: [
            'sma config set <k> <v>',
            'sma config get <k>',
            'sma config remove <k>'
        ]
        
    },
    //other commands
}
export default actionMap;