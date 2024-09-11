<?php

namespace App\Http\Controllers;

use App\Models\ActivitySummary;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ActivitySummaryController extends Controller
{
    public function bulkActivitySummaryStore(Request $request)
    {
        $allowedActivitySummary = [
            'activity_summary',
        ];

        $activitySummaryList = $request->all();
        $newactivitySummarys = [];

        foreach ($activitySummaryList as $activitySummary) {
            $filteredactivitySummary = Arr::only($activitySummary, $allowedActivitySummary);
            $existingactivitySummary = ActivitySummary::where('activity_summary', $filteredactivitySummary['activity_summary'])->first();

            if ($existingactivitySummary) {

                $existingactivitySummary->update($filteredactivitySummary);
            } else {

                $newactivitySummarys[] = $filteredactivitySummary;
            }

            $orderLines[] = $filteredactivitySummary;
        }

        if (!empty($newactivitySummarys)) {
            ActivitySummary::insert($newactivitySummarys);
        }

        $existingactivitySummaryIds = ActivitySummary::pluck('activity_summary')->toArray();

        // Find IDs to delete
        $incomingactivitySummaryIds = array_column($activitySummaryList, 'activity_summary'); // Assuming 'id' exists in incoming data
        $idsToDelete = array_diff($existingactivitySummaryIds, $incomingactivitySummaryIds);

        // Delete activitySummarys with missing IDs
        if (!empty($idsToDelete)) {
            ActivitySummary::whereIn('activity_summary', $idsToDelete)->delete();
        }

        return response()->json([
            'message' => "Activity summaries created or updated successfully."
        ], 200); // Created
    }
}
