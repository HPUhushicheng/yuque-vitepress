---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 代码随想录
  text: ┑(￣Д ￣)┍
  tagline: 没有什么是"突然结束"的，结束都有漫长而压抑的伏笔
  image:
    src: /logo.png
    alt: comefly
  actions:
    - text: 文章汇总
      link: /content/
    - text: 图库
      link: /gallery/
    - text: 关于我
      link: /about/
    - theme: alt
      text: 工具箱
      link: /nav/
features:
  - icon: 📖
    title: 文章汇总
    details: 本科期间断断续续写的一些文章<small>（可能有点乱）</small><br />部分文章摘录于互联网
    link: /content/
    linkText: 文章汇总
  - icon: 📘
    title: 阅读思考
    details: 编程语言,计算机视觉,文本生成类大模型,前后端,电子diy,智能车等等,不乏一些胡言乱语<br />但都是自己的思考
    link: /content/#完全模型
    linkText: 阅读思考
  - icon: 💡
    title: Linux
    details: 学到的有关Ubuntu用于建站，深度学习，开发等等的内容<br />
    link: /content/#Ubuntu
    linkText: Linux
  - icon: 🧰
    title: 个人开发项目集合
    details: 本科期间陆陆续续写的一些小项目<br />
    link: /content/#网络比赛
    linkText: 个人开发项目集合
  - icon: 🐞
    title: 踩坑记录
    details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
    link: /content/#其他
    linkText: 踩坑记录
  - icon: 💯
    title: 吾志所向，一往无前。
    details: 一个热爱code的菜鸡
    link: /about/
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
