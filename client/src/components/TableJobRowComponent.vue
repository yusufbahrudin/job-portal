<template>
  <tr :key="job.id">
    <td style="text-align: center">{{ index + 1 }}</td>
    <td>{{ job.title }}</td>
    <td style="text-align: center">
      <img :src="job.imgUrl" alt="" class="img-list" />
    </td>
    <td style="text-align: justify; width: 45%">{{ job.description }}</td>
    <td>{{ job.jobType }}</td>
    <td style="text-align: center">
      <select
        v-model="job.status"
        @change="setStatus({ id: job.id, status: job.status })"
        style="text-align: center"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Archived">Archived</option>
      </select>
    </td>
    <td>
      <div class="icon-edit">
        <button
          v-if="role === 'admin'"
          @click="getJobById(job.id)"
          class="material-symbols-outlined"
          style="border: 0px; background: transparent"
        >
          edit
        </button>
        <button
          v-else-if="role === 'staff' && userid === `${job.authorId}`"
          @click="getJobById(job.id)"
          class="material-symbols-outlined"
          style="border: 0px; background: transparent"
        >
          edit
        </button>
        <button
          v-else
          class="material-symbols-outlined"
          style="border: 0px; background: transparent"
        >
          cancel
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableJobRowComponent",
  props: ["job", "index"],
  methods: {
    setStatus(status) {
      this.$emit("setStatus", status);
    },

    getJobById(id) {
      this.$emit("getJobById", id);
    },
  },

  data() {
    return {
      role: localStorage.role,
      userid: localStorage.userid,
    };
  },

  updated() {},
};
</script>

<style></style>
