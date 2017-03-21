FROM node:6-onbuild

EXPOSE 25863

ENTRYPOINT [ "npm", "run", "start" ]
