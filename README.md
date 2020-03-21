Simurgh
=======
Custom Minecraft Authentication (Yggdrasil) system.

Abstract
--------
Simurgh is fully compatible with Yggdrasil. It was developed as a replacement for the authentication system, in case you want to have your own.
 
Features:
- Front-end system for registration, skin uploading etc (Planned)
- Custom launcher (as some client modifications are required) (Planned)
- Integration with [authlib-injector](https://github.com/yushijinhun/authlib-injector)

Installation
----------------------
#### Prerequisites

Node.js have to be installed on your system.

[How to install Node.js via package manager](https://nodejs.org/en/download/package-manager/)

If you want to use the Database backend, then you have to install MongoDB:

[MongoDB Home](https://www.mongodb.com/)

#### Simurgh

Download the sources from github:

    git clone https://github.com/uenify/simurgh.git
 
Then:

    npm install 

Generate keys for your server:

    ./generate_keys.sh

Then you have to create your own .env file: 
    
    DB_CONNECT=mongodb://localhost/simurgh
    SECRET=YOUR_SECRET
    DOMAIN=example.com

To start the server you have to execute the following command in console:

    node index.js

In order to run simurgh in background you can use [pm2](https://www.npmjs.com/package/pm2) or [forever.js](https://www.npmjs.com/package/forever).

##### NGINX configuration

If everything works, then you probably want to bind the domain to your server. You can do it by creating nginx proxy.
Here is a .conf file for simurg:
```
upstream simurgh {
    server 127.0.0.1:3020;
    keepalive 64;
}

server {
    server_name example.com;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_max_temp_file_size 0;
        proxy_pass http://simurgh/;
        proxy_redirect off;
        proxy_read_timeout 240s;
    }
    client_max_body_size 32m;
}
```
Don't forget to restart nginx after adding this configuration!

Usage (clients/servers)
-----------------------
In order to use simurgh as auth server for Minecraft you should make some changes in authlib library. However, there is a tool for it. With [authlib-injector](https://github.com/yushijinhun/authlib-injector) you can easily inject URL of your simurgh instance into client or server. See authlib-injector wiki for more info.


License
-------

**MIT**