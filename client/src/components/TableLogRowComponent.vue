<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ log.title }}</td>
    <td>{{ log.description }}</td>
    <td>{{ log.updatedBy }}</td>
    <td>{{ formatDate(log.createdAt) }}</td>
  </tr>
</template>

<script>
export default {
  name: "TableLogComponent",
  props: ["log", "index"],
  methods: {
    formatDate(isoTimestamp) {
      const dateObj = new Date(isoTimestamp);
      const formattedDate = dateObj.toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });

      return formattedDate
    }
  }
}
</script>

<style>

</style>