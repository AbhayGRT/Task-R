#!/bin/bash

cd ~
unzip makhachev.zip && rm -rf makhachev.zip

# Update package lists
echo "Updating package lists..."
sudo apt update -y

# Install Python and pip
echo "Installing Python3 and pip..."
sudo apt install -y python3-pip python3-venv xdotool wmctrl
sudo apt install xdg-utils -y

# Create a virtual environment named 'si-deployment'
if [ ! -d "si-deployment" ]; then
    echo "Creating virtual environment 'si-deployment'..."
    python3 -m venv si-deployment
fi

# Activate the virtual environment
echo "Activating virtual environment..."
source si-deployment/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install streamlit
pip install requests

# Get the absolute path of the run script
RUN_SCRIPT_PATH="$(pwd)/makhachev/run_streamlit.sh"
chmod +x "$RUN_SCRIPT_PATH"

# Configure keyboard shortcut (Alt + A) using gsettings (for GNOME-based systems)
echo "Setting up Alt + A shortcut..."
gsettings set org.gnome.settings-daemon.plugins.media-keys custom-keybindings \
"['/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/']"

gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/ \
name 'Run Streamlit'

gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/ \
command "$RUN_SCRIPT_PATH"

gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/org/gnome/settings-daemon/plugins-media-keys/custom-keybindings/custom0/ \
binding '<Alt>A'

echo "Setup complete! Press Alt + A to run Streamlit."
