<template>
  <th scope="col" class="table-head-col">
    <slot></slot>
  </th>
</template>

<script setup lang="ts"></script>

<style>
.table-head-col {
  @apply whitespace-nowrap bg-primary-800 px-2 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-100 first:pl-6 last:pr-6;
}
</style>
