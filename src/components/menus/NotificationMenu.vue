<template>
    <v-menu offset="12">
        <template #activator="{ props }">
            <v-btn icon v-bind="props" class="notifications" @click="document.activeElement.blur()">
                <v-badge :content="notifications.length" color="red" overlap>
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
            </v-btn>
        </template>
        <v-card min-width="350px" class="card-notification" title="Notificações" max-height="200px">
            <v-card-actions class="actions" v-if="notifications && notifications.length > 0">
                    <v-btn class="btn-view-notify" :ripple="false">Visualizar</v-btn>
                </v-card-actions>
            <v-list :lines="false" density="compact" nav v-if="notifications && notifications.length > 0">
                <v-list-item v-for="(notification, index ) in notifications" :key="index" density="compact" class="custom-notification" append-icon="mdi-alert-circle-outline">
                        <v-list-item-title>{{ notification.username }} está aguardando aprovação </v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list :lines="false" density="compact" nav v-else>
                <v-list-item density="compact" class="custom-notification">
                        <v-list-item-title>Você não tem notificações</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    name: 'NotificationMenu',
    props: {
        notifications: {
            type: Array,
            required: true
        }
    },
    data: () => ({

    })
}
</script>

<style scoped>

.notifications {
  background-color: transparent;
  display: flex;
  justify-self: flex-end;
  align-self: center;
  margin-right: 40px;
  cursor: pointer
}

.custom-notification {
  border-bottom: 1px solid #e0e0e0;
  padding: 8px;
}

.custom-notification:last-child {
  border-bottom: none;
}

.custom-notification:hover {
  color: #57a340;;
}

.card-notification {
  overflow-y: auto;
  padding-right: 12px;
  margin-right: 12px;
}

.card-notification::-webkit-scrollbar {
  width: 10px;
}

.card-notification::-webkit-scrollbar-track {
  background: transparent;
}

.card-notification::-webkit-scrollbar-thumb {
  background-color: #57a340; 
  border-radius: 10px;
}

.card-notification::-webkit-scrollbar-button {
  display: none; 
}

.actions {
    display: flexbox;
    background-color: transparent;
    justify-content: flex-end;
    margin-top: -50px;
}
.btn-view-notify {
    height: 25px;
    font-size: 0.7rem;
    background-color: #E0E0E0;
}

.v-btn-view-notify:focus {
    outline: none !important;
    background-color: #050505 !important; 
    box-shadow: none !important; 
}

.btn-view-notify:focus-visible {
  outline: none !important; 
}

.btn-view-notify:hover {
    background-color: #62a84d;
}

.v-btn:focus
 {
  outline: none !important;
  background-color: #57a340 !important; 
  box-shadow: none !important;      
}

.v-btn:focus-visible {
  outline: none !important; 
}
</style>