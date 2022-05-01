---
date:2018-9-3T19:40
title:go语言编译器的安装
---
# go语言编译器的安装
## 下载软件包
首先去go的[官网](https://golang.org/dl/)下载`.tar.gz`软件包
##图形界面解压
直接右键解压,可以看到解压出来一个`go`文件夹
##命令行界面解压

使用`gunzip`命令解压`.gz`的软件包
```shell
 gunzip go*.gz
```

使用`tar`命令解压``.tar`软件包
```shell
tar xvf go*.tar
```
然后在当前目录就可以看到`go`文件夹
## 安装
这个软件安装比较简单,直接随便丢到一个目录,设置一下然后设置一下环境变量就行了
这边我是放到`/usr/local`目录
```shell
mv go /usr/local
```
**设置环境变量**
这边我是使用修改`profile`文件的方法,优点是全用户有效

打开`profile`文件
```shell
vim /etc/profile
```
在最后一行添加
```sh
exprot PATH=$PATH:/usr/local/go/bin
```
然后用下面的命令更新文件
```shell
source /etc/profile
```

至此go编译器就安装完成
输入在命令行输入`go`查看是否生效
