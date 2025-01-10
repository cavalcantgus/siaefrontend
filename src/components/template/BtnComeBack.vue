<template>
    <div class="container">
        <v-tooltip location="right" theme="light" max-height="20px" text="Clique para voltar">
            <template #activator="{ props }">
                <v-btn icon color="#57a340" to="/menu-pnae" v-bind="props" class="btn-comeback elevation-0">
                    <v-icon size="large">
                        mdi-arrow-left-thick
                    </v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </div>
</template>

<style scoped>
.container {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    margin-top: 50px;
    margin-bottom: -30px;
    margin-left: 50px;
}

.btn-comeback {
    width: 40px;
    height: 40px;
    outline: 3px solid #57a340;
    outline-offset: 3px;
    transition: all 0.3s ease;
}

.btn-comeback:hover {
    transform: scale(1.2);
}

.v-tooltip> ::v-deep(.v-overlay__content) {
background: transparent;
color: rgb(70, 70, 70);
font-weight: bold;
}
</style>