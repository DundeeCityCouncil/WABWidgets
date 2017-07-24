# Creating Repo on GitHub and initialising locally

Order of Operations:

 * Creating Repo On Github & Putting existing work into that Repo
 * Resolving Proxy Errors during git push phase
 * Setting up Push/Pull for repo in two different folder locations

The problem encountered in this scenario was that the creation of a widget (AddMapData) was being developed locally - hosting this in it's own repo on GitHub was a problem as the Repo did not exist before the work was started. Once the repo was initiated online, the problem then became getting existing work (only the currently under-development widget) into the Repo, which then encountered problems with our firewall server :+1: :+1: :+1:

## Creating Repo On Github

Initial repo on [on GitHub](https://github.com/DundeeCityCouncil/WABWidgets)
This was created with the readme.md option, which proved to be troublesome later as the readme.md file stopped our:

*git push --set-upstream origin master*

Command from executing, as the remore contained work we do not have locally. This issue can be immediately solved by executing a git pull command, which will copy the missing files into our directory:

*git pull*

HOWEVER, after a git pull to replace the missing files - a further error about no tracking information will be presented. Furthermore even when executing:

*git pull origin master*

A last error is deployed as we cannot merge unrelated histories, we can circumvent this by telling git to ignore this during our pull by executing:

*git pull origin master --allow-unrelated-histories* 

 This will allow us to track changes finally. With this done we can actually push our work into the initial repository with git add (and the widget we worked on) and then finally git push

## Resolving Proxy Errors during git push phase
 
Because of our firewall, we were initially unable to push any of our content to github, with timeout errors eventually appearing in our GitBash, to circumvent this we used: 

*git config --global http.proxy http://proxy.server.com:8080*

Where the values proxy.server and 8080 are replaced with your proxy. The initial documentation for this command also uses proxyuser:proxypwd@proxy.server where login and pwd are hardcoded, but leaving these blank, github will generate a textbox popup for login information which was deemed more secure than hardcoding values


## Setting up Push/Pull for repo in two different folder locations

The last problem encountered within this scenario existed because we wished to clone our newly created repo into a 'server' environment with existing content in its folder structure already. Because of the usage of our allow unrelated histories command, this became complicated as we wanted to clone into a folder structure already full of existing content. The workaround for this was to 'offload' our content out of the directory, essentially emptying it before executing the:

*git clone  .*

Command to clone the repo into the existing directory. With this done we can switch to our *client* branch to make changes, push those changes to our offsite repo and pull them into the *server* folder to see the changes in our development environment





