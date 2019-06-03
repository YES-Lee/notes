## Git 常用指令

### 基本操作
#### 版本管理
1. 初始化一个版本库
    ```bash
    # 进入项目目录下
    git init
    ```
2. 将文件添加到版本库
    ```bash
    # 添加单个/多个文件
    git add filename1 filename2
    # 添加目录下所有文件
    git add .
    ```
3. 提交一个版本记录
    ```bash
    git commit -m "commit message" # 每次提交都需要写上提交说明
    ```
4. 查看版本/提交记录
    ```bash
    git log
    ```
#### 分支管理
1. 签出一个分支
### Git 进阶

## 自定义Git
可以通过修改配置文件来自定义git，配置文件根据优先级有三个：系统配置`/etc/gitconfig`、全局配置`~/.gitconfig `、本地配置（项目目录下`.git/config`）。项目配置拥有最高优先级，我们可以针对不同的项目自定以配置，也可以根据个人风格修改全局配置。

基本配置参考[Git官方文档](https://www.git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)
