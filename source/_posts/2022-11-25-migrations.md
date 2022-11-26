---
title: dotnet core entityframework 迁移工具
header_image: https://picgo.ddvlhr.red/picgo/202211260135118.jpeg
cover: https://picgo.ddvlhr.red/picgo/202211260135118.jpeg
tags: 
  - dotnet
  - entityframework
  - backend
---
#### 1.安装迁移工具
``` shell
$ dotnet tool install --global dotnet-ef
```

#### 2.引入迁移工具
``` shell
$ dotnet add package Microsoft.EntityFrameworkCore.Design
```

#### 3.初始化迁移工具
> ##### migration-project-absolute-url 如果不想把 migrations 文件夹存放在运行项目中时,   
> ##### 请指定存放 migraitons 文件夹项目的绝对路径  
``` shell
$ dotnet ef migrations add migration-name --project migration-project-absolute-url 
```

#### 4.更新数据库
``` shell
$ dotnet ef database update 
```