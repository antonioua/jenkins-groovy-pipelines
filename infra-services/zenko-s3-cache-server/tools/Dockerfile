FROM node:10-alpine

LABEL maintainer="Anton Kuznetsov"

WORKDIR /build

COPY ["infra-services/zenko-s3-cache-server/tools/index.js", "infra-services/zenko-s3-cache-server/tools/package.json", "/build/"]

RUN npm install

CMD ["node", "index.js"]