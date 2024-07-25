<template>
  <div>
    <label v-if="label && label.length" for="search" class="input-label">{{ label }}</label>
    <div class="search-input-container">
      <input
        id="search"
        v-model="model"
        :placeholder="placeholder"
        type="text"
        :disabled="disabled"
        name="search"
        class="search-input"
        :class="{ 'has-error': error && error.length }"
        spellcheck="false"
      />
      <div v-if="pending" class="spinner-container">
        <Spinner />
      </div>
      <div v-else class="submit-icon-container">
        <slot class="submit-icon" name="submit" />
      </div>
    </div>
    <div class="error-message" v-if="error && error.length">{{ t("searchForm.errorMessage") }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import Spinner from "@/components/common/Spinner.vue";

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  pending: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});
const { t } = useI18n();
const emit = defineEmits(["update:value"]);
const model = computed({
  get: () => props.value,
  set: (value: string) => {
    emit("update:value", value.trim());
  },
});
</script>

<style scoped lang="scss">
.input-label {
  @apply block text-sm font-medium text-neutral-700;
}

.error-message {
  @apply absolute -bottom-5 text-xs text-red-500 lg:-bottom-7 lg:text-base;
}
.search-input-container {
  @apply relative;
  .search-input {
    @apply block w-full truncate rounded-md border-2 border-gray-200 py-3 pl-4 pr-16 leading-5 text-neutral-700 placeholder-neutral-400 outline-none ring-0 transition-colors duration-200 placeholder:text-sm focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm;
  }
  .has-error {
    @apply border-red-400/60 focus:border-red-500;
  }
}
.submit-icon-container {
  @apply absolute right-0 top-0 flex aspect-square h-full items-center justify-center;
}
.spinner-container {
  @apply absolute right-0 top-0 flex aspect-square h-full items-center justify-center;
}
</style>
