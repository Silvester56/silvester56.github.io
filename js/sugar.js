const sugar =
`alias ll='ls -lh --color=always --group-directories-first'
alias la='ls -lah --color=always --group-directories-first'
alias p='pwd'
alias v='vim'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
alias install='sudo apt-get install'
alias update='sudo apt-get update'
alias upgrade='sudo apt-get upgrade'
alias remove='sudo apt-get remove'
alias org='mv */* . && find . -empty -type d -delete'
alias crawl='wget -m -p -E -k'
alias gits='git branch; git status -s'
alias gitcom='git commit -m'

findinfolder () {
  find . -exec grep -Hn --color=auto -i $1 {} \;
}

gitall() {
  git add --all
  git commit -m "$1"
  git push
}

gitlog() {
  git log -n $1
}

mmv() {
  mkdir $2 && mv $1 $2
}

mcd() {
  mkdir $1 && cd $1
}`;

window.onload = () => {
  document.querySelector('#container').innerHTML = `<pre>${sugar}</pre>`;
  document.querySelector('#copy').onclick = () => {
    navigator.clipboard.writeText(sugar).then(() => document.querySelector('#copy').innerHTML = "Copied!");
  };
}