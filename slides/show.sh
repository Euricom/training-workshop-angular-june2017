echo $1
if [ $# -ne 0 ]
then
    reveal-md ./overview.md --title 'Javascript' --theme solarized --highlightTheme github-gist
else
    reveal-md ./overview.md --title 'Javascript' --theme moon
fi
