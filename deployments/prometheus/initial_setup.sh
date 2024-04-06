#!/bin/bash

# List of nodes to copy the public key to
nodes=("gtkubenode1" "gtkubenode2" "gtkubenode3")

#Ask for password once
read -s -p "Enter the SSH password for the nodes: " SSH_PASSWORD
echo ""

# Generate SSH key if it doesn't already exist
if [ ! -f ~/.ssh/id_rsa.pub ]; then
    echo "SSH key generation..."
    ssh-keygen -t rsa -b 4096 -N "" -f ~/.ssh/id_rsa
fi

# Copy the public key to each node using sshpass
for node in "${nodes[@]}"; do
    echo "Copy public key to $node..."
    sshpass -p "$SSH_PASSWORD" ssh-copy-id -o StrictHostKeyChecking=no "$node"
done

echo "Public key copied to all nodes."
