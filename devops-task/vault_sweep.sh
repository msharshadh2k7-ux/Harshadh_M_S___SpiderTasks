#!/bin/bash

LOG_FILE="vault_sweep.log"

log_msg() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

echo "Starting vault sweep..."
log_msg "[INFO] Scan started"

find . -type f -name "*.sh" ! -name "vault_sweep.sh" | while read file
do
    # Detect chmod 777
    if grep -q "chmod 777" "$file"; then
        echo "[WARN] $file - Reason: chmod 777 detected"
        log_msg "[WARN] $file contains chmod 777"

        read -p "Fix permissions for $file? (yes/no): " ans

        if [ "$ans" = "yes" ]; then
            chmod o-w "$file"
            echo "[FIX] Removed world write permission from $file"
            log_msg "[FIX] Removed world write permission from $file"
        fi
    fi

    # Detect curl|sh or wget|sh
    if grep -E -q 'curl.*\|.*sh|wget.*\|.*sh' "$file"; then
        echo "[WARN] $file - Reason: suspicious download detected"
        log_msg "[WARN] $file contains curl|sh or wget|sh"
    fi
done

echo "Scan complete."
log_msg "[INFO] Scan completed"
