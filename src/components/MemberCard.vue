<template>
  <div
    class="rounded-lg shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
    style="background-color: #EFEFEF;"
  >
    <div class="flex-shrink-0">
      <img
        :src="getImageUrl(member.path_image, member.nickname || member.name)"
        :alt="member.nickname"
        class="w-20 h-20 rounded-full object-cover border border-gray-200"
      />
    </div>

    <div class="flex-1">
      <h3 class="text-base font-semibold text-gray-800 mb-2">
        {{ member.nickname || member.name }}
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
        <span 
          v-if="member.function_label" class="px-3 py-1 text-xs font-medium rounded-full" style="background-color: rgba(0, 122, 184, 0.15); color: #007AB8;">
          {{ member.function_label }}
        </span>
      </div>
    </div>

    <div class="flex-shrink-0">
      <img
        v-if="member.category_party?.logo"
        :src="getImageUrl(member.category_party.logo)"
        :alt="`Logo ${member.category_party?.name_party}`"
        class="h-12 object-contain"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  member: {
    type: Object,
    required: true
  },
  s3Host: {
    type: String,
    default: ''
  }
})

const getImageUrl = (path, name) => {
  if (!path || path === '') {
    if (!name) return ''; 
    const nomeFormatado = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${nomeFormatado}&background=E5E7EB&color=9CA3AF`;
  }

  if (path.startsWith('http')) {
    return path;
  }

  const base = props.s3Host.endsWith('/') ? props.s3Host.slice(0, -1) : props.s3Host;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${base}${cleanPath}`;
}
</script>