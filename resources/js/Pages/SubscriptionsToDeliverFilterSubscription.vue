<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import SubsToDeliverFilterSubscriptionDataTable from '@/Components/SubsToDeliverFilterSubscriptionDataTable.vue';
import { usePage } from '@inertiajs/vue3';
const page = usePage();

let props = defineProps({
    filterSubs: Object,
    filterSubIds: Object,
    stateIds: Object,
    serviceCodes: Object,
    users: Object, 
    filters: Object,
});

</script>

<template>
    <AppLayout title="SubscriptionsToDeliver">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <SubsToDeliverFilterSubscriptionDataTable :filterSubs="filterSubs" :stateIds="stateIds"
                :deliverSubIds="filterSubIds" :filters="filters" :currentUser="page.props.auth.user" :users="users" :serviceCodes="serviceCodes"/>
        </div>
    </AppLayout>
</template>
