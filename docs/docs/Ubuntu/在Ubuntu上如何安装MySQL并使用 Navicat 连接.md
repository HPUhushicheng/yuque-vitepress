MySQL 是一种流行的开源关系型数据库管理系统，而 Navicat 是一款强大的数据库管理工具。本文将介绍在 Ubuntu 操作系统上安装 MySQL，并使用 Navicat 连接到 MySQL 数据库的步骤。

## 步骤1：安装 MySQL
在 Ubuntu 上通过以下步骤安装 MySQL 服务器及客户端：

```plain
sudo apt-get update
sudo apt-get install mysql-server mysql-client
```

安装过程中，您可能会被要求设置 root 用户的密码。如果没有出现该对话框，请继续执行下面的步骤。

## 步骤2：修改用户密码
要修改 root 用户的密码，请按照以下步骤操作：

1. 打开终端，并以 root 用户身份登录到 MySQL shell：
2. 输入 root 密码以登录到 MySQL shell。
3. 在 MySQL shell 中，执行以下命令来更改 root 用户的密码（将 `new_password` 替换为您要设置的新密码）：

```plain
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
FLUSH PRIVILEGES;
```

4. 退出 MySQL shell：

## 步骤3：配置 MySQL 允许远程连接
要允许来自其他主机的连接，请按照以下步骤进行配置：

1. 编辑 MySQL 配置文件：

```plain
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

2. 找到 `bind-address` 行并注释掉（在行前添加 `#` 符号），以允许来自任何 IP 地址的连接。
3. 保存并关闭文件。
4. 重新启动 MySQL 服务器：

```plain
sudo systemctl restart mysql
```

## 步骤4：修改配置,使其可以被navicat连接
1. 打开终端，并以 root 用户身份登录到 MySQL shell：

选择数据库

更新root用户host字段 让所有ip都可以连接

```plain
update user set host = '%' where user = 'root';
```

刷新修改

## 步骤5：连接 MySQL 数据库
现在我们可以使用 Navicat 连接到 MySQL 数据库：

1. 打开 Navicat 工具，并点击 "连接"（Connect）按钮。
2. 在新建连接窗口中，输入以下信息：
    - 连接名（Connection Name）：自定义名称。
    - 主机名或 IP 地址（Host）：MySQL 服务器的 IP 地址或主机名。
    - 端口号（Port）：默认为 3306。
    - 用户名（Username）：root 或您创建的其他用户。
    - 密码（Password）：之前设置的密码。
3. 点击 "测试连接"（Test Connection）按钮以验证连接是否成功。
4. 如果连接测试通过，点击 "连接"（Connect）按钮以建立与 MySQL 数据库的连接。

恭喜！您已经成功安装了 MySQL 并使用 Navicat 连接到 MySQL 数据库。现在您可以开始管理和操作数据库了。

请注意，在执行上述步骤时，请根据实际情况调整参数和配置信息，确保正确设置密码和允许远程连接。





  


> 来自: [在 Ubuntu 上如何安装 MySQL 并使用 Navicat 连接 - 简书](https://www.jianshu.com/p/4e0d4e7a31e1)
>

