<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import ConfirmDeliveryFilterSubscriptionDataTable from '@/Components/ConfirmDeliveryFilterSubscriptionDataTable.vue';
import { usePage } from '@inertiajs/vue3';
const page = usePage();

let props = defineProps({
    filterSubs: Object,
    filterSubIds: Object,
    stateIds: Object,
    users: Object,
});

</script>

<template>
    <AppLayout title="confirmDeliveryFilterSubscription">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <ConfirmDeliveryFilterSubscriptionDataTable :filterSubs="filterSubs" :stateIds="stateIds"
                :filterSubIds="filterSubIds" :currentUser="page.props.auth.user" :users="users" />
        </div>
    </AppLayout>
</template>