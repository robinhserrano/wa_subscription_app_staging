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
            <p class="mt-4 mb-2 text-xl font-bold">Date Range</p>
            <DatePicker v-model="dates" selectionMode="range" :manualInput="false" />
        </Drawer>
        <!-- <Button v-if="selectedItems.length" label="Export as Excel" @click="downloadCSV" class="ml-4"></Button> -->
       
        <Button v-if="selectedItems.length" :label="`Confirm All (${selectedItems.length})`" @click="confirmAll"
            icon="pi pi-verified" class="ml-4"></Button>

        <Button v-if="selectedItems.length" :label="`Deny All (${selectedItems.length})`" @click="denyAll"
            icon="pi pi-times-circle" class="ml-4"></Button>
        <Paginator :rows="selectedRowCount" :totalRecords="totalRecord" :rowsPerPageOptions="[10, 25, 50, 100]"
            @page="handlePageChange">
            <template #start="slotProps">
                {{ filterSubs.from }}-{{ filterSubs.to }} /
                {{ filterSubs.total }}
            </template>
        </Paginator>
        <DataTable v-model:selection="selectedItems" :value="getFilteredData( 
            filterSubs.data)" lazy :loading="loading" tableStyle="min-width: 50rem" showGridlines dataKey="id"
            filterDisplay="menu">
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
                    <font-awesome-icon v-if="data.category === 'Subscription'" icon="fa-filter-circle-dollar"
                        class="ml-2" />
                    <i v-if="data.delivered_or_delivery_booked && data.delivered_or_delivery_booked.value !== null"
                        class="pi pi-truck ml-2"></i>
                        <Avatar v-if="data.odoo_created_by_id"
                            :label="avatarImage(data.odoo_created_by_id, users)" class="ml-2"
                            style="background-color: #dee9fc; color: #1a2551" />
                </template>
                
            </Column>
            <!-- <Column field="" header="Created on Odoo" style="min-width: 10rem">
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
            </Column> -->
            <Column v-if="route().current('confirmDeliveryRequirement')" field="" header="Require Delivery"
                style="min-width: 10rem">
                <template #body="{ data }">
                    <div style="display: flex; align-items: center;">
                    <Select v-model="data.required_delivery" :options="dropdownRequireDelivery" filter
                        optionLabel="name" placeholder="Select Confirmation" class="w-full md:w-14rem"
                        @change="handleSelectChangeDeliveryConfimation(data)">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <div v-if="data.required_delivery && data.required_delivery.value !== null">
                                    {{ data.required_delivery?.name || data.required_delivery }} </div>
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
                    <Avatar v-if="data.required_delivery_updated_by_id"
                            :label="avatarImage(data.required_delivery_updated_by_id, users)" class="ml-2"
                            style="background-color: #dee9fc; color: #1a2551" />
                        </div>
                </template>
            </Column>
            <Column field="customer_name" header="Customer Name" style="min-width: 10rem" filterField="customer_name">
            </Column>
            <Column field="address" header="Address" style="min-width: 10rem"></Column>
            <Column field="activity_summary" header="Activity Summary" style="min-width: 10rem"></Column>
            <Column field="due_date" header="Due Date" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ formatDate(data.due_date) }}
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
import { ref, onMounted, watch, useAttrs } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import Select from 'primevue/select';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import { router } from '@inertiajs/vue3';
import Paginator from 'primevue/paginator';
import debounce from 'lodash/debounce';
import Drawer from 'primevue/drawer';
import axios from 'axios';
import { useToast } from 'primevue/usetoast'
import * as XLSX from 'xlsx';
import 'primeicons/primeicons.css'

import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import Avatar from 'primevue/avatar';
const confirm = useConfirm();
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


const attrs = useAttrs()
let props = defineProps({
    currentUser: Object,
    deliverSubIds: Object,
    filterSubs: Object,
    stateIds: Object,
    users: Object, 
});

const selectedItems = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const totalRecord = ref(0);
const search = ref();
const visible = ref(false);
const visibleRight = ref(false);
const salesQuotations = ref();
const dropdownOptions = ref([]);
const toast = useToast()
const stateIds = ref([])
const selectedSalesOrderId = ref();
const selectedSalesOrderLines = ref();
const selectedCustomerName = ref();
const selectedCustomerAddress = ref();
const selectedCustomerContactAddress = ref([]);
const categoryTypes = ref([{ "id": 1, "name": "Subscription", },
    //  { "id": 2, "name": "1st Stage Filter Only", },
]);

const activitySummaryTypes = ref([{ "id": 1, "name": "Send 1st Stage Filter" },
{ "id": 2, "name": "Independent 3 + 3 Due for Change" },
{ "id": 3, "name": "Independent 3 + 3 Expires" },
{ "id": 4, "name": "3 + 3 Stage Filter" },
{ "id": 5, "name": "3 Stage Filter" },
{ "id": 6, "name": "3 + 3 Stage Filter Expires" },
{ "id": 7, "name": "3 Stage Filter Expires" },
{ "id": 8, "name": "Final Date to Order Filters for Warranty Extension" },
]);

const dropdownRequireDelivery = ref([

    { name: 'Confirm', value: 'Confirm' },
    { name: 'Deny', value: 'Deny' },
    { name: '- Unselect -', value: null },
]);
const dates = ref([]);

const selectedSalesOrder = ref();

const selectedStateIds = ref([])
const selectedActivitySummary = ref([])
const selectedCategories = ref([])
const selectedRowCount = ref(100)


onMounted(() => {
    loading.value = false;
    totalRecord.value = props.filterSubs.total
    salesQuotations.value = props.salesQuotations
    stateIds.value = props.stateIds
});

const handlePageChange = (event) => {
    // console.log('AAAAAAAAAAAAAAAAA')
    // console.log(event)
    // console.log('ZZZZZZZZZZZZZ')
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



const fetchData = async () => {
    try {
        console.log('fetch data page')
        console.log(currentPage.value)
        const response = router.get('/confirmDeliveryRequirement', {
            page: currentPage.value,
            search: search.value,
            dates: dates.value,
            stateId: selectedStateIds.value,
            activitySummary: selectedActivitySummary.value,
            categories: selectedCategories.value,
            perPage: selectedRowCount.value,
        }, {
            preserveState: true,
            replace: false,
            onSuccess: (newData) => {
                console.log(newData)
                console.log(newData.props.filterSubs.total)
                totalRecord.value = newData.props.filterSubs.total
            },
        })

    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        loading.value = false
    }
}

const debouncedFetchData = debounce(async () => {
    try {
        console.log('fetch data page');
        console.log(currentPage.value);
        const response = await router.get('/confirmDeliveryRequirement', {
            page: currentPage.value,
            search: search.value,
            dates: dates.value,
            stateId: selectedStateIds.value,
            activitySummary: selectedActivitySummary.value,
            categories: selectedCategories.value,
            perPage: selectedRowCount.value,
        }, {
            preserveState: true,
            replace: false,
            onSuccess: (newData) => {
                console.log(newData);
                console.log(newData.props.filterSubs.total);
                totalRecord.value = newData.props.filterSubs.total;
            },
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loading.value = false;
    }
}, 300);




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

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const clearFilter = () => {
    initFilters();
};

const handleCellClick = (salesOrder) => {

    visible.value = true
    selectedSalesOrderId.value = salesOrder.sales_order_no
    selectedSalesOrderLines.value = salesOrder.order_line
    selectedCustomerName.value = salesOrder.customer_name
    selectedCustomerAddress.value = salesOrder.address
    selectedCustomerContactAddress.value = salesOrder.contact_address

    selectedSalesOrder.value = salesOrder;
}


const handleSelectChangeDeliveryConfimation = async (salesOrder) => {
    try {
        console.log(salesOrder.required_delivery.value)
        const response = await axios.put(`/api/updateRequiredDeliveryInDeliverSubs/${salesOrder.id}`, {
            required_delivery: salesOrder.required_delivery.value,
            required_delivery_updated_by_id: props.currentUser.id,
        });
        // toast.add({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 })
if(salesOrder.required_delivery.value == 'Confirm'){
    toast.add({ severity: 'success', summary: `Successfully confirmed #${salesOrder.sales_order_no} for delivery`, detail: '', life: 3000 })
}else if(salesOrder.required_delivery.value == 'Deny'){
    toast.add({ severity: 'info', summary: `Successfully denied #${salesOrder.sales_order_no}`, detail: '', life: 3000 })
}else{
    toast.add({ severity: 'info', summary: `Updated #${salesOrder.sales_order_no}'s require delivery value`, detail: '', life: 3000 })
}
    } catch (error) {
        console.error('Failed to update required_delivery:', error);
        toast.add({ severity: 'error', summary: 'Failed Message', detail: 'Message Content', life: 3000 })
    }
}

watch(selectedSalesOrderId, async (newSalesOrderId) => {
    if (newSalesOrderId) {
        try {
            // dropdownOptions.value = []
            // const response = await axios.get('/api/findSalesOrdersBySalesOrderNo', {
            //     params: {
            //         'sales_order_no': newSalesOrderId
            //     }
            // });
            // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZ')
            // console.log(response)
            // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            // dropdownOptions.value = response.data.map(item => ({
            //     name: item.sales_order_no,
            //     value: item.sales_order_no,

            // })


            // );

            const response2 = await axios.get('/api/findFilterSubsBySalesOrderNo', {
                params: {
                    'sales_order_no': newSalesOrderId
                }
            });



            dropdownOptions.value = response2.data.map(item => ({
                name: item,
                value: item,

            }));

            dropdownOptions.value.push({ name: '- Unselect -', value: null });
        } catch (error) {
            console.error('Error fetching dropdown options:', error);
        }
    }
});

watch(selectedStateIds, async (newStateId) => {
    console.log('changed state, load fetch data 1')
    if (newStateId) {
        console.log('changed state, load fetch data 2')
        fetchData()
    }
});

watch(selectedActivitySummary, async (newActivitySummary) => {
    console.log('changed state, load fetch data 1')
    if (newActivitySummary) {
        console.log('changed state, load fetch data 2')
        fetchData()
    }
});

watch(dates, async (nesDates) => {
    console.log('changed date, load fetch data 1')
    if (nesDates) {
        console.log('changed date, load fetch data 2')
        fetchData()

    }
});

watch(selectedCategories, async (newCategory) => {
    console.log('changed date, load fetch data 1')
    if (newCategory) {
        console.log('changed date, load fetch data 2')
        fetchData()

    }
});




const getFilteredData = (data) => {
    return data
    // .filter(item => item.created_on_odoo === null ||
    //     item.created_on_odoo?.value === null
    // );
}

const getCreatedOnOdoosNo = (data) => {
    return data.filter(item => item.created_on_odoo !== null && item.created_on_odoo !== undefined

    ).length;
}

const downloadCSV = () => {
    // Define custom headers and corresponding columns
    const headers = {
        'Record Type': 'C',
        'Reivery Code': '',
        'Receiver Name': 'customer_name', //C
        // Receiver Address 1 //D
        // Receiver Address 2 //E
        // Receiver Address 3 //F
        // Receiver Suburb //G
        // Receiver Postcode //H
        'Receiver Contact': 'customer_name',//I
        'Receiver Phone': 'phone', //J
        'Email': 'email', //K
        'Reference 1': 'invoice_number', //L
        'Reference 2': 'invoice_date', //M
        'Payment Status': 'payment_status', //N
        //O
        //P
        //Q
        //R
        //'Authority to Leave': Y (Default) //S
    };

    // Map JSON data to include only selected columns with custom headers
    const mappedData = selectedItems.value.map(item => {
        let newItem = {};
        for (const [header, key] of Object.entries(headers)) {
            newItem[header] = item[key]
        }

        console.log(newItem)
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
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


};


const confirmAll = async () => {
    var selectedItemIds = selectedItems.value.map(e => e.id);
    console.log(selectedItemIds)

    const data = JSON.stringify({
        deliverSubIds: selectedItemIds,
        required_delivery_updated_by_id: props.currentUser.id
    });

    const response = await axios.post('/api/bulkConfirmDeliverSubs', data, {
        headers: { 'Content-Type': 'application/json' }
    });
    toast.add({ severity: 'success', summary: `Successfully confirmed ${selectedItemIds.length} filter subs`, detail: '', life: 3000 })
    fetchData()

    selectedItems.value = []
};

const denyAll = async () => {
    var selectedItemIds = selectedItems.value.map(e => e.id);
    console.log(selectedItemIds)

    const data = JSON.stringify({
        deliverSubIds: selectedItemIds,
        required_delivery_updated_by_id: props.currentUser.id
    });

    const response = await axios.post('/api/bulkDenyDeliverSubs', data, {
        headers: { 'Content-Type': 'application/json' }
    });

    toast.add({ severity: 'success', summary: `Successfully denied ${selectedItemIds.length} filter subs`, detail: '', life: 3000 })
    fetchData()

    selectedItems.value = []
};

const avatarImage = (userId, users) => {
    // Find the user with the given userId
    const user = users.find(user => user.id === userId);

    // If user is found, extract initials from their name
    if (user) {
        const initials = user.name.split(' ').map(word => word[0]).join('').toUpperCase();
        const maxInitials = 2;
        return initials.substring(0, maxInitials) || initials;
    }

    // If no user is found, return an empty string or a default value
    return '';
};
</script>
