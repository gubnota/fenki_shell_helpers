# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48 (ISO/IEC-6429)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
# purple:green red:green ¶
PS1='\[\033[01;34m\]\u\[\033[00m\]:\[\033[01;31m\]\W\[\033[00m\]¶ '
else
    PS1='\u:\W¶ '
fi
unset color_prompt force_color_prompt

# Alias definitions.
if [ -f ~/.aliases ]; then
    . ~/.aliases
fi


# Prefer US English and use UTF-8
export LC_ALL="en_US.UTF-8"
export LANG="en_US"
export LC_CTYPE=C
export LANG=C

# WP-CLI directory
if `which pico &>/dev/null`; then export EDITOR='pico'; fi;
#export CLICOLOR=1
# a,A - black, dark gray
# b,B - crimson, pink
# c,C - green grass, bright grass,
# d,D - dark yellow, yellow
# e,E - ultrablue, purple
# f,F - voilet, bright purple
# g,G - marine, bright blue
# h,H - gray, white
# First symbol in the pair is text color, second is the background, x - is to use the default color instead.
# First pair is the folder, 2nd pair - alias, 3rd pair - ...
export LSCOLORS=DxCxFxDaGxDxExhxBxFxEx
# resize text to window
shopt -s checkwinsize
export PATH="/usr/local/sbin:$PATH"
ulimit -n 10240

# Detect which `ls` flavor is in use
if ls --color > /dev/null 2>&1; then # GNU `ls`
    colorflag="--color"
else # OS X `ls`
    colorflag="-G"
fi
# Always use color output for `ls`
alias ls="command ls ${colorflag}"
export LS_COLORS='no=00:fi=00:di=01;34:ln=01;36:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:ex=01;32:*.tar=01;31:*.tgz=01;31:*.pkg=01;31:*.taz=01;31:*.lzh=01;31:*.zip=01;31:*.ai=01;31:*.psd=01;31:*.gz=01;31:*.bz2=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.avi=01;35:*.fli=01;35:*.html=01;35:*.db=01;35:*.php=01;35:*.js=01;35:*.ogg=01;35:*.mp3=01;35:*.mp4=01;35:'

# List all files colorized in long format
alias l="ls -l ${colorflag}"
# List all files colorized in long format, including dot files
alias la="ls -a ${colorflag}"
# List only directories
alias lsd='ls -l ${colorflag} | grep "^d"'


# some ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'