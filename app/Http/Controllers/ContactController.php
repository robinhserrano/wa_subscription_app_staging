<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ContactController extends Controller
{
    public function bulkContactsStore(Request $request)
    {
        $allowedContact = [
            'contact_id',
            'parent_contact_id',
            'name',
            'complete_address',
            'parent_customer_name',
            'street',
            'street2',
            'zip',
            'city'
        ];

        $contactList = $request->all();
        $newContacts = [];

        foreach ($contactList as $Contact) {
            $filteredContact = Arr::only($Contact, $allowedContact);
            $existingContact = Contact::where('contact_id', $filteredContact['contact_id'])->first();

            if ($existingContact) {

                $existingContact->update($filteredContact);
            } else {

                $newContacts[] = $filteredContact;
            }

            $orderLines[] = array_merge($filteredContact, [
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        if (!empty($newContacts)) {
            Contact::insert($newContacts);
        }

        // $existingContactIds = Contact::pluck('contact_id')->toArray();

        // Find IDs to delete
        // $incomingContactIds = array_column($contactList, 'contact_id'); // Assuming 'id' exists in incoming data
        // $idsToDelete = array_diff($existingContactIds, $incomingContactIds);

        // // Delete Contacts with missing IDs
        // if (!empty($idsToDelete)) {
        //     Contact::whereIn('contact_id', $idsToDelete)->delete();
        // }
        return response()->json([
            'message' => "Contacts created or updated successfully."
        ], 200); // Created
    }
}
