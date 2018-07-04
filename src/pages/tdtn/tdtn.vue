<template>
  <div id="app">
    <v-header></v-header>
    <section class="tab-bar">
        <ul class="tabs">
            <li>
                <router-link :to="{path: 'content', query: {tabid: 1}}">榜单1</router-link>
            </li>
            <li>
                <router-link :to="{path: 'content', query: {tabid: 2}}">榜单2</router-link>
            </li>
        </ul>
    </section>
    <!-- <tTabBar></tTabBar> -->
    <router-view/>
  </div>
</template>

<script>

import vheader from './components/header'
// import tTabBar from '@/components/common/tabbar'
export default {
  name: 'TDTN',
  components: {
      'v-header': vheader,
  },
}
</script>

<style lang="scss">
@import "@/../../../common/sass/mixin";

$bg-image: "//cbshowhot.cdn.changbaimg.com/-/6d23434d36b11b29/wuyuetian.jpg";

#app {
    max-width: 10rem;
    margin: 0 auto;
    background-image: url($bg-image);
    background-repeat: no-repeat;
    background-size: 100%;
    background-color: #fff;
    font-size: 0.466667rem;
    color: #4954b9;
}

.tab-bar {
    position: relative;
    display: flex;
    .tabs {
        display: flex;
        flex-direction: row;
        width: 675px;
        height: 80px;
        margin: 0 auto;
        li {
            display: flex;
            width: 50%;
            height: 100%;
            border: 2px solid #ffa964;
            border-right: 0;
            color: #ffa964;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            & > a {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                font-size: 0.466667rem;
                color: #4954b9;
                &.active {
                  background-color: #ffa964;
                  color: #4b55b3;
                }
            }
            &:first-child {
                border-right: 0;
                @include radius(1.066667rem 0 0 1.066667rem);
                background-clip: padding-box;
            }
            &:last-child {
                border-right: 2px solid #ffa964;
                border-left: 2px solid #ffa964;
                @include radius(0 1.066667rem 1.066667rem 0);
                background-clip: padding-box;
            }
        }
        
    }
}
</style>
