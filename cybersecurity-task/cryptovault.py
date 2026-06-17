# Function to encrypt text using Caesar Cipher
def encrypt(text, shift):
    result = ""

    for ch in text:

        # Check if character is a letter
        if ch.isalpha():

            # Find starting ASCII value
            if ch.isupper():
                base = ord('A')
            else:
                base = ord('a')

            # Shift the character
            result += chr((ord(ch) - base + shift) % 26 + base)

        else:
            # Keep spaces and symbols unchanged
            result += ch

    return result


# Get input from user
message = input("Enter message: ")
shift = int(input("Enter shift value: "))

# Encrypt the message
encrypted = encrypt(message, shift)

# Display result
print("Encrypted text:", encrypted)