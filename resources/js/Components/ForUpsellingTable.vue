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
        <Drawer v-model:visible="visible" :header="selectedSalesOrderNo" class="!w-full md:!w-80 lg:!w-[30rem]">
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
        <Button v-if="selectedItems.length" label="Export as Excel" @click="downloadCSV(stateIds)" class="ml-4"></Button>
        <Paginator :rows="selectedRowCount" :totalRecords="totalRecord"
            :rowsPerPageOptions="[10, 25, 50, 100, totalRecord].sort((a, b) => a - b)" @page="handlePageChange">
            <template #start="slotProps">
                {{ filterSubs.from }}-{{ filterSubs.to }} /
                {{ filterSubs.total }}
            </template>
        </Paginator>
        <Dialog v-model:visible="visibleNotesModal" modal header="Notes" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-8">
        <!-- <InputText id="email" class="flex-auto h-40" autocomplete="off" autoResize="true"  /> -->
        <Textarea v-model="selectedNote" rows="5" cols="30" @input="limitCharacters" :maxlength="255"/>
    </div>
    <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary " @click="visibleNotesModal = false"></Button>
        <Button type="button" label="Save" @click="handleSaveNotes"></Button>
    </div>
</Dialog>
        <DataTable v-model:selection="selectedItems" :value="getFilteredData(
            filterSubs.data)" lazy :loading="loading" tableStyle="min-width: 50rem" showGridlines dataKey="id"
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
                            <InputText placeholder="Keyword Search" @input="handleSearch" class="p-inputtext-lg" />
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
            <Column field="" header="Status"
                style="min-width: 10rem">
                <template #body="{ data }">
                    <div style="display: flex; align-items: center;">
                    <Select v-model="data.status" :options="dropdownUpsellStatus" filter
                        optionLabel="name" placeholder="Select Status" class="w-full md:w-14rem"
                        @change="handleSelectUpsellStatus(data)">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <div v-if="data.status && data.status.value !== null">
                                    {{ data.status?.name || data.status }} </div>
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
                            <Avatar v-if="data.status_updated_by"
                            class="ml-2"
                            style="background-color: #ffffff; color: #ffffff" 
                          v-tooltip="`Last updated by:\n${data.status_updated_by.name}`">
                            <img :src="data.status_updated_by.profile_photo_url" alt="User Initials" />
                        </Avatar>
                        </div>
                </template>
            </Column>
<Column field="" header="Notes" style="min-width: 10rem; max-width: 15rem">
  <template #body="{ data }">
    <div >
      <div v-if="data.remarks" >
        <div style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ data.remarks }}</div>
        <div class="flex items-center">
   <Button label="Edit" @click="handleUpdateNotes(data)">Edit<i class="pi pi-pencil"></i></Button>  
        <Avatar v-if="data.remarks_updated_by"
                            class="ml-2"
                            style="background-color: #ffffff; color: #ffffff" 
                     
                            v-tooltip="`Last updated by:\n${data.remarks_updated_by.name}`">
                            >
                            <img :src="data.remarks_updated_by.profile_photo_url" alt="User Initials" />
                        </Avatar>
        </div>
     
      </div>
      <div v-else>
        <Button label="Add" @click="handleUpdateNotes(data)">Add <i class="pi pi-plus"></i></Button>
      </div>
    </div>
  </template>
</Column>

            <Column field="customer_name" header="Customer Name" style="min-width: 10rem" filterField="customer_name">
            </Column>
            <Column field="address" header="Address" style="min-width: 10rem"></Column>
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
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import { computed } from 'vue';
import Avatar from 'primevue/avatar';

const attrs = useAttrs()
let props = defineProps({
    currentUser: Object,
    filterSubs: Object,
    filterSubIds: Object,
    stateIds: Object,
});

const selectedItems = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const totalRecord = ref(0);
const search = ref();
const visible = ref(false);
const visibleRight = ref(false);
const visibleNotesModal = ref(false);
const salesQuotations = ref();
const dropdownOptions = ref([]);
const toast = useToast()
const stateIds = ref([])
const selectedSalesOrderNo = ref();
const selectedSalesOrderId = ref();
const selectedSalesOrderLines = ref();
const selectedCustomerName = ref();
const selectedCustomerAddress = ref();
const selectedCustomerContactAddress = ref([]);
const categoryTypes = ref([{ "id": 1, "name": "Subscription", },
    //  { "id": 2, "name": "1st Stage Filter Only", },
]);
const selectedNote = ref('');

const activitySummaryTypes = ref([
    // { "id": 1, "name": "Send 1st Stage Filter" },
{ "id": 2, "name": "Independent 3 + 3 Due for Change" },
// { "id": 3, "name": "Independent 3 + 3 Expires" },
{ "id": 4, "name": "3 + 3 Stage Filter" },
{ "id": 5, "name": "3 Stage Filter" },
// { "id": 6, "name": "3 + 3 Stage Filter Expires" },
// { "id": 7, "name": "3 Stage Filter Expires" },
{ "id": 8, "name": "Final Date to Order Filters for Warranty Extension" },
]);

const dropdownUpsellStatus = ref([
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
    { name: 'Already Subscribed', value: 'Already Subscribed' },
    { name: 'Not Interested', value: 'Not Interested' },
    { name: '- Unselect -', value: null },
]);
const dates = ref([]);

const selectedSalesOrder = ref();

const selectedStateIds = ref([])
const selectedActivitySummary = ref([])
const selectedCategories = ref([])
const selectedRowCount = ref(100)
const filters = ref();

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

const fetchData = async () => {
    try {
        console.log('fetch data page')
        console.log(currentPage.value)
        const response = router.get('/forUpselling', {
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
        const response = await router.get('/forUpselling', {
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
    selectedSalesOrderNo.value = salesOrder.sales_order_no
    selectedSalesOrderLines.value = salesOrder.order_line
    selectedCustomerName.value = salesOrder.customer_name
    selectedCustomerAddress.value = salesOrder.address
    selectedCustomerContactAddress.value = salesOrder.contact_address

    selectedSalesOrder.value = salesOrder;
}

const handleSelectClickOdooCreatedBy = (salesOrder) => {
    selectedSalesOrderNo.value = salesOrder.sales_order_no
}

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



watch(selectedSalesOrderNo, async (newSalesOrderId) => {
    if (newSalesOrderId) {
        try {
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

watch(filters, async (newFilters) => {
    console.log('changed date, load fetch data 1')
    if (newFilters) {
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

// const downloadCSV = (stateIds) => {
//     const headers = {
//         'Invoice Number': 'invoice_number',
//         'Sales Order': 'sales_order_no',
//         'Customer Name': 'customer_name',
//         'Invoice Date': 'invoice_date',
//         'Payment Status': 'payment_status',
//         'Address': 'address',
//         'State': 'state_id',
//         'Activity Summary': 'activity_summary',
//         'Phone Number': 'phone',
//         'Email': 'email',
//         'Due Date': 'due_date',
//         'Created on Odoo': 'created_on_odoo',
//     };

//     const groupedData = {};

//     // Map JSON data to include only selected columns with custom headers
//     selectedItems.value.forEach(item => {
//         item.state_id = stateIds[item.state_id - 1]?.name;
//         const newItem = {};
//         for (const [header, key] of Object.entries(headers)) {
//             newItem[header] = item[key];
//         }

//         if (!groupedData[item.state_id]) {
//             groupedData[item.state_id] = [];
//         }
//         groupedData[item.state_id].push(newItem);
//     });

//     // Create a new workbook
//     const wb = XLSX.utils.book_new();

//     // Create a worksheet for each state and append it to the workbook
//     for (const state in groupedData) {
//         const ws = XLSX.utils.json_to_sheet(groupedData[state]);
//         XLSX.utils.book_append_sheet(wb, ws, state);
//     }

//     // Generate CSV file for the first state as an example (or modify as needed)
//     const csvOutput = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(groupedData[Object.keys(groupedData)[0]]));
//     const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'subs_to_enter.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// };

const downloadCSV2 = (stateIds) => {
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


    // Map JSON data to include only selected columns with custom headers
    const mappedData = selectedItems.value.map(item => {
        // console.log('A')
        // console.log(item['address'])
        // console.log(item['contact_address'].complete_address)
      
        console.log(item)
        console.log(item['contact_address'])
        item.state_id =   stateIds[item.state_id - 1]?.name;

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
    link.setAttribute('download', 'subs_to_enter.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const downloadCSV = (stateIds) => {
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

    // Map JSON data to include only selected columns with custom headers
    const mappedData = selectedItems.value.map(item => {
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
};

// Helper function to convert string to ArrayBuffer
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

const handleSelectUpsellStatus = async (salesOrder) => {
    try { 
        console.log(salesOrder.status.value)
        const response = await axios.put(`/api/updateUpsellStatus/${salesOrder.id}`, {
            status: salesOrder.status.value,
            status_updated_by: props.currentUser.id,
        });

    toast.add({ severity: 'info', summary: `Updated #${salesOrder.sales_order_no}'s upsell status value`, detail: '', life: 3000 })
    } catch (error) {
        console.error('Failed to update upsell status:', error);
        toast.add({ severity: 'error', summary: 'Failed Message', detail: 'Message Content', life: 3000 })
    }
}


const handleSaveNotes = async () => {
    try { 
        // console.log(salesOrder.remarks.value)
        const response = await axios.put(`/api/updateNotes/${selectedSalesOrderId.value}`, {
            remarks: selectedNote.value,
            remarks_updated_by: props.currentUser.id,
        });
        visibleNotesModal.value = false;
        fetchData()

        

    toast.add({ severity: 'info', summary: `Updated #${selectedSalesOrderNo.value}'s upsell status value`, detail: '', life: 3000 })
    } catch (error) {
        console.error('Failed to update upsell remarks:', error);
        toast.add({ severity: 'error', summary: 'Failed Message', detail: 'Message Content', life: 3000 })
    }
}

const  limitCharacters = (event)  => {
      if (event.target.value.length > 255) {
        event.target.value = event.target.value.substring(0, 255);
      }
    }

const handleUpdateNotes = async (data) => {
    try { 
        selectedSalesOrderId.value = data.id;
        selectedSalesOrderNo.value = data.sales_order_no;
        selectedNote.value = data.remarks;
        visibleNotesModal.value = true;
    } catch (error) {
        console.error('Failed to update upsell remarks:', error);
        // toast.add({ severity: 'error', summary: 'Failed Message', detail: 'Message Content', life: 3000 })
    }
}
</script>
