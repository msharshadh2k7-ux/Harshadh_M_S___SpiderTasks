# Vault Sweep Report

## Dangerous Patterns Detected

1. chmod 777
Reason: Gives write permission to everyone.

2. curl | sh
Reason: Downloads and executes code directly from the internet.

## Environment File Sanitization

Valid entries:
- API_KEY=spider26
- PORT=3000
- _DEBUG=false

Rejected entries:
- PASSWORD=secret123 (sensitive credential)
- SERVER-NAME=x (invalid variable name)
- USER="admin" (unnecessary quotes)
- export PATH=$PATH:/tmp (modifies PATH)
- KEY = value (spaces around =)

## Technical Challenges

- Recursive scanning using find.
- Pattern detection using grep.
- Excluding vault_sweep.sh from scan results.
- Logging results with timestamps.
