# History
HISTFILE=~/.zsh_history
HISTSIZE=100000
SAVEHIST=100000
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
export GOPATH="$HOME/go"
export BUN_PATH="$HOME/.bun/bin"
export RUST_PATH="$HOME/.cargo/bin"
export LOCAL_PATH="$HOME/.bin"
export PATH="$BUN_PATH:$RUST_PATH:$GOPATH/bin:$LOCAL_PATH:$HOME/miniconda3/bin:$PATH"

# Sources
## The directory for both zsh-autosuggestions and zsh-syntax-highlighting differ from distro to distro
source /usr/share/zsh/site-functions/zsh-autosuggestions.zsh
source /usr/share/zsh/site-functions/zsh-syntax-highlighting.zsh
source "$HOME/.cargo/env"
[[ ! -r /home/shimoheki/.opam/opam-init/init.zsh ]] || source /home/shimoheki/.opam/opam-init/init.zsh  > /dev/null 2> /dev/null

# Evals
eval "$(starship init zsh)"
eval "$(mise activate zsh)"
eval "$(luarocks path)"

fastfetch -c custom.jsonc

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/home/shimoheki/miniconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/home/shimoheki/miniconda3/etc/profile.d/conda.sh" ]; then
        . "/home/shimoheki/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/shimoheki/miniconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

