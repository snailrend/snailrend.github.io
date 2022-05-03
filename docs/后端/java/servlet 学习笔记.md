---
date: 2022-03-21 16:55:00
title: servlet 学习笔记
feed:
  enable: true
---
# servlet 学习笔记

## 1.servlet是什么

​	Java Servlet 是运行在 Web 服务器或应用服务器上的程序，它可以用来处理HTTP请求。

​	但实际上 Servlet 本身只是一个规范,在代码上表现为接口,真正处理 HTTP 请求的是 Servlet 的实现类。用户可以实现 Servlet ，然后将 Servlet 的实现类放在 Servlet 容器中（例如 Tomcat），容器去监听 HTTP 请求，然后根据URL调用对应的 Servle来处理请求。

## 2. 生命周期

Servlet 从创建到销毁会经过三个过程：

1. init（）

   servlet 通过 init（）方法进行初始化，可以在这里加载所需要的资源

2. service（）

   servlet 的 service（）方法负责处理请求，并返回对应信息。

3. destroy（）

   servlet 的 destroy（）方法负责执行销毁操作，可以在这里释放相关的资源，当 servlet 被销毁的时候就会调用 destroy （）方法。

## 3. Servlet的执行流程

### (1)如何配置

servlet 的实现类创建好后，需要在项目的 `web/WEB-INF/web.xml` 中进行配置，只有配置之后，才能让 Servlet 容器根据 URL 调用对应的 Servlet 进行处理。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
<!--    声明一个 Servlet 的存在,并且为它定义一个名字-->
    <servlet>
        <servlet-name>ServletName</servlet-name>
        <servlet-class>DemoServlet</servlet-class>
    </servlet>
<!--    声明一个映射关系并且为 ServletName 对应的 Servlet 指定一个 URL-->
    <servlet-mapping>
        <servlet-name>ServletName</servlet-name>
        <url-pattern>/ServletURL</url-pattern>
    </servlet-mapping>
</web-app>
```

### (2) 内部是如何处理实现的

通过上面的配置，可以让 Servlet 容器根据 `URL` 调用对应的 `Servlet`实例，具体来说就是调用 `Servlet#service`方法.

如果是直接实现 `Servlet`接口，那么就可以在 `Servlet#service`方法写业务代码即可，根据请求的方法（`GET`、`POST`、`PUT`、`DELETE`等方法）决定如何处理此次请求。

不过 Java 也有其他实现了 `Servlet`接口的抽象类，对其进行了封装，有更多较为方便的操作。例如`HttpServlet`类，一般创建`servlet`实现类的时候都是实现的`HttpServlet`，它提供了两个必须被实现的抽象方法`doGet`与`doPost`，在类的内部直接根据请求的方法分别调用这两个抽象方法，若是继承了 `HttpServlet`，则可以只实现这两个方法就可以运行。

## 4. Servlet三大域对象

`Servlet`有三大域对象：

- request

  - 类型：ServletRequest

  - 作用域：当前请求

  - 创建时间：`Servlet`接到一个请求的时候就创建一个 request

  - 销毁时间：请求结束时被销毁

  - 使用场景：用于在`HTTP`客户端与服务端应用间传输数据，也可以通过`请求转发`在`Servlet`之间传输。

  - 使用方法：

    ```Java
    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
            //获取 HTTP 客户端传递的参数
            request.getParameter("keyOne");
            //设置一个属性到 request 中，指定属性名与值,值可以是对象,可在转发到其他 Servlet 中的时候被使用
            request.setAttribute("keyThree",new Object());
            //获取之前设置的属性值
            request.getAttribute("keyTwo");
            //获取 HTTP 客户端传递的请求头
            request.getHeader("Host");
        }
    ```

    

- session

  - 类型：HttpSession

  - 作用域：当前会话有效，会话就是用户浏览器访问页面后到`session`过期或者用户关闭页面的这段时间

  - 创建时间：用户第一次访问页面时

  - 销毁时间：`session`过期或者被手动调用`session. invalidate()`方法后销毁

  - 使用场景：因为在`session`中的数据可以在用户的整个会话中被访问，可以存储用户的临时数据，或者保存用户的登录状态等等，不过因为`session`的访问依赖 `cookie`，而`cookie`是不安全的，所以`servlet`的`session`也有较大的数据泄露风险。

  - 使用方法：

    ```java
    
        protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
            //根据请求获取对应的 session
            HttpSession session = request.getSession();
            //向 session 中设置属性,并指定属性名与值,方便在下次请求中使用
            session.setAttribute("keyFour",new Object());
            //根据属性名获取之前设置的值
            session.getAttribute("keyFour");
            //删除一个属性
            session.removeAttribute("keyFour");
            //销毁当前的 session
            session.invalidate();
        }
    ```

    

- application

  - 类型：ServletContext

  - 作用域：整个应用

  - 创建时间：应用启动时

  - 销毁时间：应用销毁时

  - 使用场景：可以存储应用的状态，例如存储当前的在线人数等

  - 使用方法：

    ```java
    
        protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
            
            //获取应用上下文,this.getServletContext()并非是 Servlet 接口的方法,而是实现了 Servlet 接口的 HttpServlet 抽象类所提供的方法
            //HttpServlet 抽象类同时也实现了 ServletConfig,getServletContext()方法就是 ServletConfig 接口提供的
            ServletContext context = this.getServletContext();
            ////向 Application 中设置属性,并指定属性名与值,这个属性在整个应用范围都可以被访问
            context.setAttribute("keyFive",new Object());
            //通过一个属性名,获取对应属性的值
            context.getAttribute("keyFive");
            //通过属性名,删除一个属性
            context.removeAttribute("keyFive");
        }
    ```

    

## 5. servlet的请求和响应

`当Servlet`容器接到请求的时候，就会去调用对应`Servlet`的 `service（）`方法，`Servlet#service`方法有需要两个参数：

`request：ServletRequest`：携带`HTTP`请求的相关信息，包括请求参数、请求头等数据。

`response：ServletResponse`：请求处理完成后要返回的对象，如果有需要返回的数据可以通过此对象返回。

- `request `可以访问客户端传来的参数，如果此次请求是被转发而来，也可以获得其他`Servlet`设置的属性，通过`request`可以获得此次请求的方法，可以根据方法选择对应的处理方式。也可以通过`request`将此次的请求转发到其他`Servlet`，也可以通过`request`获得当前会话的`session`，对一些数据进行暂时的存储。

- `response`装载着需要返回给客户端的数据。可以设置请求的状态值、返回错误给客户端，错误可以携带提示信息。也可以将当前请求重定向到新的地址，重定向跟转发不一样，无法携带`request`，所以没法共享当前`Servlet`的数据，重定向就相当于让客户端重新发起了一个新的请求到另一个`URL`。



## 6. servlet的单实例多线程

`Servlet`是单实例的，当`Servlet容器`接到一个请求时，首先检查对应的`Servlet`实例是否已经被创建，如果已经被创建了，就不会再创建。

但是 `Servlet`是在多线程环境下运行的，每当容器接到一个请求，就会分配或创建一个线程去执行`Servlet`，单例的`Servlet`节省了每次都创建`Servlet`的资源浪费，但是也会使得`Servlet`有线程不安全的风险，解决线程不安全有两种：

- 不在`Servlet`中创建任何属性,避免多个线程访问同一个属性，导致线程不安全。

- 使用`synchronized`关键字为使用到的`Servlet`属性加锁。

  相对来说使用第一种方法较好，因为`synchronized`较为耗费资源，如果可以避免使用属性，则可以提高许多性能。

## 7. session 与 cookie

简单来说`session`中的数据是存储在服务器内存中的,`cookie`是存储在客户端浏览器中的.

`cookie`只能存储ASCII字符串,按照键值对的形式存储在客户端的内存或者硬盘中,具体是存储在内存还是硬盘要看`cookie`的过期时间,如果没有设置过期时间,那么`cookie`的有效期是在用户关闭页面前,这个时候就是存储在内存中,如果设置的有效时间,那么就是存储在硬盘中,浏览器一般会给每个`cookie`设置其所属域名,在请求资源的时候会自动带上对应域名的`cookie`.

`cookie`可以通过`JavaScript`代码在浏览器环境设置,也可以通过在请求后端服务器时服务器返回响应头携带来设置`cookie`.因为`cookie`相对于用户是可见的,并且会随着请求自动的发送`cookie`,所以`cookie`是不安全的,容易被非法用户获取到用户的隐私信息,容易被CSRF(跨站请求伪造)攻击.

`seesion`的数据是存储在服务器内存中的,同样是以键值对的方式存储,存储类型可以是任何Java类型或对象,`seesion`的有效期最长是一个会话时间,`HTTP`请求是没有状态的,识别会话是否结束是通过浏览器`cookie`,当服务器获得一个请求就会检查请求头中是否有`sessionId`字段,如果有,就按照`sessionId`获取对应的`session`,如果没有,则创建一个新的`session`并且将`sessionId`放到响应头,存储到客户端浏览器的`cookie`中,以便下次访问服务器的时候可以识别会话,所以`session`的会话时间其实是根据自动传递的`cookie`来识别的,根据`cookieId`的不同`session`也不同,所以也可以说是`cookie`决定了`session`.这样一来如果`cookie`泄露,那么尽管`session`是存储在服务器内存中也会有数据泄露的风险.

## 8.web http请求过程（包括了解浏览器资源加载渲染原理）

从输入`URL`到浏览器中的地址栏进行访问,到浏览器进行页面渲染请求结束经过了6个步骤:

- DNS 解析

  解析出`URL`中的域名,请求`DNS`服务器,获得对应域名的 IP 地址

- TCP 连接

  获取到IP地址后将确认客户端与服务器之间的网络是否通畅,需要进行三次握手以确保互相能够听到对方发出的信息,三次握手顺序如下:

  - 客户端发送报文:`SYN=1 Seq=X`

    其中`SYN=1`表示向服务器要求要建立连接,`Seq=X`代表当前的请求码,其中`X`是随机的整型数值.

  - 服务器回应报文:`SYN=1 ACK=X+1 Seq=Y`

    其中`SYN=1`表示服务器统一建立连接,`ACK=X+1`中的`X`是之前客户端发向服务器的`Seq`的值,将其加一之后发送回客户端表示服务器接到了客户端的请求,并且接到的数据无误,`Seq=Y`是代表本次报文发送的请求码.

  - 客户端回应报文:`ACK=Y+1 Seq=Z`

    客户端接收到服务器的回应报文后,检查其`ACK`的值,是否是之前客户端发送的`Seq`值加一,如果是的话,就将服务器回应报文的`Seq`的值加一,放到`ACK`中返回,并且随机生成并发送本次请求码`Seq=Z`.

  经过三次握手之后,客户端可以确认服务器能够接收到自己发送的信息,服务器也可以确认客户端可以接受到自己发送的信息.

- 发送 HTTP 请求

  经过三次握手后就真正的开始发送请求,请求包括三个部分:

  - 请求行

    请求行包括:请求方法,URL,协议版本三个信息

  - 请求头

    请求头以回车与换行作为字段与字段的分界,在字段中以`:`来分割字段名与字段值.

  - 请求体

    请求体是具体的字符串数据

- 服务器处理请求并返回 HTTP 报文

  服务器返回的报文中有三个部分:相应行、响应头、响应体,响应头与响应体跟请求头、请求体的格式一样,但是响应头是不大一样,响应头包含了协议版本、状态码、原因短语也就是消息。

- 浏览器解析渲染页面

  浏览器解析渲染页面分为一下五个步骤：

  - 根据 HTML 解析出 DOM 树
  - 根据 CSS 解析生成 CSS 规则树
  - 结合 DOM 树和 CSS 规则树，生成渲染树
  - 根据渲染树计算每一个节点的信息
  - 根据计算好的信息绘制页面

- 断开连接

  数据传送完毕需要断开连接，断开连接需要经过TCP 四次握手，断开连接一般是客户端主动断开连接，四次握手发送的报文如下：

  - 客户端发送报文：`Fin=1 ACK=Z Seq=X`

    `Fin=1`表示要断开连接客户端没有数据要发送了，`ACK=Z`表示发送一个确认码，`Seq=X`代表当前的请求码,客户端进入`FIN_WATI_1`状态。

  - 服务器回应报文：`ACK=X+1 Seq=Z`

    `ACK=X+1`表示接到断开连接的请求，直到没有数据要从客户端发送数据了，并确认信息无误。客户端进入`FIN_WATI_2`状态

  - 服务器回应报文：`Fin=1 ACK=X Seq=Y`

    当服务端要发送的数据已经发送完毕，就发送此次报文，`Fin=1`表示请求断开连接，同时服务端进入`LAST_ACK`

  - 客户端回应报文：`ACK=Y Seq=X`

    客户端确认收到断开连接请求，发送报文确认已收到。客户端进入`TIME_WATIE`，服务端收到此次报文后就会真正断开连接，客户端等待`2MSL`后没有收到回复的话，也断开连接。