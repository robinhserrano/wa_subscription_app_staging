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
            <p class="mt-4 mb-2 text-xl font-bold">Activity Summary</p>
            <div v-for="category of activitySummaryTypes" :key="category.id" class="flex items-center mb-2">
                <Checkbox v-model="selectedActivitySummary" :inputId="category.name" name="category"
                    :value="category.name" />
                <label :for="category.id" class="ml-2">{{ category.name }}</label>
            </div>
        </Drawer>
        <Button v-if="selectedItems.length" class="ml-4" outlined> <p class="font-bold">
            {{ selectedItems.length }} 
        </p>selected <Button v-if="selectedItems.length < filterSubs.total" :label="`Select all ${deliverSubIds.length}`" @click="selectAll(deliverSubIds)"
        icon="pi pi-arrow-right" class="ml-4" severity="info" ></Button></Button>
        <Button v-if="selectedItems.length" :label="`Export as Excel (${selectedItems.length})`" @click="downloadCSV(selectedItems)" class="ml-4"></Button>
        <Button v-if="selectedItems.length" :label="`Mark All As Delivery Booked (${selectedItems.length})`"
            @click="markAllAsDeliveryBooked" icon="pi pi-truck" class="ml-4"></Button>
        <Paginator :rows="selectedRowCount" :totalRecords="totalRecord"
            :rowsPerPageOptions="[10, 25, 50, 100, totalRecord].sort((a, b) => a - b)" @page="handlePageChange">
            <template #start="slotProps">
                {{ filterSubs.from }}-{{ filterSubs.to }} /
                {{ filterSubs.total  }}
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
                            <!-- v-model="filters['global'].value"  -->
                            <InputText placeholder="Keyword Search" @input="handleSearch" />
                        </div>
                    </IconField>
                </div>
            </template>
            <template #empty> No filterSubs found. </template>
            <template #loading> Loading filterSubs data. Please wait. </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="root_sales_order.sales_order_no" header="Root Sales Order #" style="min-width: 10rem">
                <template #body="{ data }">
                    <div style="display: flex; align-items: center;">
    <span>
      {{ data.root_sales_order.sales_order_no }}
    </span>
    <ConfirmDialog></ConfirmDialog>
    <div  @click="handleUnlink( data.root_sales_order.sales_order_no, data.sales_order_no,data.id)" style="cursor: pointer; margin-left: 8px;">
      <font-awesome-icon :icon="['fas', 'link-slash']" :style="{ color: '#800000' }" />
    </div>
  </div>
                </template>
            </Column>
            <Column field="sales_order_no" header="Sales Order No." style="min-width: 10rem">
                <template #body="{ data }">
                    <span @click="handleCellClick(data)" class="cursor-pointer hover:underline">{{
                        data.sales_order_no }}
                    </span>
                    <div class="flex items-center">
                        <div v-if="route().current('subscriptionsToDeliverFilterSubscription')">
                            <font-awesome-icon v-if="data.hasCallOutService" :icon="['fas', 'toolbox']"
                                v-tooltip="`Filter Sub (Filter + Call Out Service)`" />
                            <font-awesome-icon v-else :icon="['fas', 'faucet']"
                                v-tooltip="`Filter Sub (Filter Only)`" />
                        </div>
                    <i v-if="data.delivered_or_delivery_booked && data.delivered_or_delivery_booked.value !== null"
                        class="pi pi-truck ml-2"></i>
                        <!-- <Avatar v-if="data.odoo_created_by_id"
                            class="ml-2"
                            style="background-color: #ffffff; color: #ffffff" 
                          v-tooltip="`Last updated by:\n${data.odoo_created_by.name}`">
                            <img :src="data.odoo_created_by.profile_photo_url" alt="User Initials" />
                        </Avatar> -->
                    </div>
                </template>
            </Column>
            <Column field="" header="Delivered or Delivery Booked" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex items-center">
                        <Select v-model="data.delivered_or_delivery_booked" :options="dropdownDeliveredOrBooked" filter
                            optionLabel="name" placeholder="Select Confirmation" class="w-full md:w-14rem"
                            @change="handleSelectChangeDeliveredOrDeliveryBooked(data)">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <div v-if="data.delivered_or_delivery_booked && data.delivered_or_delivery_booked.value !== null">
                                        {{ data.delivered_or_delivery_booked?.name || data.delivered_or_delivery_booked
                                        }} 
                                    </div>
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
                        <Avatar v-if="data.delivered_or_delivery_booked_by_id"
                            class="ml-2"
                            style="background-color: #ffffff; color: #ffffff" 
                          v-tooltip="`Last updated by:\n${data.delivered_or_delivery_booked_by.name}`">
                            <img :src="data.delivered_or_delivery_booked_by.profile_photo_url" alt="User Initials" />
                        </Avatar>
                    </div>
                </template>
            </Column>
            <Column field="" header="Service Code" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex items-center">
                        <Select v-model="data.service_code_id" :options="serviceCodeDropdownOptions" filter
                            optionLabel="name" placeholder="Select Code" class="w-full md:w-14rem"
                            @change="handleServiceCode(data)">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <div
                                        v-if="data.service_code_id.name == '- Unselect -' && data.service_code_id.value == null">
                                        {{ slotProps.placeholder }}
                                    </div>
                                    <div v-else-if="data.service_code_id && data.service_code_id.value == null">
                                        <div>{{ data.service_code.service_code }} </div>
                                        <div v-if="data.service_code.total_weight">({{
                                            data.service_code.total_weight }}kg) </div>
                                    </div>
                                    <div v-else-if="data.service_code_id.value !== null">
                                        <div> {{ data.service_code_id?.name || '' }}</div>
                                        <div v-if="data.service_code_id?.totalWeight">({{
                                            data.service_code_id?.totalWeight }}kg) </div>
                                    </div>
                                    <div v-else>{{ slotProps.placeholder }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{ slotProps.option.name }} </div>
                                    <div v-if="slotProps.option.totalWeight" class="ml-1">({{
                                        slotProps.option.totalWeight }}kg) </div>
                                </div>
                            </template>
                        </Select>
                        <Avatar v-if="data.service_code_updated_by_id"
                            class="ml-2"
                            style="background-color: #ffffff; color: #ffffff" 
                          v-tooltip="`Last updated by:\n${data.service_code_updated_by.name}`">
                            <img :src="data.service_code_updated_by.profile_photo_url" alt="User Initials" />
                        </Avatar>
                    </div>
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
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import DatePicker from 'primevue/datepicker';
import Drawer from 'primevue/drawer';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { ref, onMounted, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import * as XLSX from 'xlsx';
import axios from 'axios';
import debounce from 'lodash/debounce';
import 'primeicons/primeicons.css';

const confirm = useConfirm();
const toast = useToast()

const currentPage = ref(1);
const dates = ref([]);
const dropdownOptions = ref([]);
const filters = ref();
const loading = ref(true);
const salesQuotations = ref();
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
const serviceCodeDropdownOptions = ref([]);
const stateIds = ref([]);
const totalRecord = ref(0);
const visible = ref(false);
const visibleRight = ref(false);
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

const dropdownDeliveredOrBooked = ref([
    { name: 'Delivery Booked', value: 'Delivery Booked' },
    { name: '- Unselect -', value: null },
]);

let props = defineProps({
    filterSubs: Object,
    stateIds: Object,
    deliverSubIds: Object,
    currentUser: Object,
    users: Object,
    serviceCodes: Object,
    filters: Object,
});

onMounted(() => {
    loading.value = false;
    totalRecord.value = props.filterSubs.total
    salesQuotations.value = props.salesQuotations
    stateIds.value = props.stateIds

    serviceCodeDropdownOptions.value = props.serviceCodes.map(item => ({
        name: item.service_code,
        value: item.id,
        totalWeight: item.total_weight
    })
    );
    serviceCodeDropdownOptions.value.push({ name: '- Unselect -', value: null, totalWeight: null });
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
            const response = await axios.get('/api/findSalesOrdersBySalesOrderNo', {
                params: {
                    'sales_order_no': newSalesOrderId
                }
            });
            dropdownOptions.value = response.data.map(item => ({
                name: item.sales_order_no,
                value: item.sales_order_no,

            })
            );
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

const downloadCSV = async (selectedItems) => {
    // Define custom headers and corresponding columns
    const headers = {
        'Record Type': 'recordType',//A
        'Receiver Code': 'receiverCode',//B
        'Receiver Name': 'customer_name', //C
        'Receiver Address 1': 'street', //D
        'Receiver Address 2': 'street2', //E
        'Receiver Address 3': 'receiverAddress3',//F
        'Receiver Suburb': 'city',   //G
        'Receiver Postcode': 'zip',  //H
        'Receiver Contact': 'receiverContact',//I
        'Receiver Phone': 'phone', //J
        'Email': 'email', //K
        'Reference 1': 'sales_order_no', //L
        'Reference 2': '', //M
        'Special Instructions': '', //N
        'Service Code': 'serviceCode',
        'Number of Items': 'numberOfItems',
        'Total Weight': 'totalWeight',
        'Total Cubic Volume': 'totalCubicVolume',
        'Authority to Leave': 'authorityToLeave', //S
    };

    try {
    const response = await axios.post('/api/getDeliverySubByIds', {
                 deliverSubIds: selectedItems
    });
    if (response.status === 200) {
    // Map JSON data to include only selected columns with custom headers
    const mappedData = response.data.deliverSubs.map(item => {
        const contactAddress = Array.isArray(item.contact_address) && item.contact_address.length > 0 ? item.contact_address[0] : null;

        item.recordType = 'C'
        item.receiverCode = null
        item.street = contactAddress?.street || '', 
        item.street2 = contactAddress?.street2 || '',
        item.receiverAddress3 = null
        item.city = contactAddress?.city || ''
        item.zip = contactAddress?.zip || ''
        item.receiverContact = item.customer_name || ''
        item.reference2 = null
        item.specialInstructions = null
        item.serviceCode = item.service_code?.service_code || ''
        item.numberOfItems = item.service_code?.number_of_items || 0
        item.totalWeight = item.service_code?.total_weight || 0
        item.totalCubicVolume = item.service_code?.total_cubic_volume || 0
        item.authorityToLeave = 'Y'

        let newItem = {};
        for (const [header, key] of Object.entries(headers)) {
            newItem[header] = item[key]
        }
        return newItem;
    });

    // Convert the mapped data to a worksheet
    const ws = XLSX.utils.json_to_sheet(mappedData);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate CSV file and initiate download
    const csvOutput = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'subs_to_deliver.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    } else {
            toast.error('Error: Unable to fetch delivery subscriptions.');
    }
    } catch (error) {
         toast.error('Error: ' + (error.response?.data?.message || 'Network Error'));
    }
};

const fetchData = async () => {
    try {
        var url = route().current('subscriptionsToDeliverFilterSubscription') ? '/subscriptionsToDeliverFilterSubscription' : '/subscriptionsToDeliver'
        const response = router.get(url, {
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
                totalRecord.value = newData.props.filterSubs.total
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
    fetchData()
}

const handleSearch = (event) => {
    search.value = event.target.value;
    debouncedFetchData();  // Call the debounced function
};

const handleSelectChangeDeliveredOrDeliveryBooked = async (salesOrder) => {
    try {
        const response = await axios.put(`/api/updateDeliveredOrDeliveryBooked/${salesOrder.id}`, {
            delivered_or_delivery_booked: salesOrder.delivered_or_delivery_booked.value,
            delivered_or_delivery_booked_by_id: props.currentUser.id,
        });

        // if (salesOrder.delivered_or_delivery_booked?.value === 'Delivery Booked') {
        toast.add({ severity: 'success', summary: `Updated #${salesOrder.sales_order_no} delivered or delivery booked status`, detail: '', life: 3000 })
        // } else {
        //     toast.add({ severity: 'success', summary: `Updated #${salesOrder.sales_order_no} delivery status`, detail: '', life: 3000 })
        // }

        // if (salesOrder.delivered_or_delivery_booked?.value === 'Confirm') {
        //     // toast.add({ severity: 'success', summary: `Added #${salesOrder.sales_order_no} to Subscriptions to Deliver`, detail: '', life: 3000 })
        // } else {
        //     toast.add({ severity: 'info', summary: `Moved #${salesOrder.sales_order_no} back to Confirm Delivery Requirement`, detail: '', life: 3000 })
        // }

    } catch (error) {
        // Handle error
        console.error('Failed to update delivered_or_delivery_booked:', error);
        toast.add({ severity: 'error', summary: 'Failed Message', detail: 'Message Content', life: 3000 })
        // this.$toast.add({ severity: 'error', summary: 'Update Failed', detail: 'Failed to update Created on Odoo.' });
    }
}

const handleServiceCode = async (salesOrder) => {
    try {
        const response = await axios.put(`/api/updateServiceCode/${salesOrder.id}`, {
            service_code_id: salesOrder.service_code_id.value,
            service_code_updated_by_id: props.currentUser.id,
        });

        // if (salesOrder.delivered_or_delivery_booked?.value === 'Delivery Booked') {
        toast.add({ severity: 'success', summary: `Updated #${salesOrder.sales_order_no}'s service code`, detail: '', life: 3000 })
        fetchData()
        
        // } else {
        //     toast.add({ severity: 'success', summary: `Updated #${salesOrder.sales_order_no} delivery status`, detail: '', life: 3000 })
        // }

        // if (salesOrder.delivered_or_delivery_booked?.value === 'Confirm') {
        //     // toast.add({ severity: 'success', summary: `Added #${salesOrder.sales_order_no} to Subscriptions to Deliver`, detail: '', life: 3000 })
        // } else {
        //     toast.add({ severity: 'info', summary: `Moved #${salesOrder.sales_order_no} back to Confirm Delivery Requirement`, detail: '', life: 3000 })
        // }

    } catch (error) {
        // Handle error
        console.error('Failed to update delivered_or_delivery_booked:', error);
        toast.add({ severity: 'error', summary: 'Failed Message', detail: 'Message Content', life: 3000 })
        // this.$toast.add({ severity: 'error', summary: 'Update Failed', detail: 'Failed to update Created on Odoo.' });
    }
}

const handleUnlink = (rootSalesOrder, newSalesOrder, newSalesOrderId) =>   {
    confirm.require({
        message: `Do you want to unlink #${newSalesOrder} from #${rootSalesOrder}?`,
        header: 'Unlink Sales Order',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Unlink',
            severity: 'danger'
        },
        accept: async () => {
            const response = await axios.delete(`/api/deliverSub/${newSalesOrderId}`);
            fetchData()
            toast.add({ severity: 'info', summary: 'Unlinked Successfully', detail: `Unlinked #${newSalesOrder} from #${rootSalesOrder}`, life: 3000 });
        },
        reject: () => {}
    });
};

const markAllAsDeliveryBooked = async () => {
    var selectedItemIds = selectedItems.value.map(e => e.id);

    const data = JSON.stringify({
        deliverSubIds: selectedItemIds,
        delivered_or_delivery_booked_by_id: props.currentUser.id
    });
    const response = await axios.post('/api/bulkConfirmDeliveryBooked', data, {
        headers: { 'Content-Type': 'application/json' }
    });
    toast.add({ severity: 'success', summary: `Successfully confirmed ${selectedItemIds.length} filter subs`, detail: '', life: 3000 })
    fetchData()
    selectedItems.value = []
};

const selectAll = async (deliverSubIds) => {
    selectedItems.value = deliverSubIds
};
</script>
