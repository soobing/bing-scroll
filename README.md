# 💖 bing-scroll


## BingScroll Full HTML Layout
```html
<template>
  <div class="bing-scroll">
    <div class="picker">
      <ul class="picker__list" :style="`transform: translateY(${positionY}px)`">
        <li class="picker__item">2월</li>
        <li class="picker__item">3월</li>
        <li class="picker__item picker__item__selected">4월</li>
        <li class="picker__item">5월</li>
      </ul>
    </div>
  </div>
</template>

```