---
date: 2022-03-21 16:55:00
title: mysql语法学习
feed:
  enable: true
---
# mysql语法学习

### SQL增删改查

#### insert

 语法：insert [into] <表名> [列名] values <列值>

如果要插入的数据包括所有字段,那么可以省略`[列名]`,但是数据的顺序需要是建表时的字段顺序

```sql
insert into user_info(user_name,phone,gender) values('Song','15999999999','男');
```

也可以用于表数据的迁移:

语法：insert into <已有的新表> [列名] select <原表列名> from <原表名>

此处的`[列名]`同样可以省略

```sql
insert into user_info_new select * from user_info_old where age=18;
```

**特别注意的是后面的 select 语句一定要加 where 条件,否则一定会进行全表扫描,如果是在生产环境,数据量极大又全表扫描的情况下会导致数据库宕机,导致其他服务受极大影响,不过如果加的 where 条件中的字段没有索引,也会导致全表扫描**

#### delete

语法：delete from <表名> [where <删除条件>]

where 条件如果没有,则会删除整个表的数据

```sql
delete from user_info where user_name='Song'
```

如果要删除整张表的数据也可以使用下面这种方法:

语法：truncate table <表名>

```sql
truncate table user_info
```

#### update

语法：update <表名> set <列名=更新值> [where <更新条件>]

```sql
update user_info set age=18 where user_name='Song'
```

#### select

语法：select <列名> from <表名> [where <查询条件表达试>] [order by <排序的列名>[asc或desc]]

```sql
select * from user_info where age>=18 order by age asc
```

`order by `语句可以限定根据某个字段进行排序,后面的`asc`代表升序,`desc`代表降序.

可以在查询语句最后加上`limit`限定查询结果的行数:

```
select * from user_info where age>=18 order by age asc limit 10
```

也可以进行子查询:

```sql
select * from (select * from user_info where age=19) user where gender='男'
```



### SQL关联查询

#### inner join

`inner join`可以将两张表根据条件连接在一起,条件不相等则不会出现在结果集中

```sql
select * from user_info u inner join guard g on u.user_id=g.user_id
```

`inner join`也可简写成`join`

在`inner join`语句后面也可以加上`where`语句

```sql
select * from user_info u inner join guard g on u.user_id=g.user_id where u.age>18
```

#### left join/right join

`left join`与`right join`与`inner join`有所不同,它们会选取其中一个表作为主表,主表的数据,即使在`on`条件中没有符合,数据依然会出现在结果集中,`left join`是以左边的表为主表,`right join`是已右边的表作为主表.

下面的示例表示已`user_info`表作为主表,无论有另一个表有没有`user_id`字段相等的数据,主表的数据都会出现在结果集中.

```sql
select * from user_info u left join guard g on u.user_id=g.user_id 
```

如果换成 `right join`也可达到相同的效果:

```sql
select * from guard g right joinuser_info u on u.user_id=g.user_id 
```

#### union

`union`就是并集操作,将两次查询的结果进行并集,默认是去除两个结果集中的重复记录

```sql
select * from user_info where gender='男'
union 
select * from user_info where age>50
```

如果想保留重复的记录,可以使用`union all`

### 数据库字符集与校对规则

MySQL中的`utf8`字符集并不完整，只支持`3bytes`的文字，这是历史遗留问题，在MySQL中要使用`utf8mb4`才能支持占用`4bytes`的文字，一般而言都使用`utf8mb4`字符集。

校对规则比较常用的是`utf8mb4_general_ci`、`utf8mb4_unicode_ci`、`utf8mb4_bin`，校对规则的命名约定：以其相关的**字符集名开始**，中间包括一个**语言名**，并且以**_ci**（大小写不敏感）、**_cs**（大小写敏感）或**_bin**（二元）结束。

以上常用的校对规则中，前两个两个是大小写不敏感的，最后一个是按照二进制来校对排序的，所以是大小写敏感的。

> 而`utf8mb4_unicode_ci`和`utf8mb4_general_ci`对于中文和英文来说，其实是没有任何区别的。对于我们开发的国内使用的系统来说，随便选哪个都行。只是对于某些西方国家的字母来说，`utf8mb4_unicode_ci`会比`utf8mb4_general_ci`更符合他们的语言习惯一些，`general`是mysql一个比较老的标准了。例如，德语字母`“ß”`，在`utf8mb4_unicode_ci`中是等价于`"ss"`两个字母的（这是符合德国人习惯的做法），而在`utf8mb4_general_ci`中，它却和字母`“s”`等价。不过，这两种编码的那些微小的区别，对于正常的开发来说，很难感知到。
>
> 作者：腾讯云加社区
> 链接：https://juejin.im/post/5bfe5cc36fb9a04a082161c2
> 来源：掘金
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

所以比较推荐使用`utf8mb4_unicode_ci`的校对规则。

### 数据库索引

索引可以优化数据库查询速度,应该在经常被查询的字段上使用索引,常见的`primary key`也是一种索引,索引的创建方法有三种,以下以普通索引为例:

- 直接创建索引

  ```sql
  CREATE INDEX indexName ON mytable(username(length)); 
  ```

- 修改表结构添加索引

  ```sql
  ALTER table tableName ADD INDEX indexName(columnName)
  ```

- 创建表时指定索引

  ```sql
  CREATE TABLE mytable(  
   
  ID INT NOT NULL,   
   
  username VARCHAR(16) NOT NULL,  
   
  INDEX [indexName] (username(length))  
   
  );  
  ```

删除索引方式如下:

```sql
DROP INDEX [indexName] ON mytable; 
```

**索引有以下类别**:

1. 普通索引

2. 唯一索引

   建立索引的字段不可有重复值,修改表结构以及创建表结构的时候创建索引时不需要`index`关键字,只需要`unique`就行.

3. 主键索引

   主键索引是一种特殊的唯一索引,使用`primary key`关键字创建索引.

4. 组合索引

   组合索引就是在多一个字段上创建索引,使用索引时,在索引的左前缀集合中即可使用索引.

5. 全文索引

   用于查找文本的关键字,查询时配合`match aginst`使用.

**索引使用注意事项**

1. 索引不会包含有NULL值的列,如果列中有NULL值,则此索引就无效
2. 尽量使用断索引
3. 一条语句只使用一个索引,如果`where`中使用了索引,`order by`中是不会使用索引的
4. like语句只有类似'aaa%'的条件才会使用索引
5. 在列上进行计算会导致索引失效

### SQL执行计划

sql执行计划就是一条SQL对表的操作顺序,使用`EXPLAIN`关键字写在一条SQL前面进行执行,就可以看到这条SQL的执行计划了会出现有如下字段的表格

- **id**   

  表示查询中select子句或操作表的顺序,id的值越大执行的优先级越高,越先执行,如果id相同,则执行顺序是从上到下

- **select_type**  

  表示查询子句的类型,类型如下:

  - simple:查询中不包含子查询或者 union
  - primary:包含子查询或者其他复杂子部分的语句
  - subquery:包含在select 或者 where后面的子查询
  - derived:包含在 from 后面的的子查询
  - union:在union 后的查询语句
  - union result:从UNION中获取结果集

- **table**  表示要操作的数据表

- **partitions** 要操作的表分区

- **type** 

  表示访问类型,类型如下

  `ALL`   扫描全表数据

  `index` 遍历索引

  `range` 索引范围查找

  `index_subquery` 在子查询中使用 ref

  `unique_subquery` 在子查询中使用 eq_ref

  `ref_or_null` 对`Null`进行索引的优化的 ref

  `fulltext` 使用全文索引

  `ref`   使用非唯一索引查找数据

  `eq_ref` 在`join`查询中使用`PRIMARY KEY`or`UNIQUE NOT NULL`索引关联。

- **possible_keys**  有可能使用的索引

- **key**   实际使用的索引

- **key_len** 索引长度

- **ref**   表示上述表的连接匹配条件，即哪些列或常量被用于查找索引列上的值

- **rows**  结果集数目的估算数

- **filtered**  

- **extra** 其他信息

通过查看SQL的执行计划,可以看出复杂语句的执行顺序,是否使用索引等信息,通过执行计划,可以对SQL进行优化,对于没有使用索引的SQL要考虑加索引

### 分析SQL执行效率与优化

> #### 单表优化
>
> 除非单表数据未来会一直不断上涨，否则**不要一开始就考虑拆分**，拆分会带来逻辑、部署、运维的各种复杂度，一般以整型值为主的表在**千万级**以下，字符串为主的表在**五百万**以下是没有太大问题的。
>
> 而事实上很多时候 MySQL 单表的性能依然有不少优化空间，甚至能正常支撑**千万级**以上的数据量。
>
> #### 字段
>
> - 尽量使用 `TINYINT`、 `SMALLINT`、 `MEDIUM_INT` 作为整数类型而非 `INT`，如果非负则加上 `UNSIGNED`
> - `VARCHAR` 的长度只分配真正需要的空间
> - 使用枚举或整数代替字符串类型
> - 尽量使用 `TIMESTAMP` 而非 `DATETIME`
> - 单表不要有太多字段，建议在 **20** 以内
> - 避免使用 `NULL` 字段，很难查询优化且占用额外索引空间
> - 用整型来存 **IP**
>
> #### 索引
>
> - 索引并不是越多越好，要根据查询有针对性的创建，考虑在 `WHERE` 和 `ORDER BY` 命令上涉及的列建立索引，可根据 `EXPLAIN` 来查看是否用了索引还是全表扫描
> - 应尽量避免在 `WHERE` 子句中对字段进行 `NULL` 值判断，否则将导致引擎放弃使用索引而进行全表扫描
> - 值分布很稀少的字段不适合建索引，例如"性别"这种只有两三个值的字段
> - 字符字段只建前缀索引
> - 字符字段最好不要做主键
> - 不用外键，由程序保证约束
> - 尽量不用 `UNIQUE`，由程序保证约束
> - 使用多列索引时主意顺序和查询条件保持一致，同时删除不必要的单列索引
>
> #### 查询SQL
>
> - 可通过开启慢查询日志来找出较慢的 SQL
> - 不做列运算： `SELECT id WHERE age+1=10`，任何对列的操作都将导致表扫描，它包括数据库教程函数、计算表达式等等，查询时要尽可能将操作移至等号右边
> - sql 语句尽可能简单：一条 sql 只能在一个 cpu 运算；大语句拆小语句，减少锁时间；一条大sql 可以堵死整个库
> - 不用 `SELECT *`
> - `OR` 改写成 `IN`： `OR` 的效率是 n 级别， `IN` 的效率是 log(n) 级别，`IN` 的个数建议控制在 200 以内
> - 不用函数和触发器，在应用程序实现
> - 避免 `%xxx` 式查询
> - 少用 `JOIN`
> - 使用同类型进行比较，比如用 '123' 和 '123' 比， 123 和 123 比
> - 尽量避免在 `WHERE` 子句中使用 `!=` 或 `<>` 操作符，否则将引擎放弃使用索引而进行全表扫描
> - 对于连续数值，使用 `BETWEEN` 不用 `IN`： `SELECT id FROM t WHERE num BETWEEN 1 AND 5`
> - 列表数据不要拿全表，要使用 `LIMIT` 来分页，每页数量也不要太大
>
>
> 作者：低至一折起
> 链接：https://juejin.im/post/5b7d52afe51d453885030b91
> 来源：掘金
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。