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

source /usr/share/zsh/site-functions/zsh-autosuggestions.zsh
source /usr/share/zsh/site-functions/zsh-syntax-highlighting.zsh
