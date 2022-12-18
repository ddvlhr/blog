---
title: Docker 部署 .NET 项目
index_img: https://picgo.ddvlhr.red/picgo/202211260135930.jpeg
banner_img: https://picgo.ddvlhr.red/picgo/202211260135930.jpeg
excerpt: 使用 Dockerfile 在 docker 中部署 .NET 项目.
tags: [.NET, Docker]
categories: [Backend]
---
## 1.创建 Dockerfile 文件
``` dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
COPY . /publish
WORKDIR /publish
EXPOSE 80

# 指定容器运行端口
# EXPOSE 指定的端口无效, docker 还是会默认使用 80 端口,如果要使用其他端口,请使用如下指令
ENV ASPNETCORE_URLS=http://+:5001

# dotnet-project.dll 为项目编译后的 dll 文件
ENTRYPOINT ["dotnet", "dotnet-project.dll"]
```
## 2.创建 start.sh 文件
``` shell
# 容器名称
APP="api"
VERSION="v1"
IMAGE=$APP:$VERSION
DOCKER_NAME="$APP_$VERSION"
# Dockerfile 文件路径
APP_DIR="/home/apps/csharp/api/publish/Dockerfile"
# 项目编译后的 dll 文件路径
PUBLISH_DIR="/home/apps/csharp/api/publish"
echo "--- delete container and image ---"
# 停止并删除容器和镜像
docker stop $DOCKER_NAME
docker rm $DOCKER_NAME
docker rmi $IMAGE
echo "+++ build docker images"
# 重新构建镜像
docker build -t $IMAGE .
echo "--- run docker images ---"
# 启动容器
CONTAINER_ID=`docker run -dit -p 7229:7229 --name=$DOCKER_NAME --restart=always -v $PUBLISH_DIR:/publish $IMAGE`
#docker logs -f $CONTAINER_ID
```
## 3.部署项目
将发布后的文件夹上传到服务器后, 在项目文件夹下执行如下指令即可将项目部署到 docker 中

``` shell
$ sh start.sh
```