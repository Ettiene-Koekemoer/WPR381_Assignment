# WPR381_Assignment
Web Programming 381 assignment for looking up a Spotify song, through input in a terminal.

!! IMPORTANT !! => For Spotify Look-Up to work, enter your Spotify Client ID and Spotify Client Secrect into the '.env' file in the root directory with no spaces;

e.g: SPOTIFY_CLIENT_ID=1a2b3c4d 
     SPOTIFY_CLIENT_SECRET=4d3c2b1a

Note: run command: 'git update-index --assume-unchanged .\WPR_3781_Assignment_Group_V4\.env' from the root directory to avoid saving changes to the .env file.

If you have pulled the latest origin and use 'node ./index.js' and it gives you package/module errors do the following:
1. First 'cd' into /Interface
2. Use 'nmp install' to install/repair/update the packages which are causing problems
3. CAUTION! If 'Inquirer' is causing issues install version 7 not the latest version. Use 'npm install inquirer@7'
