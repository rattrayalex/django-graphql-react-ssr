FROM node:6.9.1


# Install yarn
RUN apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install yarn
ENV PATH "$PATH:$HOME/.yarn/bin"


RUN mkdir /code
WORKDIR /code

# TODO: optimize...
ADD .yarn-cache /code/
ADD package.json /code/
ADD yarn.lock /code/

RUN yarn --cache-folder /code/.yarn-cache

ENV PATH "$PATH:/code/node_modules/.bin"
ADD . /code/

