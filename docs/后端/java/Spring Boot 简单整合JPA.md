---
date: 2022-03-21 16:55:00
title: Spring Boot 简单整合JPA
feed:
  enable: true
---
# Spring Boot 框架简单整合JPA

## 创建Spring Boot项目

Spring Boot 项目其实是一个标准的 Maven 项目,可以直接创建 Maven 项目,然后再`pom.xml`中指定项目的`parent`来创建成 Spring Boot 项目，若有其他依赖项，则可以自行添加。

在 maven 项目`pom.xml`的根标签中插入如下配置：

```xml
 	<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>{Spring Boot 最新版本}</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
```

也可以通过 Spring 提供的网站([ start.spring.io ](https://start.spring.io))创建一个基本的 Spring Boot 项目。

## 导入依赖JPA依赖

导入JPA依赖以及MySQL依赖：

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<scope>runtime</scope>
</dependency>
```

## 数据源配置

创建一个数据库：

```sql
CREATE DATABASE `spring_demo` /*!40100 COLLATE 'utf8mb4_unicode_ci' */;
```

使用[ start.spring.io ](https://start.spring.io)创建的项目默认使用`.properties`文件对项目进行配置，这里改成`.yml`文件进行配置,较为直观.

在项目`src/main/resources/application.yml`(若没有此文件,可以直接创建)中添加数据源配置:

```yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/spring_demo?useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true&allowMultiQueries=true
    username: root
    password: 1234

```

其中`url`中`useSSL=false`参数表示不使用`ssl`连接,`serverTimezone=Asia/Shanghai`表示时区使用亚洲上海的时区,`allowPublicKeyRetrieval=true`表示允许客户端获取公钥,`allowMultiQueries=true`表示允许一次提交多条sql查询数据库.

另外还要对JPA进行配置:

```yml
spring:
  jpa:
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    show-sql: true
    hibernate:
      ddl-auto: create
```

`database-platform: org.hibernate.dialect.MySQL5InnoDBDialect`表示数据库引擎使用`InnoDB`

`show-sql:true`表示执行sql的时候将sql打印出来

`ddl-auto:create`表示每次启动程序的时候删除表结构,重新根据实体类创建表结构.

## 创建实体类

```java
/*
 * @(#) UserInfoDo
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2020
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author song
 * <br> 2020-05-11 16:21:27
 */

package com.sunsharing.songjg.spring.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 *
 *
 **/
@Entity
@Table(name = "USER_INFO")
public class UserInfoDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 32)
    private String userName;

    @Column(length = 3)
    private Integer age;

    @Column(length = 32)
    private String gender;

    @Column(length = 16)
    private String phone;

    @Column(length = 32)
    private String email;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
/*
 * @(#) GuardDo
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2020
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author song
 * <br> 2020-05-11 17:08:31
 */

package com.sunsharing.songjg.spring.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 *
 *
 **/
@Entity
@Table(name = "GUARD")
public class GuardDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guardId;

    @Column(length = 32)
    private java.lang.String identityType;

    @Column(length = 32)
    private java.lang.String identifier;

    @Column(length = 32)
    private Long credentialId;

    @Column(length = 32)
    private Long userId;

    public Long getGuardId() {
        return guardId;
    }

    public void setGuardId(Long guardId) {
        this.guardId = guardId;
    }

    public String getIdentityType() {
        return identityType;
    }

    public void setIdentityType(String identityType) {
        this.identityType = identityType;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public Long getCredentialId() {
        return credentialId;
    }

    public void setCredentialId(Long credentialId) {
        this.credentialId = credentialId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
/*
 * @(#) Credential
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2020
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author song
 * <br> 2020-05-11 17:11:58
 */

package com.sunsharing.songjg.spring.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 *
 *
 **/
@Entity
@Table(name = "CREDENTIAL")
public class CredentialDO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long credentialId;

    @Column(length = 32)
    private java.lang.String credential;

    public Long getCredentialId() {
        return credentialId;
    }

    public void setCredentialId(Long credentialId) {
        this.credentialId = credentialId;
    }

    public String getCredential() {
        return credential;
    }

    public void setCredential(String credential) {
        this.credential = credential;
    }
}

```

`@Entity`注解表示这个类是一个实体类,必须加这个注解

`@Table`注解声明实体类对应的数据库表明

`@Id`注解声明此字段是主键

`@GeneratedValue`注解声明id的生成策略

`@Column`注解声明字段的相关信息,这里只声明了其长度,其他都按照默认.

## JPA操作数据库

### 基本CRUD操作

```java
/*
 * @(#) UserInfoDaoTest
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2020
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author song
 * <br> 2020-05-11 17:27:10
 */

package com.sunsharing.songjg.spring.demo.dao;

import com.sunsharing.songjg.spring.demo.entity.UserInfoDo;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.Optional;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserInfoDaoTest {
    @Autowired
    private UserInfoDao userInfoDao;

    @Test
    public void CrudTest() {
        UserInfoDo userInfoDo = new UserInfoDo();
        userInfoDo.setUserName("Song");
        userInfoDo.setAge(23);
        //未保存到数据库的时候ID没有被生成,应该未空
        Assert.assertNull("已生成ID",userInfoDo.getUserId());

        userInfoDao.save(userInfoDo);

        //保存到数据库后,ID应该已经被生成了,不应为空
        Assert.assertNotNull("未生成ID",userInfoDo.getUserId());

        //根据ID查询刚刚保存的数据
        Optional<UserInfoDo> userInfoDoOptional = userInfoDao.findById(userInfoDo.getUserId());

        //判断查询的值是否有效
        Assert.assertTrue("没有查询到插入的记录",userInfoDoOptional.isPresent());
        UserInfoDo userInfoDoDb = userInfoDoOptional.get();

        //判断查询到的记录是否就是插入的记录
        Assert.assertEquals("查询到的记录不是插入的记录",userInfoDo.getUserName(), userInfoDoDb.getUserName());

        //修改字段并保存更新
        userInfoDoDb.setAge(18);
        userInfoDao.save(userInfoDoDb);

        //重新用之前查询出来的记录的ID从数据库查询新的数据
        Optional<UserInfoDo> userInfoDoUpdatedOptional = userInfoDao.findById(userInfoDoDb.getUserId());
        //判断是否有查询到记录
        Assert.assertTrue("未查询到更新的数据",userInfoDoUpdatedOptional.isPresent());
        UserInfoDo userInfoDoUpdated = userInfoDoUpdatedOptional.get();

        //判断之前的更新是否生效
        Assert.assertEquals("更新数据出错",Integer.valueOf(18), userInfoDoUpdated.getAge());

        //删除被更新过的记录
        userInfoDao.delete(userInfoDoUpdated);

        //使用被删除记录的ID从数据库查询数据
        Optional<UserInfoDo> userInfoDoDeletedOptional = userInfoDao.findById(userInfoDoUpdated.getUserId());

        //判断是否已经删除
        Assert.assertFalse("删除数据失败",userInfoDoDeletedOptional.isPresent());

    }
}
```

### 属性条件查询

`JPA`的单表条件查询也不用写SQL代码,只需要按照规则写好`Dao`层接口的方法名与参数,`JPA`就可以自动实现条件查询语句.

例如查询某属性的值与给定参数相等的方法:

```java
Optional<UserInfoDo> findByUserName(String userName)
```

查询某属性的值与给定参数相似的方法:

```java
List<UserInfoDo> findAllByUserNameLike(String userName);
```

查询某属性的值大于给定参数的方法:

```java
List<UserInfoDo> findAllByAgeGreaterThanEqual(Integer age);
```

更多的关键词如下:

| 关键字            | 方法命名                       | sql where字句              |
| ----------------- | ------------------------------ | -------------------------- |
| And               | findByNameAndPwd               | where name= ? and pwd =?   |
| Or                | findByNameOrSex                | where name= ? or sex=?     |
| Is,Equals         | findById,findByIdEquals        | where id= ?                |
| Between           | findByIdBetween                | where id between ? and ?   |
| LessThan          | findByIdLessThan               | where id < ?               |
| LessThanEqual     | findByIdLessThanEqual          | where id <= ?              |
| GreaterThan       | findByIdGreaterThan            | where id > ?               |
| GreaterThanEqual  | findByIdGreaterThanEqual       | where id > = ?             |
| After             | findByIdAfter                  | where id > ?               |
| Before            | findByIdBefore                 | where id < ?               |
| IsNull            | findByNameIsNull               | where name is null         |
| isNotNull,NotNull | findByNameNotNull              | where name is not null     |
| Like              | findByNameLike                 | where name like ?          |
| NotLike           | findByNameNotLike              | where name not like ?      |
| StartingWith      | findByNameStartingWith         | where name like '?%'       |
| EndingWith        | findByNameEndingWith           | where name like '%?'       |
| Containing        | findByNameContaining           | where name like '%?%'      |
| OrderBy           | findByIdOrderByXDesc           | where id=? order by x desc |
| Not               | findByNameNot                  | where name <> ?            |
| In                | findByIdIn(Collection<?> c)    | where id in (?)            |
| NotIn             | findByIdNotIn(Collection<?> c) | where id not  in (?)       |
| True              | findByAaaTue                   | where aaa = true           |
| False             | findByAaaFalse                 | where aaa = false          |
| IgnoreCase        | findByNameIgnoreCase           | where UPPER(name)=UPPER(?) |

### 自定义条件查询

如果查询时属性条件过多导致方法名太长太麻烦,可以自定义查询语句进行查询,可以写`JPQL`或者`SQL`进行查询,只需要在`Dao`接口方法上使用`@Query`注解,将查询语句写到注解内即可,示例如下:

```java
//JPQL 查询
@Query("select u from UserInfoDo u where u.age>:age and u.userName like 'S%'")
List<UserInfoDo> findAllByAgeUsername(@Param("age") Integer age);

//SQL 查询
@Query(nativeQuery =true,value="select * from user_info where gender='男' and age>:age")
List<UserInfoDo> findAllByGenderAge(@Param("age") Integer age);
```

### 关联查询

关联查询其实就是基于自定义条件查询的,通过编写`JPQL`或者`SQL`可以实现多种的关联查询,并不需要特别的声明.

另外如果一张表有多个主键的话需要在实体类上加`@IdClass`注解,在注解内传入一个可序列化的类,这个类的所有字段都与当前实体所有主键字段的类型与名称相同,如果当前实体类除了主键外没有其他字段,也可以传入当前类.
