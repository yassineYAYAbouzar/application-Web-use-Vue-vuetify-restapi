<template>
    <div  class="test">
        hello world
        <headerTest/>
        <samiraTest/>
    </div>
</template>
<script>
import headerTest from '../components/headerTest.vue';
import samiraTest from '../components/samiratest';
export default {
    name :"test",
      components: { headerTest,samiraTest},
}
</script>
<style scoped>
.test{
    color: #F50;
}
</style>