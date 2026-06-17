# Caesar Cipher Encryption

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


# Read text from file
file = open("message.txt", "r")
content = file.read()
file.close()

# Encrypt content
shift = int(input("Enter shift value: "))
encrypted_text = encrypt(content, shift)

# Save encrypted text
file = open("encrypted.txt", "w")
file.write(encrypted_text)
file.close()

print("Encryption completed!")
print("Encrypted text saved in encrypted.txt")