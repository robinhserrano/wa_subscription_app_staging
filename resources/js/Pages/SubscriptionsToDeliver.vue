<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import SubsToDeliverDataTable from '@/Components/SubsToDeliverDataTable.vue';
import { usePage } from '@inertiajs/vue3';
const page = usePage();

let props = defineProps({
    filterSubs: Object,
    filterSubIds: Object,
    stateIds: Object,
    serviceCodes: Object,
    users: Object, 
});

</script>

<template>
    <AppLayout title="SubscriptionsToDeliver">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <SubsToDeliverDataTable :filterSubs="filterSubs" :stateIds="stateIds"
                :deliverSubIds="filterSubIds" :currentUser="page.props.auth.user" :users="users" :serviceCodes="serviceCodes"/>
        </div>
    </AppLayout>
</template>
