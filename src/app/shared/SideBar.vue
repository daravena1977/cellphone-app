<template>
  <div class="row">
        <div class="col-2">
            <div class="sidebar-container bg-primary">
                <ul class="mt-2 px-2">
                    <li class="mt-3 mx-0" v-for="link in links" :key="link.to">
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
    position: sticky;
    top: 80px;
    border: solid 0.5px #c4bfbf;
    border-radius: 10px;
    height: 80vh;
}

li {
    list-style-type: none;
    box-shadow: 0px 1px 1px 1.2px;
    text-align: center;
    padding: 1rem;
    border-radius: 0.5rem;
}

a {
    text-decoration: none;
    color: #f8f9fa;    
}

.router-link-active {
    color: #e74c3c;
}
</style>