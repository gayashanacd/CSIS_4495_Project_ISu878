package com.example.greenpath.ui.waste;

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
import androidx.room.Room;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.example.greenpath.databases.GreenPathDatabase;
import com.example.greenpath.databinding.FragmentWasteBinding;
import com.example.greenpath.models.User;
import com.example.greenpath.utils.EmissionCalculator;
import com.example.greenpath.utils.VolleySingleton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class WasteFragment extends Fragment {

    private FragmentWasteBinding binding;
    GreenPathDatabase cmDB;
    User currentUser;
    private RequestQueue requestQueue;
    String mongoId, formattedDate, city;
    int householdSize;
    final String API = "http://10.0.2.2:5000/api/";
    private static final String CHARACTERS = "0123456789";
    private static final int ID_LENGTH = 5;
    private static final SecureRandom random = new SecureRandom();

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        WasteViewModel wasteViewModel =
                new ViewModelProvider(this).get(WasteViewModel.class);

        binding = FragmentWasteBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        cmDB = Room.databaseBuilder(requireContext(), GreenPathDatabase.class, "greenpath.db").build();
        requestQueue = VolleySingleton.getInstance(requireContext()).getRequestQueue();

        SharedPreferences settings =  requireActivity().getSharedPreferences("PREFS_CM", 0);
        String userId = settings.getString("USERID", "");
        mongoId = settings.getString("MONGOID", "");
        city = settings.getString("CITY", "");
        householdSize = settings.getInt("HOUSEHOLD_SIZE", 1);
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formattedDate = currentDate.format(formatter);
        binding.editTextDateWasteInput.setText(formattedDate);
        binding.editTextPlastic.setText("0");
        binding.editTextPaper.setText("0");
        binding.editTextMetal.setText("0");
        binding.editTextOrganic.setText("0");
        binding.editTextGlass.setText("0");
        binding.editTextGeneral.setText("0");

        binding.buttonWasteSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                submitData();
            }
        });

        return root;
    }

    public static String generateID() {
        StringBuilder sb = new StringBuilder(ID_LENGTH);
        for (int i = 0; i < ID_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }

    private void submitData() {
        // Endpoint URL
        String url = API + "newWasteManagementEntry";

        // Create the JSON object
        JSONObject wasteManagementData = new JSONObject();

        try {
            int wastePlastic = Integer.parseInt(binding.editTextPlastic.getText().toString());
            Log.d("wastePlastic", String.valueOf(wastePlastic));
            int wastePaper = Integer.parseInt(binding.editTextPaper.getText().toString());
            int wasteMetal = Integer.parseInt(binding.editTextMetal.getText().toString());
            int wasteOrganic = Integer.parseInt(binding.editTextOrganic.getText().toString());
            int wasteGlass = Integer.parseInt(binding.editTextGlass.getText().toString());
            int wasteGeneral = Integer.parseInt(binding.editTextGeneral.getText().toString());
            int totalWaste = wastePlastic + wastePaper + wasteMetal + wasteOrganic + wasteGlass + wasteGeneral;
            Log.d("totalWaste", String.valueOf(totalWaste));


            // Add top-level fields
            wasteManagementData.put("userId", mongoId);
            wasteManagementData.put("inputDate", formattedDate);
            wasteManagementData.put("totalWaste", totalWaste);
            wasteManagementData.put("householdSize", householdSize);
            wasteManagementData.put("city", city);

            // Add wasteData array
            JSONArray wasteDataArray = new JSONArray();
            List<EmissionCalculator.WasteData> wasteDataList = new ArrayList<>();

            if(wastePlastic > 0){
                JSONObject wasteItemPlastic = new JSONObject();
                wasteItemPlastic.put("categery", "Plastic");
                wasteItemPlastic.put("amount", wastePlastic);
                wasteItemPlastic.put("id", generateID());
                wasteDataArray.put(wasteItemPlastic);
                Log.d("wasteItemPlastic", String.valueOf(wasteItemPlastic));
                EmissionCalculator.WasteData wastePlasticObj = new EmissionCalculator.WasteData("Plastic", wastePlastic);
                wasteDataList.add(wastePlasticObj);
            }
            if(wastePaper > 0){
                JSONObject wasteItemPaper = new JSONObject();
                wasteItemPaper.put("categery", "Paper");
                wasteItemPaper.put("amount", wastePaper);
                wasteItemPaper.put("id", generateID());
                wasteDataArray.put(wasteItemPaper);
                EmissionCalculator.WasteData wastePaperObj = new EmissionCalculator.WasteData("Paper", wastePaper);
                wasteDataList.add(wastePaperObj);
            }
            if(wasteMetal > 0){
                JSONObject wasteItemMetal = new JSONObject();
                wasteItemMetal.put("categery", "Metal");
                wasteItemMetal.put("amount", wasteMetal);
                wasteItemMetal.put("id", generateID());
                wasteDataArray.put(wasteItemMetal);
                EmissionCalculator.WasteData wasteMetalObj = new EmissionCalculator.WasteData("Metal", wasteMetal);
                wasteDataList.add(wasteMetalObj);
            }
            if(wasteOrganic > 0){
                JSONObject wasteItemOrganic = new JSONObject();
                wasteItemOrganic.put("categery", "Organic");
                wasteItemOrganic.put("amount", wasteOrganic);
                wasteItemOrganic.put("id", generateID());
                wasteDataArray.put(wasteItemOrganic);
                EmissionCalculator.WasteData wasteOrganicObj = new EmissionCalculator.WasteData("Organic", wasteOrganic);
                wasteDataList.add(wasteOrganicObj);
            }
            if(wasteGlass > 0){
                JSONObject wasteItemGlass = new JSONObject();
                wasteItemGlass.put("categery", "Glass");
                wasteItemGlass.put("amount", wasteGlass);
                wasteItemGlass.put("id", generateID());
                wasteDataArray.put(wasteItemGlass);
                EmissionCalculator.WasteData wasteGlassObj = new EmissionCalculator.WasteData("Glass", wasteGlass);
                wasteDataList.add(wasteGlassObj);
            }
            if(wasteGeneral > 0){
                JSONObject wasteItemGeneral = new JSONObject();
                wasteItemGeneral.put("categery", "General");
                wasteItemGeneral.put("amount", wasteGeneral);
                wasteItemGeneral.put("id", generateID());
                wasteDataArray.put(wasteItemGeneral);
                EmissionCalculator.WasteData wasteGeneralObj = new EmissionCalculator.WasteData("General", wasteGeneral);
                wasteDataList.add(wasteGeneralObj);
            }

            Log.d("wasteData", String.valueOf(wasteDataArray));
            wasteManagementData.put("wasteData", wasteDataArray);

            EmissionCalculator calculator = new EmissionCalculator(householdSize);
            double wasteEmission = calculator.calculateWasteEmission(wasteDataList);
            wasteManagementData.put("carbonEmissionsWaste", wasteEmission);

        } catch (JSONException e) {
            e.printStackTrace();
            return;
        }

        // Create the POST request
        StringRequest stringRequest = new StringRequest(
                Request.Method.POST,
                url,
                response -> {
                    // Handle success response
                    Toast.makeText(requireActivity(), "Data submitted successfully", Toast.LENGTH_SHORT).show();
                },
                error -> {
                    // Handle error response
                    Toast.makeText(requireActivity(), "Error submitting data: " + error.getMessage(), Toast.LENGTH_SHORT).show();
                }
        ) {
            @Override
            public byte[] getBody() throws AuthFailureError {
                return wasteManagementData.toString().getBytes(StandardCharsets.UTF_8);
            }

            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }
        };

        // Add the request to the RequestQueue
        requestQueue.add(stringRequest);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}