---
date:2018-9-3T20:11
title:静态博客管理器hugo的安装

---
# hugo的安装
## 前言
前段时间想要记录自己学习linux、学习编程的过程，也是锻炼自己输出能力，用输出来锻炼自己的知识网。另一方面也是对自己知识的梳理记录，形成知识管理。

## hugo的下载
这个项目是开源项目，可以去[github下载](https://github.com/gohugoio/hugo/releases)最新的软件包。
## hugo的安装
### 解压软件包
解压软件包，可以使用命令行，可以使用图形界面。
图形界面直接邮件解压就好了，这里说一下命令行。

使用一下命令可以将文件解压出来
```shell
gunzip hugo*.gz
tar xvf hugo*.tar
```
### 安装软件包
hugo 的安装比较简单与go 语言地编译器一样是解压就能用。
我习惯把这类软件放在`/usr/local`目录下
```shell
mv hugo* /usr/local
```
**设置环境变量**
这边我是使用修改`profile`文件的方法,优点是全用户有效

打开`profile`文件
```shell
vim /etc/profile
```
在最后一行添加
```sh
exprot PATH=$PATH:/usr/local/hugo
```
然后用下面的命令更新文件
```shell
source /etc/profile
```

至此hugo 就安装完成
