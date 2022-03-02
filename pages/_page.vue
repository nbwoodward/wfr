<template>
  <div>
    <article v-if="pageFound">
      <h1>{{ page.title }}</h1>
      <hr />
      <nuxt-content :document="page" />
    </article>
    <div v-else>
      <h1>Error</h1>
      Page Not Found
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    let pageFound = true
    const pageName = params.page === undefined ? 'index' : params.page

    const page = await $content(pageName)
      .fetch()
      .catch(() => {
        pageFound = false
      })

    return {
      pageFound,
      page,
    }
  },
}
</script>
<style>
hr {
  height: 1px;
  background-color: #eee;
  border: none;
  margin: 10px 0;
}
</style>
