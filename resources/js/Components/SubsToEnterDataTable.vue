<template>
    <div class="card">
        <div>
            <div class="m-4 my-4">
                <div v-if="dates.length">
                    <i class="pi pi-calendar"></i> {{ formatDates(dates) }}
                </div>
                <div v-if="selectedStateIds.length">
                    <i class="pi pi-map-marker"></i> {{ formatStates(selectedStateIds) }}
                </div>
            </div>
        </div>
        <Toast />
        <Drawer v-model:visible="visible" :header="selectedSalesOrderId" class="!w-full md:!w-80 lg:!w-[30rem]">
            <p>
                <i class="pi pi-user"></i> {{ selectedCustomerName }}
            </p>
            <p>
                <i class="pi pi-map-marker mt-2"></i> {{ selectedCustomerAddress }}
            </p>
            <p class="mt-6"> Order Lines:</p>
            <DataTable :value="selectedSalesOrderLines" dataKey="id" showGridlines class="mt-2">
                <Column field="product" header="Product" style="min-width: 10rem"></Column>
                <Column field="description" header="Description" style="min-width: 10rem"></Column>
                <Column field="quantity" header="Quantity" style="min-width: 5rem"></Column>
            </DataTable>
            <div>
                <p v-if="selectedSalesOrder.contact_address[0].parent">
                <p class="mt-6 mb-2"> Other Address:</p>
                <i class="pi pi-building-columns"></i> {{
                    selectedSalesOrder.contact_address[0].parent.complete_address }}
                </p>
            </div>
            <div>
                <p v-for="(child, index) in selectedSalesOrder.contact_address[0].children" :key="index">
                <p class="mt-6 mb-2"> Other Address:</p>
                <i class="pi pi-building"></i> {{ child.complete_address }}
                </p>
            </div>
        </Drawer>
        <Drawer v-model:visible="visibleRight" header="Filters" position="right" class="!w-full md:!w-80 lg:!w-[30rem]">
            <p class="mb-2 text-xl font-bold">States</p>
            <div v-for="category of stateIds" :key="category.id" class="flex items-center mb-2">
                <Checkbox v-model="selectedStateIds" :inputId="category.state_id" name="stateIds"
                    :value="category.state_id" />
                <label :for="category.id" class="ml-2">{{
                    category.name
                }}</label>
            </div>
            <p class="mt-4 mb-2 text-xl font-bold">Category</p>
            <div v-for="category of categoryTypes" :key="category.id" class="flex items-center mb-2">
                <Checkbox v-model="selectedCategories" :inputId="category.name" name="category"
                    :value="category.name" />
                <label :for="category.id" class="ml-2">{{ category.name }}</label>
            </div>
            <p class="mt-4 mb-2 text-xl font-bold">Activity Summary</p>
            <div v-for="category of activitySummaryTypes" :key="category.id" class="flex items-center mb-2">
                <Checkbox v-model="selectedActivitySummary" :inputId="category.name" name="category"
                    :value="category.name" />
                <label :for="category.id" class="ml-2">{{ category.name }}</label>
            </div>
        </Drawer>
        <Button v-if="selectedItems.length" class="ml-4" outlined> <p class="font-bold">
            {{ selectedItems.length }} 
        </p>selected <Button v-if="selectedItems.length < filterSubs.total" :label="`Select all ${filterSubIds.length}`" @click="selectAll(filterSubIds)"
        icon="pi pi-arrow-right" class="ml-4" severity="info" ></Button></Button>
        <Button v-if="selectedItems.length" :label="`Export as Excel (${selectedItems.length})`" @click="downloadCSV(selectedItems,stateIds)" class="ml-4"></Button>
        <!-- <Button v-if="selectedItems.length" label="Export as Excel" @click="downloadCSV(stateIds)" class="ml-4"></Button> -->
        <Paginator :rows="selectedRowCount" :totalRecords="totalRecord"
            :rowsPerPageOptions="[10, 25, 50, 100, totalRecord].sort((a, b) => a - b)" @page="handlePageChange">
            <template #start="slotProps">
                {{ filterSubs.from }}-{{ filterSubs.to }} /
                {{ filterSubs.total }}
            </template>
        </Paginator>
        <DataTable v-model:selection="selectedItems" :value="filterSubs.data" lazy :loading="loading" tableStyle="min-width: 50rem" showGridlines dataKey="id"
            filterDisplay="menu" v-model:filters="filters">
            <template #header>
                <div class="flex justify-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <div>
                            <Button @click="visibleRight = true" label="Filter" class="mr-4" />
                            <InputText placeholder="Keyword Search" @input="handleSearch" />
                        </div>
                    </IconField>
                </div>
            </template>
            <template #empty> No filterSubs found. </template>
            <template #loading> Loading filterSubs data. Please wait. </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="sales_order_no" header="Sales Order No." style="min-width: 10rem">
                <template #body="{ data }">
                    <span @click="handleCellClick(data)" class="cursor-pointer hover:underline">{{
                        data.sales_order_no }}
                    </span>
                 
                    <i v-if="data.delivered_or_delivery_booked && data.delivered_or_delivery_booked.value !== null"
                        class="pi pi-truck ml-2"></i>
                </template>
            </Column>
            <Column field="" header="Created on Odoo" style="min-width: 10rem">
                <template #body="{ data }">
                    <Select v-model="data.created_on_odoo" :options="dropdownOptions" filter optionLabel="name"
                        placeholder="Select Sales Order #" class="w-full md:w-14rem"
                        @click="handleSelectClickOdooCreatedBy(data)" @change="handleSelectChangeOdooCreatedBy(data)">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <div v-if="data.created_on_odoo && data.created_on_odoo.value !== null">
                                    {{ data.created_on_odoo?.name || data.created_on_odoo }} </div>
                                <div v-else>{{ slotProps.placeholder }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex align-items-center">
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Select>
                </template>
            </Column>
            <Column field="customer_name" header="Customer Name" style="min-width: 10rem" filterField="customer_name">
            </Column>
            <Column field="address" header="Delivery Address" style="min-width: 10rem"></Column>
            <Column field="activity_summary" header="Activity Summary" style="min-width: 10rem"></Column>
            <Column field="start_date" header="Start Date" style="min-width: 10rem" filterField="start_date" dataType="date">
                <template #body="{ data }">
                    {{ formatDate(data.start_date) }}
                </template>
                <template #filter="{ filterModel }">
                    <DatePicker v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />
                </template>
            </Column>
            <Column field="due_date" header="Due Date" style="min-width: 10rem" filterField="due_date" dataType="date" >
                <template #body="{ data }">
                    {{ formatDate(data.due_date) }}
                </template>

                <template #filter="{ filterModel }">
                    <DatePicker v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />
                </template>
            </Column>
            <Column field="invoice_number" header="Invoice Number" style="min-width: 10rem"></Column>
            <Column field="invoice_date" header="Invoice Date" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ formatDate(data.invoice_date) }}
                </template>
            </Column>
            <Column field="state_id" header="State" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ stateIds[data.state_id - 1]?.name }}
                </template>
            </Column>
            <Column field="phone" header="Phone" style="min-width: 10rem"></Column>
            <Column field="email" header="Email" style="min-width: 10rem"></Column>
            <Column field="payment_status" header="Payment Status" style="min-width: 10rem">
                <template #body="{ data }">
                    <Tag v-if="data.payment_status === 'paid'" severity="success" value="Paid"></Tag>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import axios from 'axios';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DatePicker from 'primevue/datepicker';
import Drawer from 'primevue/drawer';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import { onMounted, ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import debounce from 'lodash/debounce';
import * as XLSX from 'xlsx';
import 'primeicons/primeicons.css';

const currentPage = ref(1);
const dates = ref([]);
const dropdownOptions = ref([]);
const filters = ref();
const loading = ref(true);
const selectedActivitySummary = ref([]);
const selectedCategories = ref([]);
const selectedCustomerAddress = ref();
const selectedCustomerContactAddress = ref([]);
const selectedCustomerName = ref();
const selectedItems = ref([]);
const selectedRowCount = ref(100);
const selectedSalesOrder = ref();
const selectedSalesOrderId = ref();
const selectedSalesOrderLines = ref();
const selectedStateIds = ref([]);
const stateIds = ref([]);
const toast = useToast();
const totalRecord = ref(0);
const visible = ref(false);
const visibleRight = ref(false);
const salesQuotations = ref();
const search = ref();

const activitySummaryTypes = ref([{ "id": 1, "name": "Send 1st Stage Filter" },
{ "id": 2, "name": "Independent 3 + 3 Due for Change" },
{ "id": 3, "name": "Independent 3 + 3 Expires" },
{ "id": 4, "name": "3 + 3 Stage Filter" },
{ "id": 5, "name": "3 Stage Filter" },
{ "id": 6, "name": "3 + 3 Stage Filter Expires" },
{ "id": 7, "name": "3 Stage Filter Expires" },
{ "id": 8, "name": "Final Date to Order Filters for Warranty Extension" },
]);

const categoryTypes = ref([{ "id": 1, "name": "Subscription", },
]);

let props = defineProps({
    currentUser: Object,
    filterSubs: Object,
    filterSubIds: Object,
    stateIds: Object,
    filters: Object, 
});

onMounted(() => {
    loading.value = false;
    totalRecord.value = props.filterSubs.total
    salesQuotations.value = props.salesQuotations
    stateIds.value = props.stateIds
});

const initFilters = () => {
    filters.value = {
        start_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        due_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    };
};

initFilters();

watch(selectedSalesOrderId, async (newSalesOrderId) => {
    if (newSalesOrderId) {
        try {
            const response = await axios.get('/api/findFilterSubsBySalesOrderNo', {
                params: {
                    'sales_order_no': newSalesOrderId
                }
            });

            dropdownOptions.value = response.data.map(item => ({
                name: item,
                value: item,

            }));

            dropdownOptions.value.push({ name: '- Unselect -', value: null });
        } catch (error) {
            console.error('Error fetching dropdown options:', error);
        }
    }
});

watch([
    () => dates.value,
    () => selectedStateIds.value,
    () => selectedActivitySummary.value,
    () => selectedCategories.value,
    () => filters.value
], () => {
    fetchData();
});

const clearFilter = () => {
    initFilters();
};

const downloadCSV = async (selectedItems, stateIds) => {
    const headers = {
        'Invoice Number': 'invoice_number',
        'Sales Order': 'sales_order_no',
        'Customer Name': 'customer_name',
        'Invoice Date': 'invoice_date',
        'Payment Status': 'payment_status',
        'Address': 'address',
        'State': 'state_id',
        'Activity Summary': 'activity_summary',
        'Phone Number': 'phone',
        'Email': 'email',
        'Due Date': 'due_date',
        'Created on Odoo': 'created_on_odoo',
    };

    try {
        const response = await axios.post('/api/getFilterSubByIds', {
                 filterSubIds: selectedItems
    });

    if(response.status === 200){
    // Map JSON data to include only selected columns with custom headers
    const mappedData = response.data.filterSubs.map(item => {
        item.state_id = stateIds[item.state_id - 1]?.name;

        let newItem = {};
        for (const [header, key] of Object.entries(headers)) {
            newItem[header] = item[key];
        }

        return newItem;
    });

    // Group items by state
    const groupedData = mappedData.reduce((acc, item) => {
        const stateName = item['State'];
        if (!acc[stateName]) {
            acc[stateName] = [];
        }
        acc[stateName].push(item);
        return acc;
    }, {});

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Add each state as a separate sheet
    for (const [stateName, items] of Object.entries(groupedData)) {
        const ws = XLSX.utils.json_to_sheet(items);
        XLSX.utils.book_append_sheet(wb, ws, stateName);
    }

    // Generate the Excel file and initiate download
    const excelOutput = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(excelOutput)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'subs_to_enter.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }else {
            toast.add({ severity: 'error', summary: 'Unable to fetch filter subscriptions', detail: '', life: 3000 })
    }
    } catch (error) {
        toast.add({ severity: 'error', summary:'Error: ' + (error), detail: '', life: 3000 })
    }

  
};

const fetchData = async () => {
    try {
        const response = router.get('/dashboard', {
            page: currentPage.value,
            search: search.value,
            dates: dates.value,
            stateId: selectedStateIds.value,
            activitySummary: selectedActivitySummary.value,
            categories: selectedCategories.value,
            perPage: selectedRowCount.value,
            filters: JSON.stringify(filters.value), 
        }, {
            preserveState: true,
            replace: false,
            onSuccess: (newData) => {
                console.log(newData)
                console.log(newData.props.filterSubs.total)
                totalRecord.value = newData.props.filterSubs.total
                // filters.value = newData.props.filters
                const newFilters = newData.props.filters;
                if (JSON.stringify(filters.value) !== JSON.stringify(newFilters)) {
                    filters.value = newFilters;
                }
            },
        })

    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        loading.value = false
    }
}

const debouncedFetchData = debounce(fetchData, 300);

const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null);

const formatDates = (dates) => {
    if (!dates || dates.length === 0) {
        return '';
    }

    const startDate = new Date(dates[0]);
    const endDate = dates[1] ? new Date(dates[1]) : startDate; // Handle null or undefined endDate

    return `${startDate.toLocaleDateString('en-PH', { day: '2-digit', month: '2-digit', year: 'numeric' })} to ${endDate.toLocaleDateString('en-PH', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
};

const formatStates = (selectedStatesIds) => {
    return selectedStatesIds
        .map(selectedStatesId => stateIds.value[selectedStatesId - 1]?.code) // Remove undefined values
        .join(', ');
}

const handleCellClick = (salesOrder) => {
    visible.value = true
    selectedSalesOrderId.value = salesOrder.sales_order_no
    selectedSalesOrderLines.value = salesOrder.order_line
    selectedCustomerName.value = salesOrder.customer_name
    selectedCustomerAddress.value = salesOrder.address
    selectedCustomerContactAddress.value = salesOrder.contact_address
    selectedSalesOrder.value = salesOrder;
}

const handlePageChange = (event) => {
    selectedRowCount.value = event.rows
    currentPage.value = event.page + 1 // Adjusting because page index is 0-based
    console.log('page change')
    console.log(currentPage.value)
    fetchData()
}

const handleSearch = (event) => {
    search.value = event.target.value;
    console.log(event.target.value);
    debouncedFetchData();  // Call the debounced function
};

const handleSelectChangeOdooCreatedBy = async (salesOrder) => {
    try {
        if (salesOrder.created_on_odoo?.value) {
            console.log(salesOrder)

            const response = await axios.post(`/api/createDeliverSub`, {
                filter_sub_id: salesOrder.id,
                created_on_odoo: salesOrder.created_on_odoo.value,
                odoo_created_by_id: props.currentUser.id,
                due_date: salesOrder.due_date.value,
            });
            toast.add({ severity: 'success', summary: `Moved #${salesOrder.sales_order_no} to Confirm Delivery Requirement`, detail: '', life: 3000 })
        }
    } catch (error) {
        console.error('Failed to update created_on_odoo:', error);
        if (error.response.data.error) {
            toast.add({ severity: 'error', summary: error.response.data.error, detail: '', life: 3000 })
        } else {
            toast.add({ severity: 'error', summary: 'Failed to update created on odoo', detail: '', life: 3000 })
        }
    }
}

const handleSelectClickOdooCreatedBy = (salesOrder) => {
    selectedSalesOrderId.value = salesOrder.sales_order_no
}

// Helper function to convert string to ArrayBuffer
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

const selectAll = async (filterSubIds) => {
    selectedItems.value = filterSubIds
};
</script>

