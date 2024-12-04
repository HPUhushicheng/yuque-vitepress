---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { NAV_DATA } from './data'
</script>
<style src="./index.scss"></style>

# 文章汇总

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />

::: tip
人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。
:::