import hashlib

# Read encrypted file
file = open("encrypted.txt", "r")
content = file.read()
file.close()

# Generate SHA-256 hash
hash_value = hashlib.sha256(content.encode()).hexdigest()

# Save hash
file = open("hash.txt", "w")
file.write(hash_value)
file.close()

print("Hash generated successfully!")
print("SHA-256 Hash:")
print(hash_value)