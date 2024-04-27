# History
HISTFILE=~/.zsh_history
HISTSIZE=1000
SAVEHIST=1000
setopt hist_ignore_all_dups
setopt hist_ignore_space

bindkey -e
# change cursor from block to blinking pipe
echo '\e[5 q'

# Completion
autoload -U compinit
zstyle ':completion:*:descriptions' format '%U%B%d%b%u'
zstyle ':completion:*:warnings' format '%BSorry, no matches for: %d%b'
compinit

# Correction
#setopt correctall

setopt autocd
setopt extendedglob

# Exports
export EDITOR=nvim

# Aliases
alias ls="eza --icons=always"
alias la="eza --icons=always -a"
alias ll="eza --icons=always --group-directories-first --long -a"

# Keybinds
bindkey '^[[1;5D' backward-word
bindkey '^[[1;5C' forward-word
bindkey '^ ' autosuggest-accept
bindkey '^[[3~' delete-char

source /etc/profile

# Exports
export BUN_PATH="$HOME/.bun/bin"
export RUST_PATH="$HOME/.cargo/bin"
export PATH="$BUN_PATH:$RUST_PATH:$PATH"

# Sources
## The directory for both zsh-autosuggestions and zsh-syntax-highlighting differ from distro to distro
source /usr/share/zsh/site-functions/zsh-autosuggestions.zsh
source /usr/share/zsh/site-functions/zsh-syntax-highlighting.zsh
source "$HOME/.cargo/env"

# Evals
eval "$(starship init zsh)"
eval "$(luarocks path)"
