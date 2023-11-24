<template>
  <div class="row">
        <div class="col-2">
            <div class="sidebar-container bg-primary">
                <ul class="mt-2 px-2">
                    <li class="mt-2 mx-0" v-for="link in links" :key="link.to">
                        <router-link  :to="{ name: link.to }">{{ link.name }}</router-link>
                    </li>
                </ul>
                    
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
        links: {
            type: Array,
            required: true
        }
    }

}
</script>

<style lang="scss" scoped>
.sidebar-container {
    border: solid 0.5px #c4bfbf;
    border-radius: 10px;
    height: 70vh;
}

li {
    list-style-type: none;
}

a {
    text-decoration: none;
    color: #f8f9fa;
}
</style>