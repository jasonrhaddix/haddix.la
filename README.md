<p  align="center"><img  width=100%  src="https://raw.githubusercontent.com/jasonrhaddix/haddix.la/master/gitAssets/img-1.png"></p>

# Haddix.la

Front-end repo for my personal website.


## Stack
__Front-end:__
* JS Framework: Vue.js
* CSS Pre-Processor: Sass (SCSS)
* Compiler: Babel
* Bundler: Webpack

__Back-end:__
* PHP Framework: Laravel
* REST API: Laravel
* DB: MySQL
* Build/Deploy Process


## Summary
For the back-end, I run Laravel locally using a Homestead image for VirtualBox server. I also spin up a local MySQL instance for my DB. I run the build process locally and then deploy on an AWS EC2 using an ElasticBeanstalk instance using the ElasticBeanstalk CLI.

The front-end runs locally on Webpack (webpack-dev-server using Node), and accesses the local Laravel REST API served by the VirtualBox. For my build process, I implemented CI/CD using AWS CodeBuild connected to my GitHub repo. This allows me to simply push commits and AWS will build and deploy my code to an S3 bucket (served through CloudFront).

I have a login feature (authenticated using JSON Web Tokens), which allows me add projects through a custom CMS on the font-end. The CMS is also accessible on the front-end as a guest, but projects created as a guest will only be alive for the duration of the session. If the user refreshed the site the project will be gone. This is done by giving the user a session token, creating projects under that token. If the session token doesn't match the project token, it is not displayed. Further more saving projects as a guest are to a different DB table as an authenticated user, thus allow me to keep my 'guest' projects from contaminating my actual project table. The CMS supports asset uploads to an AWS S3 buck.

I've also added section for displaying my experiments. I can create a new experiment project through the CMS, which is great for localizing content creation.

There's a lot going on in this site, so, please enjoy!

