<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import ForUpsellingTable from '@/Components/ForUpsellingTable.vue';
import { usePage } from '@inertiajs/vue3';
const page = usePage();

let props = defineProps({
    filterSubs: Object,
    stateIds: Object,
    activitySummaries: Object,
    filterSubIds: Object,
});

</script>

<template>
    <AppLayout title="For Upselling">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <ForUpsellingTable :filterSubs="filterSubs" :stateIds="stateIds" :activitySummaries="activitySummaries"
                :filterSubIds="filterSubIds" :currentUser="page.props.auth.user" />
        </div>
    </AppLayout>
</template>
