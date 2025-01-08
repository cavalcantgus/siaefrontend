<template>
  <vuetify-money :options="options" />
</template>

<script>

export default {
  name: "MoneyInput",
  data: () => ({
    options: {
      prefix: "R$",
      decimal: ",",
      thousands: ".",
      precision: "2",
      masked: false
    },
  }),
};
</script>
