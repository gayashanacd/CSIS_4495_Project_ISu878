package com.example.greenpath.ui.dashboard;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.example.greenpath.databinding.FragmentDashboardBinding;
import com.example.greenpath.utils.VolleySingleton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class DashboardFragment extends Fragment {

    private FragmentDashboardBinding binding;
    SharedPreferences settings;
    double transport, energy, waste;
    String formattedDate, userId, mongoId;
    private RequestQueue requestQueue;
    JSONObject energyObj, wasteObj;
    final String API = "http://10.0.2.2:5000/api/";

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        DashboardViewModel dashboardViewModel =
                new ViewModelProvider(this).get(DashboardViewModel.class);

        binding = FragmentDashboardBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        requestQueue = VolleySingleton.getInstance(requireContext()).getRequestQueue();

        settings =  requireActivity().getSharedPreferences("PREFS_CM", 0);
        userId = settings.getString("USERID", "");
        mongoId = settings.getString("MONGOID", "");
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formattedDate = currentDate.format(formatter);
        try {
            fetchData();
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

        binding.buttonPreviousDay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                formattedDate = getPlusMinusDates("minus");
                try {
                    fetchData();
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        });

        binding.buttonNextDay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                formattedDate = getPlusMinusDates("plus");
                if(isFutureDate(formattedDate)){
                    Toast.makeText(requireActivity(), "Selected date is a future date !", Toast.LENGTH_SHORT).show();
                }
                else {
                    try {
                        fetchData();
                    } catch (JSONException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        });

        return root;
    }

    public static boolean isFutureDate(String dateString) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate givenDate = LocalDate.parse(dateString, formatter);
            LocalDate currentDate = LocalDate.now();
            return givenDate.isAfter(currentDate);
        } catch (DateTimeParseException e) {
            // Handle invalid date format
            System.err.println("Invalid date format: " + dateString);
            return false;
        }
    }

    private void fetchData() throws JSONException {
        waste = 0;
        transport = 0;
        energy = 0;
        setData();

        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.execute(new Runnable() {
            @Override
            public void run() {
                getEnergyData();
                getWasteData();
            }
        });
    }

    private void getEnergyData() {
        String url = API + "getUserEnergyEntryForDay?userId=" + mongoId + "&inputDate=" + formattedDate;

        // Use JsonArrayRequest instead of JsonObjectRequest
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET,
                url,
                null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {

                        if (response.length() == 0) {
                            Log.d("DATA_CAME_EMPTY", "Empty response received");
                        } else {
                            // Handle the response
                            try {
                                for (int i = 0; i < response.length(); i++) {
                                    // Get the current JSON object
                                    energyObj = response.getJSONObject(i);

                                    if(energyObj != null){
                                        transport = energyObj.getDouble("transportEmissions");
                                        energy = energyObj.getDouble("carbonEmissionsEnergy");
                                        transport = Math.round(transport * 100.0) / 100.0;
                                        energy = Math.round(energy * 100.0) / 100.0;
                                    }

//                                    Log.d("transport", String.valueOf(transport));
//                                    Log.d("energy", String.valueOf(energy));

                                    // Access the transportData array
                                    // JSONArray transportData = energyObj.getJSONArray("transportData");

                                    // Loop through transportData array
//                                    for (int j = 0; j < transportData.length(); j++) {
//                                        JSONObject transportItem = transportData.getJSONObject(j);
//
//                                        // Extract specific fields
//                                        String mode = transportItem.getString("mode");
//                                        int distance = transportItem.getInt("distance");
//                                        double fuelEfficiency = transportItem.getDouble("fuelEfficiency");
//                                    }
                                }
                                setData();
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // Handle the error
                        Toast.makeText(requireContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                        Log.d("API_ERROR", error.getMessage());
                    }
                }
        );

        // Add the request to the RequestQueue.
        requestQueue.add(jsonArrayRequest);
    }

    private void getWasteData() {
        String url = API + "getUserWasteEntryForDay?userId=" + mongoId + "&inputDate=" + formattedDate;

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET,
                url,
                null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {

                        if (response.length() == 0) {
                            Log.d("DATA_CAME_EMPTY", "Empty response received");
                        } else {
                            // Handle the response
                            try {
                                for (int i = 0; i < response.length(); i++) {
                                    // Get the current JSON object
                                    wasteObj = response.getJSONObject(i);

                                    if(wasteObj != null){
                                        waste = wasteObj.getDouble("carbonEmissionsWaste");
                                        waste = Math.round(waste * 100.0) / 100.0;
                                    }
                                }
                                setData();
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // Handle the error
                        Toast.makeText(requireContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                        Log.d("API_ERROR", error.getMessage());
                    }
                }
        );

        // Add the request to the RequestQueue.
        requestQueue.add(jsonArrayRequest);
    }


    private String getPlusMinusDates(String position){
        // Parse the date string to LocalDate
        LocalDate date = LocalDate.parse(formattedDate);

        LocalDate plusOneDay = date.plusDays(1);
        LocalDate minusOneDay = date.minusDays(1);

        // Format the dates back to strings
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String plusOneDayString = plusOneDay.format(formatter);
        String minusOneDayString = minusOneDay.format(formatter);

        if(position.equals("plus")){
            return plusOneDayString;
        }
        else {
            return minusOneDayString;
        }
    }

    private void setData() throws JSONException {

        // set current date
        binding.textViewDateSelector.setText(formattedDate);

        // set dashboard data
        Double total = transport + energy + waste;
        if(energyObj != null){
            binding.textViewValTotalCarbon.setText(String.valueOf(total));
            binding.textViewValTransportEmission.setText(String.valueOf(transport));
            binding.textViewValEnergyEmission.setText(String.valueOf(energy));
            binding.textViewValWasteEmission.setText(String.valueOf(waste));
        }
    }

    public static String get2MonthDate() {
        LocalDate currentDate = LocalDate.now();
        LocalDate futureDate = currentDate.plusMonths(2);
        String month = futureDate.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
        int day = futureDate.getDayOfMonth();
        return month + " " + day;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}