<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ data.name }}</td>
    <td style="text-align: center">
      <img :src="data.companyLogo" alt="" class="img-list" />
    </td>
    <td>{{ data.location }}</td>
    <td>{{ data.email }}</td>
    <td style="text-align: justify">{{ data.description }}</td>
  </tr>
</template>

<script>
export default {
  name: "TableCompanyRowComponent",
  props: ["data", "index"],
}
</script>

<style>

</style>