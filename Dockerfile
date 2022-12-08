FROM node:16.14.2-slim

RUN mkdir -p /app
WORKDIR /app
ADD ./ /app

RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 4000

CMD ["yarn", "start"]