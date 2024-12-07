<template>
    <v-menu offset="12">
        <template #activator="{ props }">
            <v-btn icon v-bind="props" class="profile">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        </template>
        <v-card class="custom-card" min-width="200px" outlined color="#57a340" variant="elevated" dark>
            <v-list class="custom-list" :lines="false" density="compact" nav>
            <v-list-item v-for="(item, index) in profileItems" :key="index"  class="custom-item text-white" @click="handleAction(item)">
                <v-list-item-title><v-icon>{{ item.icon }}</v-icon> {{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    name: 'ProfileMenu',
    props: {
        profileItems: {
            type: Array,
            required: true
        }
    },
    methods: {
        handleAction(item) {
            if(item.action ===  "logout") {
                this.logout()
            } else if(item.to) {
                this.$router.push(item.to)
            }
        },

        logout() {
            console.log("SAIR")
            localStorage.removeItem("token")
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>

.profile {
  background-color: transparent;
  display: flex;
  justify-self: flex-end;
  align-self: center;
  margin-right: 40px;
  cursor: pointer
}
.custom-card {
  background-color: #57a340;
  color: white;
}

.custom-list {
  background-color: #57a340;
}

.custom-item {
  color: white;
  transition: background-color 0.3s ease;
  cursor: pointer
}

.custom-item:hover {
  background-color: #80c25c;
}
</style>