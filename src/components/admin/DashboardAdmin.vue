<template>
    <v-row justify="center"> 
        <v-row>
            <v-col>
                <h1>Dashboard Admin</h1>
            </v-col>
        </v-row>
        <v-col cols="12">
            <v-data-table :items="filteredUsers" :headers="headers" class="fixed-header-table" fixed-header height="700px" :items-per-page="-1">
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
import axios from '@/services/axios.js';

export default {
    name: 'DashboardAdmin',
    data: () => ({
        pendingUsersList: [],
        headers: [
            {title: "Nome do Usuário", align: "center", sortable: true, value: "username"},
            {title: "Email do Usuário", align: "center", sortable: true, value: "email"},
            {title: "Status", align: "center", sortable: true, value: "roles"}

        ]
    }),
    computed: {
        filteredUsers() {
            return this.pendingUsersList.map(user => ({
            ...user,
            roles: user.roles.map(role => role.name).join()
            }));
        }
    },
    methods: {
        async getPendingUsers() {
            try{
                await axios.get('/admin/pending-users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(response => {
                    console.log(response.data)
                    this.pendingUsersList = response.data
                }).catch(error => {
                    console.log("Error: ", error)
                })
            } catch(error) {
                console.log("Error: ", error)
            }
        } 
    },
    mounted() {
        this.getPendingUsers()
    }
}
</script>