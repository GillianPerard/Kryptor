const inquirer = require('inquirer');
const { lstatSync } = require('fs')
const { generateKeysCmd, encryptCmd, decryptCmd } = require('./commands.js')

const CommandType = {
    Public: 'Public',
    Private: 'Private'
}

const Command = {
    GenerateKeys: 'Generate keys',
    Encrypt: 'encrypt',
    Decrypt: 'decrypt'
}

const COMMAND_TYPE_INDEX = 0
const COMMAND_INDEX = 1
const GENERATE_KEYS = Command.GenerateKeys
const PUBLIC_ENCRYPT = `${CommandType.Public} ${Command.Encrypt}`
const PRIVATE_ENCRYPT = `${CommandType.Private} ${Command.Encrypt}`
const PUBLIC_DECRYPT = `${CommandType.Public} ${Command.Decrypt}`
const PRIVATE_DECRYPT = `${CommandType.Private} ${Command.Decrypt}`

let workflow;

// Function to run the program
const main = () => {
    console.log('Hi, welcome to Kryptor.')
    chooseCommand()
}

// Function so that the user can choose which command to use
const chooseCommand = () => {
    workflow = {}
    inquirer
        .prompt({
            type: 'list',
            name: 'command',
            message: 'What do you want to do?',
            choices: [GENERATE_KEYS, PUBLIC_ENCRYPT, PRIVATE_ENCRYPT, PUBLIC_DECRYPT, PRIVATE_DECRYPT]
        })
        .then(answer => {
            if (answer.command === Command.GenerateKeys) {
                workflow.command = answer.command
                chooseKeySize()
            }
            else {
                workflow.command = getCommand(answer.command)
                workflow.commandType = getCommandType(answer.command)
                askKeyPath()
            }
        });
}

// Function so that the user can choose the key size of generates keys
const chooseKeySize = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'keySize',
            message: 'What key size do you need?',
            choices: ['4096', '2048', '1024', '512']
        })
        .then(answer => {
            workflow.keySize = answer.keySize
            wannaExport()
        })
}

// Function so that the user can write what is the key path
const askKeyPath = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'keyPath',
            message: 'What\'s the path to the key file?',
            validate: value => {
                var pass = lstatSync(value).isFile()
                if (pass)
                    return true

                return 'Please write a path to an existing file.'
            }
        })
        .then(answer => {
            workflow.keyPath = answer.keyPath
            askFilePath()
        })
}

// Function so that the user can write what is the path to the file to encrypt/decrypt
const askFilePath = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'filePath',
            message: `What's the path to the file to ${workflow.command} ?`,
            validate: value => {
                var pass = lstatSync(value).isFile()
                if (pass)
                    return true

                return 'Please write a path to an existing file.'
            }
        })
        .then(answer => {
            workflow.filePath = answer.filePath
            wannaExport()
        })
}

// Function so that the user can tell if he wants to export the result of the command
const wannaExport = () => {
    inquirer.prompt({
        type: 'confirm',
        name: 'export',
        message: 'Do you want to export?',
        default: false
    }).then(answer => {
        if (answer.export && workflow.command === Command.GenerateKeys)
            askDestinationFolder()
        else if (answer.export && workflow.command !== Command.GenerateKeys)
            askDestinationFile()
        else
            runCommand()
    })
}

// Function so that the user can write what is the folder path where to write the command result
const askDestinationFolder = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'destinationFolder',
            message: 'What\'s the path to the destination folder?',
            validate: value => {
                var pass = lstatSync(value).isDirectory()
                if (pass)
                    return true

                return 'Please write a path to an existing folder.'
            }
        })
        .then(answer => {
            workflow.destinationFolder = answer.destinationFolder
            runCommand()
        })
}

// Function so that the user can write what is the file path where to write the command result
const askDestinationFile = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'destinationFile',
            message: 'What\'s the path to the destination file?'
        })
        .then(answer => {
            workflow.destinationFile = answer.destinationFile
            runCommand()
        })
}

// Function so that the user can tell if he has finished or wanna continue
const wannaContinue = () => {
    inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: 'Have you finished?',
        default: true
    }).then(answer => {
        if (answer.continue)
            console.log("See you soon !")
        else
            chooseCommand()
    })
}

// Function to run the appropriate command according to the workflow
const runCommand = () => {
    const { command, commandType, keySize, keyPath, filePath, destinationFolder, destinationFile } = workflow
    const usePublicKey = commandType === CommandType.Public ? true : false
    if (command === GENERATE_KEYS)
        generateKeysCmd(keySize, destinationFolder)
    else if (command === Command.Encrypt)
        encryptCmd(keyPath, filePath, destinationFile, usePublicKey)
    else if (command === Command.Decrypt)
        decryptCmd(keyPath, filePath, destinationFile, usePublicKey)

    wannaContinue()
}

/**
 * Function to get the command type
 * @param command The full command where the type is stored
 */
const getCommandType = command => {
    return command.split(' ')[COMMAND_TYPE_INDEX]
}

/**
 * Function to get the command type
 * @param command The full command where the command is stored
 */
const getCommand = command => {
    return command.split(' ')[COMMAND_INDEX]
}

// Run the main function
main()