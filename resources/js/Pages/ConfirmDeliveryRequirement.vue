<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import ConfirmDeliveryRequirementDataTable from '@/Components/ConfirmDeliveryRequirementDataTable.vue';
import { usePage } from '@inertiajs/vue3';
const page = usePage();

let props = defineProps({
    filterSubs: Object,
    stateIds: Object,
    activitySummaries: Object,
    filterSubIds: Object,
    users: Object,

});

</script>

<template>
    <AppLayout title="ConfirmDeliveryRequirement">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <ConfirmDeliveryRequirementDataTable :filterSubs="filterSubs" :stateIds="stateIds"
                :activitySummaries="activitySummaries" :filterSubIds="filterSubIds" :currentUser="page.props.auth.user"
                :users="users" />
        </div>
    </AppLayout>
</template>