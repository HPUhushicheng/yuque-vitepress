> 我真服了，哭了，记一下辛酸史
>



```plain
frp内网穿透

1panel面板直接安装的话，frpc客户端连不上，

使用一键命令安装

链接：
https://github.com/clangcn/onekey-install-shell/tree/master/frps

```

```plain

wget --no-check-certificate https://raw.githubusercontent.com/clangcn/onekey-install-shell/master/frps/install-frps.sh -O ./install-frps.sh
chmod 700 ./install-frps.sh
./install-frps.sh install
```

```plain
    ./install-frps.sh uninstall
```

```plain
    ./install-frps.sh update
```

```plain
    Usage: /etc/init.d/frps {start|stop|restart|status|config|version}
```

但是我真的很服气，阿里云服务器连不上GitHub，只能放弃

新加坡服务器可搭建，但是好慢，后台地址：[http://152.42.198.13:6443](http://152.42.198.13:6443)

---

:::info
还好有星空内网穿透，还可以临时用一下

官网：[https://xhfrp.xhuzim.top/](https://xhfrp.xhuzim.top/)，

frpc客户端配置文件要看看，最看是就输在这里了

[https://www.ioiox.com/archives/79.html](https://www.ioiox.com/archives/79.html)

还发现了一个，星空组网：[https://doc.starvpn.cn/](https://doc.starvpn.cn/)

[https://mp.weixin.qq.com/s/PZs9cdtTDZhwt5w4gt_xvQ](https://mp.weixin.qq.com/s/PZs9cdtTDZhwt5w4gt_xvQ)

:::



```plain
我想的是用内网穿透把ollama模型传出去，现在看只成功了一半，再看看ngrok能不能用，最好是绑定域名，
```

