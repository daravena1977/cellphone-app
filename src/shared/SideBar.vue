<template>
  <div class="row">
        <div class="col-3">
            <div class="sidebar-container">
                
                    <router-link :to="{ name: link.to }">{{ link.name }}</router-link>
            </div>
        </div>
        <div class="col">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        link: {
            type: Object,
            required: true
        }
    }

}
</script>

<style lang="scss" scoped>
.sidebar-container {
    border: solid 0.5px #c4bfbf;
    border-radius: 10px;
    height: 85vh;
}

li {
    list-style-type: none;
}

a {
    text-decoration: none;
}
</style>