<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import SubsToDeliverDataTable from '@/Components/SubsToDeliverDataTable.vue';
import { usePage } from '@inertiajs/vue3';
const page = usePage();

let props = defineProps({
    filterSubIds: Object,
    filterSubs: Object,
    stateIds: Object,
    serviceCodes: Object, 
    users: Object,
        // activitySummaries: Object,

});

</script>

<template>
    <AppLayout title="ForUpselling">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <SubsToDeliverDataTable :filterSubs="filterSubs" :stateIds="stateIds" :activitySummaries="activitySummaries"
                :filterSubIds="filterSubIds" :serviceCodes="serviceCodes" :currentUser="page.props.auth.user" :users="users" />
        </div>
    </AppLayout>
</template>
