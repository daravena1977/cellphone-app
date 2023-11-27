<template>
    <h3>Marcas</h3>
    <hr>
    <div class="d-flex gap-3">
        <button @click="newBrand" class="btn btn-primary w-25">Nueva Marca</button>
        <input @keypress.enter="newBrand" v-model="name" class="form-control w-25" type="text" placeholder="ingrese marca...">
    </div>
    <hr>

    <button @click="brands" class="btn btn-success">Ver marcas</button>
    <button v-if="isLoading" class="btn btn-danger mx-2">Eliminar marca</button>

    <table v-if="isLoading" class="table table-sm mt-4 w-25">
        <caption>Listado de marcas</caption>
        <thead class="table-dark">
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Marca</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="brand in getStoreBrands" :key="brand.id">
                <th scope="row">{{ brand.id }}</th>
                <td>{{ brand.name }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            name: '',
            isLoading: false
        }
    },

    methods: {
        ...mapActions('setup', (['loadBrands', 'createBrand'])),
        newBrand() {
            this.createBrand(this.name)
            this.name = ''
        },
        brands() {
            this.isLoading = true
            this.loadBrands()
        }
    },

    computed: {
        ...mapGetters('setup', ['getBrands']),
        getStoreBrands() {
            return this.getBrands
        }
    }


}
</script>

<style lang="scss" scoped>
h3 {
    color: #dc3545;
}
</style>