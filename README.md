# Info
Webpage is hosted on https://pert.oncriticalpath.com/

# Local installation
* clone repository

      git clone https://github.com/plpabla/pertool-front.git

* install dependencies

      npm install

* set up backend connectivity in `./src/Backend.js` file (*note: you can use that one as it is hosted on Azure cloud*)

      static #url = 'https://pert.azurewebsites.net'

* create a bundle

      npm build

* run backend if you use local one (it should support endpoints which are defined in `./src/Backend.js`)

* run - you can use VSCode Live Sever