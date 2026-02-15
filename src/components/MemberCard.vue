<template>
  <div class="rounded-lg shadow-sm p-4 flex items-center gap-4" style="background-color: #EFEFEF;">
    <div class="flex-shrink-0">
      <img
        src='../assets/img/tiago.png'
        :alt="member.name"
        class="w-20 h-20 rounded-full object-cover"
      />
    </div>

    <div class="flex-1">
      <h3 class="text-base font-semibold text-gray-800 mb-2">
        {{ member.name }}
      </h3>
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 text-white text-xs font-medium rounded-full" style="background-color: #007AB8;">
          {{ member.position }}
        </span>
        <span class="px-3 py-1 text-xs font-medium rounded-full" style="background-color: rgba(0, 122, 184, 0.15); color: #007AB8;">
          {{ member.party }}
        </span>
      </div>
    </div>

    <div class="flex-shrink-0">
      <img
        src='../assets/img/mdb.png'
        :alt="`Logo ${member.party}`"
        class="h-12 object-contain"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  member: {
    type: Object,
    required: true
  }
})
</script>
