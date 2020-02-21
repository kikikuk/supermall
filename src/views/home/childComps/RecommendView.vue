<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  components: {},
  data() {
    return {};
  },
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px #eee solid;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  height: 70px;
  width: 70px;
  margin-bottom: 10px;
}
</style>