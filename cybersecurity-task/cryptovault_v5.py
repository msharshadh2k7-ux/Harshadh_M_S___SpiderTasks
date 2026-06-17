import hashlib

# Read encrypted file
file = open("encrypted.txt", "r")
content = file.read()
file.close()

# Generate current hash
current_hash = hashlib.sha256(content.encode()).hexdigest()

# Read old hash
file = open("hash.txt", "r")
saved_hash = file.read()
file.close()

# Compare hashes
if current_hash == saved_hash:
    print("File verified successfully!")
    print("No tampering detected.")
else:
    print("WARNING: File has been modified!")