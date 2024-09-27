# npm init
name as it is
desn give any
entry point index.jd
nothing for test cmd, git repository
keywords: nodejs, javascript
author: Azam
lisence : enter
ok: Yes

# npm i -g nodemon   (will be installed on system level and not project level)

# Now inside package.json inside script remove test and add  
    "dev" : "nodemon src/app.js" (dev mode - will restart and refresh the server also) is equal to executing npm run dev or 
    "start" : "node src/app.js" (npm mode - will just restart server) is equal to executing npm run start

# execute git init 
    and then create .gitignore and write node_modules in it. commit changes from UI and write comment.
    or from terminal git add . (this will add all the files) or git add filename1 filename2 (to add in group) 
        then git commit -n "message" 

# To push all the code to github or remote
    First go to your account and create new repository devTinder public repository and keep all as it is.

# Install express
    npm i express

# Install nodemon and update scripts inside package.json
    npm i nodemon

# Install mongoose
    npm i mongoose



# npm i express
ep 3 @ -37