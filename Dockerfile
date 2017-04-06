FROM node:6-onbuild

EXPOSE 25863

CMD [ "node", "index", "start" ]
