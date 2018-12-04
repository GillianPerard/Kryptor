# Kryptor

A CLI to generate RSA key (private and public), encrypt with the private key and decrypt with the public (for the moment).

## Getting Started

These instructions will help you to get this project on your own machine and run the 3 available commands.

### Prerequisites

The only thing you must have is NodeJs 11+.

Check the NodeJs documentation to know how to install it: [https://nodejs.org](https://nodejs.org)

### Installing

To get the project run the following commands

```sh
git clone https://github.com/GillianPerard/kryptor.git
```

Then run the npm command to install all dependencies

```sh
npm ci
```

Now normally, everything should be ready to use.


## Usage

Go to the project folder then go to src folder.

There you can run the following commands.

### Help

To display the documentation

```sh
node kryptor.js -h
# or
node kryptor.js --help
```

### Generate key pair

To generate private and public keys into the desired folder (**private.pem** and **public.pem**)

```sh
Command:
    generate | g

Options:
    -d, --destFolder <dest>       [Required] Destination folder
    -h, --help                     Output usage information


# Example: node krypto -d ../myFolder
```

### Encrypt **with private key**

To encrypt a text with the private key.

```sh
Command:
    encrypt | e

Options:
    -p, --privateKey <path>       [Required] Path of the private key
    -f, --fileToEncrypt <path>    [Required] Path of the file to encrypt
    -d, --destination <path>      [Required] Path of the encrypted file
    -h, --help                     Output usage information


# Example: node krypto -p private.pem -f file.txt -d ../myFolder/file.enc
```

### Decrypt **with public key**

To decrypt an encrypted text with the public key which matches with the private.

```sh
Command:
    decrypt | d

Options:
    -p, --publicKey <path>        [Required] Path of the public key
    -f, --fileToDecrypt <path>    [Required] Path of the file to decrypt
    -h, --help                     Output usage information


# Example: node krypto -p public.pem -f file.enc
```

## Author

**Gillian Pérard** - *Creator* - [GillianPerard](https://github.com/GillianPerard)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details