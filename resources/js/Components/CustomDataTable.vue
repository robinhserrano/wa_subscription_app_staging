<template>

    <div class="card">
        <Toast />

        <!-- {{ countries }}
        ----------------------------------------------------------------------------------------
        {{ dropdownOptions }} -->
        <!-- {{ salesQuotations }} -->
        <Drawer v-model:visible="visible" :header="selectedSalesOrderId" class="!w-full md:!w-80 lg:!w-[30rem]">
            <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.</p> -->
            <p>
                {{ selectedCustomerName }}
            </p>
            <p>
                {{ selectedCustomerAddress }}
            </p>
            <DataTable :value="selectedSalesOrderLines" dataKey="id" showGridlines class="mt-4">

                <Column field="product" header="Product" style="min-width: 10rem"></Column>
                <Column field="description" header="Description" style="min-width: 10rem"></Column>
                <Column field="quantity" header="Quantity" style="min-width: 5rem"></Column>

            </DataTable>

        </Drawer>
        <Drawer v-model:visible="visibleRight" header="Filters" position="right" 
        
         class="!w-full md:!w-80 lg:!w-[30rem]">
            <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.</p> -->
            <p>
                {{ selectedCustomerName }}
            </p>
            <p>
                {{ selectedCustomerAddress }}
            </p>
            <DataTable :value="selectedSalesOrderLines" dataKey="id" showGridlines class="mt-4">

                <Column field="product" header="Product" style="min-width: 10rem"></Column>
                <Column field="description" header="Description" style="min-width: 10rem"></Column>
                <Column field="quantity" header="Quantity" style="min-width: 5rem"></Column>

            </DataTable>

        </Drawer>
        <button @click="downloadCSV">Download CSV</button>
        <Button icon="pi pi-arrow-up" @click="visibleRight = true" />
        <!-- {{ selectedItems }} -->
        <!-- <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator> -->
        <DataTable v-model:selection="selectedItems" v-model:filters="filters" :value="filterSubs.data" lazy
            :loading="loading" tableStyle="min-width: 50rem" showGridlines dataKey="id" filterDisplay="menu"
            :globalFilterFields="['customer_name', 'country.name', 'representative.name', 'balance', 'status']"
            :paginator="true" :rows="100" :totalRecords="totalRecord" :rowsPerPageOptions="[10, 25, 50, 100]"
            @page="handlePageChange">
            <template #header>
                <div class="flex justify-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search"
                            @input="handleSearch" />
                    </IconField>
                </div>
            </template>
            <template #empty> No filterSubs found. </template>
            <template #loading> Loading filterSubs data. Please wait. </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="sales_order_no" header="Sales Order No." style="min-width: 10rem">
                <template #body="{ data }">
                    <span @click="handleCellClick(data)" class="cursor-pointer hover:underline">{{
                        data.sales_order_no }}</span>
                </template>
            </Column>
            <Column field="" header="Created on Odoo" style="min-width: 10rem">
                <template #body="{ data }">
                    <Select v-model="data.created_on_odoo" :options="dropdownOptions" filter optionLabel="name"
                        placeholder="Select Sales Order #" class="w-full md:w-14rem" @click="handleSelectClick(data)"
                        @change="handleSelectChange(data)">
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
                                <!-- <img :alt="slotProps.option.label"
                                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                    :class="`mr-2 flag flag-${slotProps.option.value.toLowerCase()}`"
                                    style="width: 18px" /> -->
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Select>
                </template>
            </Column>
            <Column field="customer_name" header="Customer Name" style="min-width: 10rem" filterField="customer_name">
            </Column>
            <Column field="address" header="Address" style="min-width: 10rem"></Column>
            <Column field="activity_summary" header="Activity Summary" style="min-width: 10rem"></Column>
            <Column field="due_date" header="Due Date" style="min-width: 10rem" filterField="due_date" dataType="date">
                <template #body="{ data }">
                    {{ formatDate(data.due_date) }}
                </template>
                <template #filter="{ filterModel }">
                    <DatePicker v-model="filterModel.value" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd" />
                </template>

            </Column>
            <Column field="invoice_number" header="Invoice Number" style="min-width: 10rem"></Column>
            <Column field="invoice_date" header="Invoice Date" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ formatDate(data.invoice_date) }}
                </template>
            </Column>
            <Column field="state_id" header="State" style="min-width: 10rem"></Column>
            <Column field="phone" header="Phone" style="min-width: 10rem"></Column>
            <Column field="email" header="Email" style="min-width: 10rem"></Column>
            <Column field="payment_status" header="Payment Status" style="min-width: 10rem"></Column>
        </DataTable>

        <nes-vue url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes" />
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
import * as XLSX from 'xlsx';

let props = defineProps({
    filterSubs: Object,
    salesQuotations: Object
});

const products = ref();
const selectedItems = ref();
// const filterSubs = ref();
const filters = ref();
// const paginator = ref();
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const loading = ref(true);
const currentPage = ref(0);
const totalRecord = ref(0);
const search = ref();
const visible = ref(false);
const visibleRight = ref(false);

const selectedSalesOrderId = ref();
const selectedSalesOrderLines = ref();
const selectedCustomerName = ref();
const selectedCustomerAddress = ref();

const selectedCountry = ref();


const salesQuotations = ref();
const dropdownOptions = ref([]);
const toast = useToast()

onMounted(() => {
    // filterSubs.value = filterSubs
    loading.value = false;
    totalRecord.value = props.filterSubs.total
    salesQuotations.value = props.salesQuotations
    //filterSubs.total;
    // CustomerService.getCustomersLarge().then((data) => {
    //     filterSubs.value = getCustomers(data);
    //     loading.value = false;
    // });
    // paginator.value = {
    //     // rows: 10, // Number of rows per page
    //     // page: 1,  // Current page
    //     // rowsPerPageOptions: [10, 25, 50],  // Options for rows per page
    //     // totalRecords: 120
    // }

});


const initFilters = () => {

    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // customer_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // representative: { value: null, matchMode: FilterMatchMode.IN },
        // invoice_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        // balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        // status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        // activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
        // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        due_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    };
};

initFilters();


// const handClick = (event) => {
//     currentPage.value = event.page + 1 // Adjusting because page index is 0-based
//     fetchData(event)
// }

const handlePageChange = (event) => {
    currentPage.value = event.page + 1 // Adjusting because page index is 0-based
    fetchData(event)
}

const handleSearch = (event) => {
    // console.log(event)
    search.value = event.target.value
    console.log(event.target.value)
    debounce(fetchData(event), 300);
};



const fetchData = async (event) => {
    // loading.value = true
    var page = (parseInt(event.page + 1, 10) || 1)
    // var search = event.target.value

    try {
        const response = await router.get('/dashboard', {
            page: page,
            search: search.value,
            filters: filters.value
            // filters: filters.value,
            // Add other parameters if needed
        }, {
            // only: ['dashboard'],
            preserveState: true,
            replace: false,
            onSuccess: (page) => {
                console.log(page)
                // filterSubs.value.data = page.props.filterSubs.data
                console.log(page.props.filterSubs.total)
                totalRecord.value = page.props.filterSubs.total
                // Make sure to handle total records if paginated
            },
        })

    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        loading.value = false
    }
}


// const formatDate = (value) => {
//     return value.toLocaleDateString('en-US', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric'
//     });
// };


const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null);
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
    // Handle the click event here
    // console.log('Clicked sales order:', salesOrderNo);
    // Perform any desired actions, such as navigation or data manipulation
}

const handleSelectClick = (salesOrder) => {
    selectedSalesOrderId.value = salesOrder.sales_order_no
    console.log('Select clicked', event);
    // Your custom logic here
}

const handleSelectChange = async (salesOrder) => {
    try {
        const response = await axios.put(`/api/updateCreatedOnOdooInFilterSubs/${salesOrder.id}`, {
            created_on_odoo: salesOrder.created_on_odoo.value,
        });
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZ')
        console.log(response)
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')


        console.log('handle select change')
        toast.add({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 })
    } catch (error) {
        // Handle error
        console.error('Failed to update created_on_odoo:', error);
        toast.add({ severity: 'success', summary: 'Failed Message', detail: 'Message Content', life: 3000 })
        // this.$toast.add({ severity: 'error', summary: 'Update Failed', detail: 'Failed to update Created on Odoo.' });
    }
}




const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
        d.date = new Date(d.date);

        return d;
    });
};
const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warn';

        case 'renewal':
            return null;
    }
};


watch(selectedSalesOrderId, async (newSalesOrderId) => {
    if (newSalesOrderId) {
        try {
            // dropdownOptions.value = []
            const response = await axios.get('/api/findSalesOrdersBySalesOrderNo', {
                params: {
                    'sales_order_no': newSalesOrderId
                }
            });
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZ')
            console.log(response)
            console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
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

// const downloadCSV = ()=> {
//     //   const jsonData = [
//     //     {
//     //       id: 1539,
//     //       created_at: "2024-09-04T06:13:38.000000Z",
//     //       updated_at: "2024-09-04T06:15:46.000000Z",
//     //       invoice_number: "INV/2023/00133",
//     //       sales_order_no: "S00197",
//     //       customer_name: "Mark Philip Barnard",
//     //       invoice_date: "2023-08-31 00:00:00",
//     //       payment_status: "paid",
//     //       address: "Unit 1\n16 Crestview Cres.\nKalamunda WA 6076\nAustralia",
//     //       state_id: "8",
//     //       activity_summary: "3 + 3 Stage Filter Expires",
//     //       phone: "+61 407 616 694",
//     //       email: "markphilipbarnard@gmail.com",
//     //       due_date: "2025-09-16 00:00:00",
//     //       created_on_odoo: null,
//     //       last_updated_by: null,
//     //     },
//     //     // Add more data if needed
//     //   ];

//       // Convert JSON data to a worksheet
//       const ws = XLSX.utils.json_to_sheet(selectedItems.value);

//       // Create a new workbook and append the worksheet
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//       // Generate CSV file and initiate download
//       const csvOutput = XLSX.utils.sheet_to_csv(ws);
//       const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
//       const url = URL.createObjectURL(blob);

//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'data.csv');
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     };


const downloadCSV = () => {
    // Define custom headers and corresponding columns
    const headers = {
        //Record Type: C (Default) //A
        //Receiver Code: //B
        'Receiver Name': 'customer_name', //C
       //Receiver Address 1 //D
       //Receiver Address 2 //E
       //Receiver Address 3 //F
       //Receiver Suburb //G
       //Receiver Postcode //H
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
            newItem[header] = item[key];
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
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};



</script>
