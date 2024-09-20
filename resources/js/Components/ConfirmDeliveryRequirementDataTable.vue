<template>
    <div class="card">
        <!-- {{ selectedItems }} -->
        <div>
            <div class="m-4 my-4">
                <i v-if="dates.length" class="pi pi-calendar"></i> {{ formatDates(dates) }}
                <!-- <i class="pi pi-map-marker ml-4"></i> {{ selectedStateId }} -->
            </div>
        </div>
        <Toast />

        <Drawer v-model:visible="visible" :header="selectedSalesOrderId" class="!w-full md:!w-80 lg:!w-[30rem]">
            <!-- <p>
                {{  selectedSalesOrder}}
            </p> -->
            <p>
                <i class="pi pi-user"></i> {{ selectedSalesOrder.customer_name }}
            </p>filtersubs.wateranalytics.com.au
            <p>
                <i class="pi pi-map-marker mt-2"></i> {{ selectedSalesOrder.address }}
            </p>
            <p class="mt-6"> Order Lines:</p>
            <DataTable :value="selectedSalesOrder.order_line" dataKey="id" showGridlines class="mt-2">
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


            <!-- <p class="mb-2 text-xl font-bold">Activity Summary</p>


            <div v-for="category of activitySummaries" :key="category.id" class="flex items-center mb-2">
                <Checkbox v-model="selectedActivitySummary" :inputId="category.activity_summary"
                    name="activitySummaries" :value="category.activity_summary" />
                <label :for="category.id" class="ml-2">{{ category.activity_summary }}</label>
            </div> -->

            <!-- <div v-for="category in activitySummaries" :key="category.id" class="flex items-center mb-2">
                <RadioButton v-model="selectedActivitySummary" :inputId="category.id" name="dynamic"
                    :value="category.activity_summary" />
                <label :for="category.id" class="ml-2">{{ category.activity_summary }}</label>
            </div> -->
            <p class="mt-4 mb-2 text-xl font-bold">Date Range</p>
            <DatePicker v-model="dates" selectionMode="range" :manualInput="false" />
        </Drawer>
        <!-- 
        <Button v-if="selectedItems.length" label="Export as Excel" @click="downloadCSV" class="ml-4"></Button> -->
        <Button v-if="selectedItems.length" :label="`Confirm All (${selectedItems.length})`" @click="confirmAll"
            icon="pi pi-verified" class="ml-4"></Button>

        <Button v-if="selectedItems.length" :label="`Deny All (${selectedItems.length})`" @click="denyAll"
            icon="pi pi-times-circle" class="ml-4"></Button>

        <Paginator :rows="selectedRowCount" :totalRecords="totalRecord"
            :rowsPerPageOptions="[10, 25, 50, 100, totalRecord].sort((a, b) => a - b)" @page="handlePageChange">
            <template #start="slotProps">
                {{ filterSubs.from }}-{{ filterSubs.to - getCreatedOnOdoosNo(filterSubs.data) }} /
                {{ filterSubs.total - getCreatedOnOdoosNo(filterSubs.data) }}
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
                            <!-- v-model="filters['global'].value"  -->
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

                        <!-- {{ data.category }} -->

                    </span>
                    <font-awesome-icon v-if="data.category === 'Subscription'" icon="fa-filter-circle-dollar"
                        class="ml-2" />
                </template>
            </Column>
            <Column field="" header="Created on Odoo" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex">
                        <Select v-model="data.created_on_odoo" :options="dropdownOptions" filter optionLabel="name"
                            placeholder="Select Sales Order #" class="w-full md:w-14rem"
                            @click="handleSelectClickOdooCreatedBy(data)"
                            @change="handleSelectChangeOdooCreatedBy(data)">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">

                                    <div v-if="data.created_on_odoo && data.created_on_odoo.value !== null">
                                        {{ data.created_on_odoo?.name || data.created_on_odoo }}</div>
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

                        <Avatar v-if="data.odoo_created_by_id" :label="avatarImage(data.odoo_created_by_id, users)"
                            class="ml-2" style="background-color: #dee9fc; color: #1a2551" />
                    </div>
                </template>
            </Column>
            <Column field="" header="Require Delivery" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex">
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
            <!-- <Column v-if="route().current('confirmDeliveryRequirement')" field="customer_name" header="Customer Name"
                style="min-width: 10rem" filterField="customer_name">

            </Column> -->
            <Column field="customer_name" header="Customer Name" style="min-width: 10rem" filterField="customer_name">
                <template #body="{ data }">
                    <p v-if="data.new_sales_order.customer_name">
                        {{ data.new_sales_order.customer_name }}
                    </p>
                    <p v-else-if="data.customer_name">
                        {{ data.customer_name }}
                    </p>
                </template>
            </Column>
            <Column field="address" header="Address" style="min-width: 10rem">
                <template #body="{ data }">
                    <p v-if="data.new_sales_order.address">
                        {{ data.new_sales_order.address }}
                    </p>
                    <p v-else-if="data.address">
                        {{ data.address }}
                    </p>
                </template>
            </Column>
            <Column field="activity_summary" header="Activity Summary" style="min-width: 10rem">
                <template #body="{ data }">
                    <p v-if="data.new_sales_order.activity_summary">
                        {{ data.new_sales_order.activity_summary }}
                    </p>
                    <p v-else-if="data.activity_summary">
                        {{ data.activity_summary }}
                    </p>
                </template>
            </Column>
            <Column field="due_date" header="Due Date" style="min-width: 10rem">
                <template #body="{ data }">
                    <!-- {{ formatDate(data.due_date) }} -->

                    <p v-if="data.new_sales_order.due_date">
                        {{ formatDate(data.new_sales_order.due_date) }}
                        <!-- {{ data.new_sales_order.due_date }} -->
                    </p>
                    <p v-else-if="data.due_date">
                        {{ formatDate(data.due_date) }}
                        <!-- {{ data.due_date }} -->
                    </p>
                </template>


            </Column>
            <Column field="invoice_number" header="Invoice Number" style="min-width: 10rem">

                <template #body="{ data }">
                    <p v-if="data.new_sales_order.invoice_number">
                        {{ data.new_sales_order.invoice_number }}
                    </p>
                    <p v-else-if="data.invoice_number">
                        {{ data.invoice_number }}
                    </p>
                </template>
            </Column>
            <Column field="invoice_date" header="Invoice Date" style="min-width: 10rem">
                <template #body="{ data }">
                    <!-- {{ formatDate(data.invoice_date) }} -->

                    <p v-if="data.new_sales_order.invoice_date">
                        {{ formatDate(data.new_sales_order.invoice_date) }}
                        <!-- {{ data.new_sales_order.due_date }} -->
                    </p>
                    <p v-else-if="data.invoice_date">
                        {{ formatDate(data.invoice_date) }}
                        <!-- {{ data.due_date }} -->
                    </p>
                </template>
            </Column>
            <Column field="state_id" header="State" style="min-width: 10rem">

                <template #body="{ data }">
                    <!-- {{ formatDate(data.invoice_date) }} -->


                    <p v-if="data.new_sales_order.state_id">
                        {{ stateIds[data.new_sales_order.state_id - 1]?.name }}
                    </p>
                    <p v-else-if="data.state_id">
                        {{ stateIds[data.state_id - 1]?.name }}
                        <!-- {{ data.due_date }} -->
                    </p>
                </template>

            </Column>
            <Column field="phone" header="Phone" style="min-width: 10rem">
                <template #body="{ data }">
                    <p v-if="data.new_sales_order.phone">
                        {{ data.new_sales_order.phone }}
                    </p>
                    <p v-else-if="data.phone">
                        {{ data.phone }}
                    </p>
                </template>

            </Column>
            <Column field="email" header="Email" style="min-width: 10rem">
                <template #body="{ data }">
                    <p v-if="data.new_sales_order.email">
                        {{ data.new_sales_order.email }}
                    </p>
                    <p v-else-if="data.email">
                        {{ data.email }}
                    </p>
                </template>

            </Column>
            <Column field="payment_status" header="Payment Status" style="min-width: 10rem">
                <!-- <template #body="{ data }">
                    <Tag v-if="data.payment_status === 'paid'" severity="success" value="Paid"></Tag>
                </template> -->
                <template #body="{ data }">
                    <p v-if="data.new_sales_order.payment_status">
                        {{ data.new_sales_order.payment_status }}
                    </p>
                    <p v-else-if="data.payment_status">
                        {{ data.payment_status }}
                    </p>
                </template>

            </Column>
        </DataTable>
        <!-- 
        <nes-vue url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes" /> -->
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { CustomerService } from '@/service/CustomerService';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Tag from 'primevue/tag';
import Select from 'primevue/select';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import ProgressBar from 'primevue/progressbar';
import Slider from 'primevue/slider';
import { NesVue } from 'nes-vue';
import { router } from '@inertiajs/vue3';
import Paginator from 'primevue/paginator';
import debounce from 'lodash/debounce';
import Drawer from 'primevue/drawer';
import axios from 'axios';
import { nextTick } from 'vue';
import { useToast } from 'primevue/usetoast'
import RadioButton from 'primevue/radiobutton';
import * as XLSX from 'xlsx';
import 'primeicons/primeicons.css'
import Avatar from 'primevue/avatar';

let props = defineProps({
    filterSubs: Object,
    stateIds: Object,
    filterSubIds: Object,
    currentUser: Object,
    users: Object,
});

const selectedItems = ref([]);
const filters = ref();
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




const selectedType = ref()
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


const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const clearFilter = () => {
    initFilters();
};

const handleCellClick = (salesOrder) => {

    visible.value = true
    selectedSalesOrderId.value = salesOrder.sales_order_no
    // selectedSalesOrderLines.value = salesOrder.order_line
    // selectedCustomerName.value = salesOrder.customer_name
    // selectedCustomerAddress.value = salesOrder.address
    // selectedCustomerContactAddress.value = salesOrder.contact_address

    selectedSalesOrder.value = salesOrder;
    // Handle the click event here
    // console.log('Clicked sales order:', salesOrderNo);
    // Perform any desired actions, such as navigation or data manipulation
}

const handleSelectClickOdooCreatedBy = (salesOrder) => {
    selectedSalesOrderId.value = salesOrder.sales_order_no
    console.log('Select clicked', event);
    // Your custom logic here
}

const handleSelectChangeOdooCreatedBy = async (salesOrder) => {
    try {

        const response = await axios.put(`/api/updateCreatedOnOdooInFilterSubs/${salesOrder.id}`, {
            created_on_odoo: salesOrder.created_on_odoo.value,
            odoo_created_by_id: props.currentUser.id,
        });
        if (salesOrder.created_on_odoo?.value) {
            toast.add({ severity: 'success', summary: `Updated #${salesOrder.sales_order_no}'s created on odoo to ${salesOrder.created_on_odoo.value}`, detail: '', life: 3000 })
            fetchData()
        } else {
            toast.add({ severity: 'info', summary: `Moved #${salesOrder.sales_order_no} back to Subscription to Enter`, detail: '', life: 3000 })
        }
    } catch (error) {
        console.error('Failed to update created_on_odoo:', error);
        toast.add({ severity: 'error', summary: 'Failed to update', detail: '', life: 3000 })
    }
}


const handleSelectChangeDeliveryConfimation = async (salesOrder) => {
    try {
        const response = await axios.put(`/api/updateRequiredDeliveryInFilterSubs/${salesOrder.id}`, {
            required_delivery: salesOrder.required_delivery.value,
            required_delivery_updated_by_id: props.currentUser.id,
        });

        if (salesOrder.required_delivery?.value) {
            if (salesOrder.required_delivery?.value === 'Confirm') {
                toast.add({ severity: 'success', summary: `Added #${salesOrder.sales_order_no} to Subscriptions to Deliver`, detail: '', life: 3000 })
            } else {
                toast.add({ severity: 'success', summary: `Updated #${salesOrder.sales_order_no} required delivery to Denied`, detail: '', life: 3000 })
            }
        }
    } catch (error) {
        // Handle error
        console.error('Failed to update created_on_odoo:', error);
        toast.add({ severity: 'error', summary: 'Failed Message', detail: 'Message Content', life: 3000 })
        // this.$toast.add({ severity: 'error', summary: 'Update Failed', detail: 'Failed to update Created on Odoo.' });
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



            // console.log('TTTTTTTTTTTTTTTTTTTT')
            // console.log(response2)
            // console.log('TTTTTTTTTTTTTTTT')


            // dropdownOptions.value = response.data.map(item => ({
            //     name: item.sales_order_no,
            //     value: item.sales_order_no,

            // })
            const response2 = await axios.get('/api/findFilterSubsBySalesOrderNo', {
                params: {
                    'sales_order_no': newSalesOrderId
                }
            });


            dropdownOptions.value = response2.data.map(item => ({
                name: item,
                value: item,

            })

            );
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
        .filter(item => item.created_on_odoo !== null &&
            item.created_on_odoo?.value !== null
        );
}

const getCreatedOnOdoosNo = (data) => {
    return data.filter(
        item => item.created_on_odoo === null
            || item.created_on_odoo?.value === null || item.created_on_odoo === undefined
    ).length;
}

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
        filterSubIds: selectedItemIds,
        required_delivery_updated_by_id: props.currentUser.id
    });

    const response = await axios.post('/api/bulkConfirmFilterSubs', data, {
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
        filterSubIds: selectedItemIds,
        required_delivery_updated_by_id: props.currentUser.id
    });

    const response = await axios.post('/api/bulkDenyFilterSubs', data, {
        headers: { 'Content-Type': 'application/json' }
    });

    toast.add({ severity: 'success', summary: `Successfully denied ${selectedItemIds.length} filter subs`, detail: '', life: 3000 })
    fetchData()

    selectedItems.value = []
};

</script>
