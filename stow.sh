stow zsh -t ~/
mkdir -p ~/.config/ags && stow ags -t ~/.config/ags && ln -s /usr/share/com.github.Aylur.ags/types ~/.config/ags/types
mkdir -p ~/.config/nvim && stow nvim -t ~/.config/nvim
mkdir -p ~/.config/kitty && stow kitty -t ~/.config/kitty
mkdir -p ~/.config/hypr && stow hyprland -t ~/.config/hypr
