package com.example.greenpath.ui.water;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;
import java.time.LocalDate;
import java.time.format.TextStyle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.room.Room;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.example.greenpath.databases.GreenPathDatabase;
import com.example.greenpath.databinding.FragmentWaterBinding;
import com.example.greenpath.utils.EmissionCalculator;
import com.example.greenpath.utils.VolleySingleton;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONObject;

import java.security.SecureRandom;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class WaterFragment extends Fragment {

    private FragmentWaterBinding binding;
    GreenPathDatabase cmDB;
    private RequestQueue requestQueue;
    private static final String CHARACTERS = "0123456789";
    private static final int ID_LENGTH = 5;
    private static final SecureRandom random = new SecureRandom();
    String mongoId, formattedDate, city, dayAbbreviation;
    int householdSize;
    final String API = "http://10.0.2.2:5000/api/";

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        WaterViewModel addViewModel =
                new ViewModelProvider(this).get(WaterViewModel.class);

        binding = FragmentWaterBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        cmDB = Room.databaseBuilder(requireContext(), GreenPathDatabase.class, "calariemate.db").build();
        requestQueue = VolleySingleton.getInstance(requireContext()).getRequestQueue();

        SharedPreferences settings =  requireActivity().getSharedPreferences("PREFS_CM", 0);
        String userId = settings.getString("USERID", "");
        mongoId = settings.getString("MONGOID", "");
        city = settings.getString("CITY", "");
        householdSize = settings.getInt("HOUSEHOLD_SIZE", 1);
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formattedDate = currentDate.format(formatter);
        binding.editTextDateWaterInput.setText(formattedDate);
        dayAbbreviation = currentDate.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);

        binding.buttonWaterSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    submitData();
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            }
        });

        return root;
    }

    private void submitData() throws JsonProcessingException {
        // API endpoint
        String url = API + "newWaterUsageEntry";

        WaterUsageData waterUsageData = new WaterUsageData(
                "0",
                binding.editTextShowerUsage.getText().toString(),
                binding.spinnerDishwashMethod.getSelectedItem().toString(),
                binding.editTextDishwashUsage.getText().toString(), "Hose", "0",
                binding.editTextDrinking.getText().toString(),
                binding.editTextMisc.getText().toString(), "FrontLoad",
                binding.editTextLaundryWaterUsed.getText().toString(),
                binding.editTextLaundryCycles.getText().toString()
        );

        ObjectMapper objectMapper1 = new ObjectMapper();
        String jsonStringWater = objectMapper1.writeValueAsString(waterUsageData);
        Log.d("WATER_USAGE", jsonStringWater);

        int totalWaterUsed, totalHouseholdUsage;
        totalHouseholdUsage = Integer.parseInt(binding.editTextShowerUsage.getText().toString()) +
                Integer.parseInt(binding.editTextDishwashUsage.getText().toString()) +
                Integer.parseInt(binding.editTextDrinking.getText().toString()) +
                (Integer.parseInt(binding.editTextLaundryWaterUsed.getText().toString()) * Integer.parseInt(binding.editTextLaundryCycles.getText().toString()));
        totalWaterUsed = totalHouseholdUsage + Integer.parseInt(binding.editTextMisc.getText().toString());

        Log.d("totalWaterUsed", String.valueOf(totalWaterUsed));

        EmissionCalculator calculator = new EmissionCalculator(householdSize);
        double carbonEmiWater = calculator.calculateWaterEmission(totalHouseholdUsage, 0, Integer.parseInt(binding.editTextMisc.getText().toString()));

        WaterEmissionData waterEmissionData = new WaterEmissionData(
                mongoId,
                formattedDate,
                dayAbbreviation,
                totalWaterUsed,
                waterUsageData,
                carbonEmiWater,
                householdSize,
                city
        );

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(waterEmissionData);

        Log.d("JSON_OUT", jsonString);

        try {
            JSONObject jsonObject = new JSONObject(jsonString);

            // Create a StringRequest for plain string responses
            StringRequest stringRequest = new StringRequest(
                    Request.Method.POST,
                    url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            // Handle plain string response
                            Toast.makeText(requireActivity(), "Data submitted successfully !", Toast.LENGTH_SHORT).show();
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // Handle error response
                            Toast.makeText(requireActivity(), "Error occurred : " + error.toString(), Toast.LENGTH_SHORT).show();
                        }
                    }
            ) {
                @Override
                public byte[] getBody() {
                    return jsonObject.toString().getBytes();
                }

                @Override
                public String getBodyContentType() {
                    return "application/json; charset=utf-8";
                }
            };

            // Add the request to the RequestQueue
            requestQueue.add(stringRequest);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String generateID() {
        StringBuilder sb = new StringBuilder(ID_LENGTH);
        for (int i = 0; i < ID_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    // Data class for water usage details
    static class WaterUsageData {
        String showerDuation;
        String showerUsage;
        String dishwashingMethod;
        String dishwashingUsage;
        String gardeningMethod;
        String gardeningUsage;
        String drinkingUsage;
        String miscellaneousUsage;
        String laundryMethod;
        String laundryUsage;
        String laundryNumOfLoads;

        public WaterUsageData(String showerDuation, String showerUsage, String dishwashingMethod, String dishwashingUsage,
                              String gardeningMethod, String gardeningUsage, String drinkingUsage, String miscellaneousUsage,
                              String laundryMethod, String laundryUsage, String laundryNumOfLoads) {
            this.showerDuation = showerDuation;
            this.showerUsage = showerUsage;
            this.dishwashingMethod = dishwashingMethod;
            this.dishwashingUsage = dishwashingUsage;
            this.gardeningMethod = gardeningMethod;
            this.gardeningUsage = gardeningUsage;
            this.drinkingUsage = drinkingUsage;
            this.miscellaneousUsage = miscellaneousUsage;
            this.laundryMethod = laundryMethod;
            this.laundryUsage = laundryUsage;
            this.laundryNumOfLoads = laundryNumOfLoads;
        }

        public String getShowerDuation() {
            return showerDuation;
        }

        public void setShowerDuation(String showerDuation) {
            this.showerDuation = showerDuation;
        }

        public String getShowerUsage() {
            return showerUsage;
        }

        public void setShowerUsage(String showerUsage) {
            this.showerUsage = showerUsage;
        }

        public String getDishwashingMethod() {
            return dishwashingMethod;
        }

        public void setDishwashingMethod(String dishwashingMethod) {
            this.dishwashingMethod = dishwashingMethod;
        }

        public String getDishwashingUsage() {
            return dishwashingUsage;
        }

        public void setDishwashingUsage(String dishwashingUsage) {
            this.dishwashingUsage = dishwashingUsage;
        }

        public String getGardeningMethod() {
            return gardeningMethod;
        }

        public void setGardeningMethod(String gardeningMethod) {
            this.gardeningMethod = gardeningMethod;
        }

        public String getGardeningUsage() {
            return gardeningUsage;
        }

        public void setGardeningUsage(String gardeningUsage) {
            this.gardeningUsage = gardeningUsage;
        }

        public String getDrinkingUsage() {
            return drinkingUsage;
        }

        public void setDrinkingUsage(String drinkingUsage) {
            this.drinkingUsage = drinkingUsage;
        }

        public String getMiscellaneousUsage() {
            return miscellaneousUsage;
        }

        public void setMiscellaneousUsage(String miscellaneousUsage) {
            this.miscellaneousUsage = miscellaneousUsage;
        }

        public String getLaundryMethod() {
            return laundryMethod;
        }

        public void setLaundryMethod(String laundryMethod) {
            this.laundryMethod = laundryMethod;
        }

        public String getLaundryUsage() {
            return laundryUsage;
        }

        public void setLaundryUsage(String laundryUsage) {
            this.laundryUsage = laundryUsage;
        }

        public String getLaundryNumOfLoads() {
            return laundryNumOfLoads;
        }

        public void setLaundryNumOfLoads(String laundryNumOfLoads) {
            this.laundryNumOfLoads = laundryNumOfLoads;
        }
    }

    // Data class for main emission data
    static class WaterEmissionData  extends JSONObject{
        String userId;
        String inputDate;
        String inputDayAbr;
        int totalWaterUsage;
        WaterUsageData waterUsageData;
        double carbonEmissionsWater;
        int householdSize;
        String city;

        public WaterEmissionData(String userId, String inputDate, String inputDayAbr, int totalWaterUsage,
                                 WaterUsageData waterUsageData, double carbonEmissionsWater, int householdSize, String city) {
            this.userId = userId;
            this.inputDate = inputDate;
            this.inputDayAbr = inputDayAbr;
            this.totalWaterUsage = totalWaterUsage;
            this.waterUsageData = waterUsageData;
            this.carbonEmissionsWater = carbonEmissionsWater;
            this.householdSize = householdSize;
            this.city = city;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getInputDate() {
            return inputDate;
        }

        public void setInputDate(String inputDate) {
            this.inputDate = inputDate;
        }

        public String getInputDayAbr() {
            return inputDayAbr;
        }

        public void setInputDayAbr(String inputDayAbr) {
            this.inputDayAbr = inputDayAbr;
        }

        public int getTotalWaterUsage() {
            return totalWaterUsage;
        }

        public void setTotalWaterUsage(int totalWaterUsage) {
            this.totalWaterUsage = totalWaterUsage;
        }

        public WaterUsageData getWaterUsageData() {
            return waterUsageData;
        }

        public void setWaterUsageData(WaterUsageData waterUsageData) {
            this.waterUsageData = waterUsageData;
        }

        public double getCarbonEmissionsWater() {
            return carbonEmissionsWater;
        }

        public void setCarbonEmissionsWater(double carbonEmissionsWater) {
            this.carbonEmissionsWater = carbonEmissionsWater;
        }

        public int getHouseholdSize() {
            return householdSize;
        }

        public void setHouseholdSize(int householdSize) {
            this.householdSize = householdSize;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }
    }

}