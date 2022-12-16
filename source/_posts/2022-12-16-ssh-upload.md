---
title: SSH 上传, 下载文件
index_img: https://picgo.ddvlhr.red/picgo/202212160943902.jpg
banner_img: https://picgo.ddvlhr.red/picgo/202212160943902.jpg
excerpt: 使用 SSH 上传, 下载文件和文件夹.
tags: [SSH]
categories: [服务器]
---

{% note success %}
在 linux 上一般使用 scp 这个命令来通过 ssh 传输文件
{% endnote %}

{% note warning %}
注: 目标服务器要开启写入权限
{% endnote %}

## 1. 从服务器下载文件

```shell
scp username@server:/path/filename /path(本地目录)
```

## 2. 上传本地文件到服务器

```shell
scp /path/filename username@server:/path
```

## 3. 从服务器下载整个目录

```shell
scp -r username@server:/remote_dir(远程目录) /local_dir(本地目录)
```

## 4. 上传目录到服务器

```shell
scp -r /local_dir(本地目录) username@server:/remote_dir(远程目录)
```

