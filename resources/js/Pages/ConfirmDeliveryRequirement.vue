<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import ConfirmDeliveryRequirementDataTable from '@/Components/ConfirmDeliveryRequirementDataTable.vue';

let props = defineProps({
    filterSubs: Object,
    stateIds: Object,
    activitySummaries: Object,
    filterSubIds: Object
});

</script>

<template>
    <AppLayout title="ConfirmDeliveryRequirement">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <ConfirmDeliveryRequirementDataTable :filterSubs="filterSubs" :stateIds="stateIds"
                :activitySummaries="activitySummaries" :filterSubIds="filterSubIds" />
        </div>
    </AppLayout>
</template>