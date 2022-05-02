# React 学习笔记

## React 特点

> - **1.声明式设计** −React采用声明范式，可以轻松描述应用。
> - **2.高效** −React通过对DOM的模拟，最大限度地减少与DOM的交互。
> - **3.灵活** −React可以与已知的库或框架很好地配合。
> - **4.JSX** − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
> - **5.组件** − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
> - **6.单向响应的数据流** − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。

## 项目搭建

项目搭建可以直接使用`node.js`的包管理器,创建一个新的项目,以下是使用`npm`与`yarn`两个包管理器创建新的`react`项目的方式.

### npm

```sh
npm init react-app my-app
```

*`npm init ` 在 npm 6+ 中可用*

### Yarn

```sh
yarn create react-app my-app
```

*`yarn create` 在 Yarn 0.25+ 中可用*

## 项目启动

以下统一使用`yarn`包管理器

在命令行进入项目目录,使用以下命令可以启动项目:

```shell
yarn start
```

## JSX的使用

`JSX`是一个 JavaScript 的语法扩展,可以在`JavaScript`中嵌入`HTML`代码,但是`HTML`代码并不作为字符串嵌入,而是作为一个新的单独的语法元素,将其称为`JSX`,具体如下所示:

```jsx
const element = <h1>Hello, world!</h1>;
```

可以在`JSX`中任意地方使用`JavaScript`的表达式,包括方法或者变量的使用,只需将其用`{}`包裹起来就可以,示例如下:

```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```

`JSX`中`HTML`元素的属性将转换为`小驼峰命名`方式来使用,因为`JSX`更加接近`JavaScript`的语法:

```jsx
//如果属性是固定的,可以使用双引号来赋值字符串
const element = <div tabIndex="0"></div>;
//如果是可变的,可以通过  {} 调用变量或者其他表达式来提供数据
const element = <img src={user.avatarUrl}></img>;
```

## 元素渲染

元素渲染就是将`JSX`渲染到页面,以下示例代码将元素渲染到`id`为`root`的的元素下面:

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

使用`ReactDOM.render()`方法渲染的结果将不可被改变,若要改变,则需要再次渲染.

## 组件

组件是由元素组成的,一个组件可以是一个函数,也可以是一个`ES6`中的`class`,如以下示例:

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

组件接收一个对象参数,一般所有组件需要用到的数据都装在这个参数中.

组件也可以可以被`JSX`像使用`HTML`标签一样使用,标签上边的属性将被打包为单个对象传入组件中:

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
```

**组件的名字首字母必须是大写,小写开头的话将被认为是原生标签**

**组件编写时一定要注意不能去改变传入参数的值,通常将组件接收到的第一个参数命名为`props`**

## 组件状态与生命周期

`React`更加推荐使用`ES6的class`来制作组件,这样就就可以使用`state`或`生命周期`等其他特性

使用`state`的组件如下示例:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

可以在以上的示例代码中添加`生命周期`的使用,示例代码如下:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

当组件第一次被渲染到`DOM`中的时候,将会经过`mount`生命周期,意为挂载,当组件被i删除的时候会经过`unmount`生命周期,意为卸载.

以上示例中,类组件中的`componentDidMount()`方法将会在组件`mount`的时候被调用,`componentWillUnmount()`方法将会在组件`unmount`的时候被调用.这两个方法称为生命周期方法.

除了`React`预先定义的由特殊意义的属性与方法之外,用户同样可以自定义属性与方法,示例代码如下:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

以上示例代码中中添加了`timerID`属性,添加了一个`itck()`方法.

在构造函数之外`state`中属性的更改只能使用`setState()`方法,可以传入一个对象来更新,也可以传入一个方法,接收更新前的`state`对象以及`props`对象,并且返回一个新的对象来更新`state`,具体代码如下所示:

```jsx
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

`setState()`方法更新`state`的时候将会用新的值与旧的值合并.

**需要注意的是,由于`React`的渲染特性,以及`state`的私有特性(一个`state`只由当前组件持有,其他组件无权使用),在`React`应用中数据是`自上而下`的,数据从父组件流向子组件,而不能逆流而上.**

## 事件处理

`React`应用中的事件绑定与原生标签类似,但是有三点不同:

- `React`的事件名是小写驼峰命名的
- `React`绑定的事件是一个方法,而不是`JavaScript`代码字符串
- `React`停止事件传播需要在方法中接受一个`事件参数`,调用其`preventDefault()`方法

具体示例如下:

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

如果使用`ES6`语法来创建组件,则可以如以下示例来绑定事件:

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

为了在回调方法中使用`this`,需要在构造方法中为此回调方法绑定`this`,或者使用`箭头函数`来声明回调方法,`箭头函数`声明回调方法如下所示:

```jsx
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

## 条件渲染

在`JSX`中可以在任意地方使用`{}`插入`JavaScript`表达式,而`JSX`作为`JavaScript`的扩展,自然也能出现在其中,这就意味着`JSX`中可以嵌入`JSX`.

可以使用`&&`运算符来进行条件渲染,如下示例:

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```

同样也可以使用三目运算符`?:`,示例如下:

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

**如果要控制当前组件是否要被渲染,可以控制`render()`方法的返回值,如果返回`null`那么此组件将不会被渲染**



## 列表渲染

列表渲染就是使用给定的数据列表,对其中的内容进行渲染.在`React`中,因`JSX`的灵活性,可以以如下的方式进行列表渲染:

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

与`Vue`类似的,进行列表渲染时,需要为每个元素指定`key`属性,`key`属性应该是在整个列表独一无二的,以提供唯一性来告诉`React`应用当数据改变时应该对哪个`DOM`进行重新渲染,示例代码如下:

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
```

`JSX` 允许在大括号中嵌入任何表达式，所以我们可以内联 `map()` 返回的结果：

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
		{numbers.map((number) =>
			<ListItem key={number.toString()}
				value={number} />
		)}
	</ul>
  );
}
```

## 表单

因为表单元素会有保持一些自己的状态,因此与其他的标签不太一样,`React`建议将其状态使用`state`来控制,称为受控组件.

示例如下:

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

虽然`React`推荐使用受控组件,但是有些时候它太麻烦了,可以使用非受控组件来代替,示例如下:

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

如果希望一个非受控组件有一个初始值,就不能使用`value`属性,它将会导致元素不可被输入,可以使用`defaultValue`属性代替,具体示例如下:

```jsx
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

如果想要通过`input`标签输入文件的话,就只能使用非受控组件:

```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.current.files[0].name}`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

## 状态提升-向父组件传递数据

状态提升可以向父组件传递数据,其实就是放弃使用组件内部的`state`改而使用`props`同时每次值的改变都调用父组件通过`props`传递的方法,达到传递数据到父组件的目的,自然的,组件也可以保留自己内部`state`状态的同时,对一部分数据进行状态提升,具体实例代码如下:

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
      //状态改变时调用父组件传递来的方法
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
      //使用props的数据
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

