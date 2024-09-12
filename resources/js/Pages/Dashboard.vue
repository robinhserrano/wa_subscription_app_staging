<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import SubsToEnterDataTable from '@/Components/SubsToEnterDataTable.vue';

let props = defineProps({
    filterSubs: Object,
    stateIds: Object,
    activitySummaries: Object,
    filterSubIds: Object
});

</script>

<template>
    <AppLayout title="Dashboard">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <SubsToEnterDataTable :filterSubs="filterSubs" :stateIds="stateIds" :activitySummaries="activitySummaries"
                :filterSubIds="filterSubIds" />
        </div>
    </AppLayout>
</template>
