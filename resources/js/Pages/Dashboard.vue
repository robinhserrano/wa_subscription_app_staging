<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import CustomDataTable from '@/Components/CustomDataTable.vue';

import { ref, watch } from "vue";

let props = defineProps({
  filterSubs: Object,
  paginator: Object,
  salesQuotations: Object
});

</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Subscription to Enter
            </h2>
        </template>
        <div>
        <!-- {{ filterSubs }} -->
        </div>

        <!-- <div class="py-12 px-12"> -->
            <!-- <div class="max-w-7xl mx-auto sm:px-6 lg:px-8"> -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <CustomDataTable :filterSubs="filterSubs"/>
                </div>
            <!-- </div> -->
        <!-- </div> -->
    </AppLayout>
</template>

<!-- <script setup>


// let search = ref(props.filters.search);

// watch(search, debounce(function (value) {
//   router.get('/users', { search: value }, { preserveState: true, replace: true });
// }, 300));
</script> -->
