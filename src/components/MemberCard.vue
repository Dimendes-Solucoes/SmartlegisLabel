<template>
  <div
    class="rounded-lg shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
    style="background-color: #EFEFEF;"
  >
    <div class="flex-shrink-0">
      <img
        :src="member.path_image ? s3Host + member.path_image : '/images/member-placeholder.jpg'"
        :alt="member.nickname"
        class="w-20 h-20 rounded-full object-cover"
      />
    </div>

    <div class="flex-1">
      <h3 class="text-base font-semibold text-gray-800 mb-2">
        {{ member.nickname }}
      </h3>
      <div class="flex items-center gap-2">
        <span
          v-if="member.pivot?.office"
          class="px-3 py-1 text-white text-xs font-medium rounded-full"
          style="background-color: #007AB8;"
        >
          {{ member.pivot.office }}
        </span>
        <span class="px-3 py-1 text-xs font-medium rounded-full" style="background-color: rgba(0, 122, 184, 0.15); color: #007AB8;">
          {{ member.category_party?.name_party || 'Partido não informado' }}
        </span>
      </div>
    </div>

    <div class="flex-shrink-0">
      <img
        v-if="member.category_party?.logo"
        :src="s3Host + member.category_party.logo"
        :alt="`Logo ${member.category_party?.name_party}`"
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
  },
  s3Host: {
    type: String,
    default: ''
  }
})
</script>
