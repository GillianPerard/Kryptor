# Kryptor

A CLI to generate RSA key (private and public), public encrypt, private decrypt, private encrypt & public decrypt (for the moment).

## Getting Started

These instructions will help you to get this project on your own machine and run the 5 available commands.

### Prerequisites

The only thing you must have is NodeJs 11+.

Check the NodeJs documentation to know how to install it: [https://nodejs.org](https://nodejs.org)

### Installing

To get the project run the following commands:

```sh
git clone https://github.com/GillianPerard/kryptor.git
```

Then run the npm command to install all dependencies:

```sh
npm ci
```

Now normally, everything should be ready to use.

## Usage (CLI)

Go to the project folder then go to src folder.

There you can run the following commands.

### Help

To display the documentation:

```sh
node kryptor -h
# or
node kryptor --help
```

### Generate key pair

To generate private and public keys into the desired folder with the desired key size (**private.pem** and **public.pem**):

```sh
Command:
    generate | g <keySize>          [Required] Key size in bits

Options:
    -e, --export <destFolder>       [Required] Destination folder
    -h, --help                       Output usage information


# Example: node krypto generate 2048 -e .
```

### Encrypt **with a public key**

To encrypt a text with a public key (*encoding: base64*):

```sh
Command:
    public-encrypt | pcet

Options:
    -p, --publicKey <path>          [Required] Path of the public key
    -f, --fileToEncrypt <path>      [Required] Path of the file to encrypt
    -e, --export <path>             [Required] Path of the encrypted file
    -h, --help                       Output usage information


# Example: node krypto public-encrypt -p public.pem -f file.txt -e file.enc
```

### Decrypt **with a private key**

To decrypt an encrypted text with a private key which matches with a public key (*from encoding: base64*):

```sh
Command:
    private-decrypt | pedt

Options:
    -p, --privateKey <path>       [Required] Path of the private key
    -f, --fileToDecrypt <path>    [Required] Path of the file to decrypt
    -e, --export <path>           [Required] Path of the decrypted file
    -h, --help                     Output usage information


# Example: node krypto private-decrypt -p private.pem -f file.enc -e file.txt
```

### Encrypt **with a private key**

To encrypt a text with a private key (*encoding: base64*):

```sh
Command:
    private-encrypt | peet

Options:
    -p, --privateKey <path>       [Required] Path of the private key
    -f, --fileToEncrypt <path>    [Required] Path of the file to encrypt
    -e, --export <path>           [Required] Path of the encrypted file
    -h, --help                     Output usage information


# Example: node krypto private-encrypt -p private.pem -f file.txt -e file.enc
```

### Decrypt **with a public key**

To decrypt an encrypted text with a public key which matches with the private key (*from encoding: base64*):

```sh
Command:
    public-decrypt | pcdt

Options:
    -p, --publicKey <path>        [Required] Path of the public key
    -f, --fileToDecrypt <path>    [Required] Path of the file to decrypt
    -e, --export <path>           [Required] Path of the decrypted file
    -h, --help                     Output usage information


# Example: node krypto public-decrypt -p public.pem -f file.enc -e file.txt
```

## Usage (program)

Instead of use the CLI if you don't know how to or just because you think it's boring to remember you all options; you can use Kryptor thanks to the **easy-kryptor.js** file.

Go to the project folder then go to src folder.

Run the following command to start the program and follow the instructions:

```sh
node easy-kryptor
```

Example:

<img src="./assets/easy-kryptor.png" width="400">


## Author

**Gillian Pérard** - *Creator* - [GillianPerard](https://github.com/GillianPerard)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details