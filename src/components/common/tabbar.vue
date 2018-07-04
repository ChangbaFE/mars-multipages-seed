<template>
    <section class="tab-bar">
        <ul class="tabs">
            <li>
                <span>新秀歌手榜</span>
            </li>
            <li>
                <span>实力歌手榜</span>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      msg: 'Tab'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/../../../common/sass/mixin";
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
            border: 2px solid #ffa964;
            border-right: 0;
            color: #ffa964;
            justify-content: center;
            align-items: center;
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
        .active {
            background-color: #ffa964;
            color: #4b55b3;
        }
    }
}
</style>
