#!/bin/bash

# List of nodes on which to install Prometheus
nodes=("gtkubenode1" "gtkubenode2" "gtkubenode3")

# Loop through each node to install Prometheus
for node in "${nodes[@]}"; do
    echo "Starting installation of Prometheus on $node..."
    ssh "$node" "sudo apt-get update && sudo apt-get install -y prometheus"
    echo "Installation completed on $node."
done

echo "Prometheus installation completed on all nodes."
