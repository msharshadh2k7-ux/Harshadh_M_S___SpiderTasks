# Encrypt text
def encrypt(text, shift):
    result = ""

    for ch in text:
        if ch.isalpha():
            if ch.isupper():
                base = ord('A')
            else:
                base = ord('a')

            result += chr((ord(ch) - base + shift) % 26 + base)
        else:
            result += ch

    return result


# Decrypt text
def decrypt(text, shift):
    return encrypt(text, -shift)


choice = input("Enter encrypt or decrypt: ")
message = input("Enter message: ")
shift = int(input("Enter shift value: "))

if choice.lower() == "encrypt":
    print("Result:", encrypt(message, shift))
elif choice.lower() == "decrypt":
    print("Result:", decrypt(message, shift))
else:
    print("Invalid option")