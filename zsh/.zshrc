# History
HISTFILE=~/.zsh_history
HISTSIZE=1000
SAVEHIST=1000
setopt hist_ignore_all_dups
setopt hist_ignore_space

bindkey -e

# Completion
autoload -U compinit
zstyle ':completion:*:descriptions' format '%U%B%d%b%u'
zstyle ':completion:*:warnings' format '%BSorry, no matches for: %d%b'
compinit

# Correction
setopt correctall

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

# Exports
export PATH="~/.bun/bin:$PATH}"

# Evals
eval "$(starship init zsh)"
source /usr/share/zsh/site-functions/zsh-autosuggestions.zsh
source /usr/share/zsh/site-functions/zsh-syntax-highlighting.zsh
