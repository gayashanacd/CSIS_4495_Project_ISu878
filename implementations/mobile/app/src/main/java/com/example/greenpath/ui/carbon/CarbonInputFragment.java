package com.example.greenpath.ui.carbon;

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

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.example.greenpath.databases.GreenPathDatabase;
import com.example.greenpath.databinding.FragmentCarbonBinding;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.example.greenpath.utils.Config;
import com.example.greenpath.utils.EmissionCalculator;
import com.example.greenpath.utils.VolleySingleton;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONException;
import org.json.JSONObject;

public class CarbonInputFragment extends Fragment {

    private FragmentCarbonBinding binding;
    GreenPathDatabase cmDB;
    private RequestQueue requestQueue;
    String mongoId, formattedDate, city;
    int householdSize;
    final String API = Config.API_URL;
    private static final String CHARACTERS = "0123456789";
    private static final int ID_LENGTH = 5;
    private static final SecureRandom random = new SecureRandom();

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        CarbonInputViewModel homeViewModel =
                new ViewModelProvider(this).get(CarbonInputViewModel.class);

        binding = FragmentCarbonBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        cmDB = Room.databaseBuilder(requireContext(), GreenPathDatabase.class, "calariemate.db").build();
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        requestQueue = VolleySingleton.getInstance(requireContext()).getRequestQueue();

        SharedPreferences settings =  requireActivity().getSharedPreferences("PREFS_CM", 0);
        String userId = settings.getString("USERID", "");
        mongoId = settings.getString("MONGOID", "");
        city = settings.getString("CITY", "");
        householdSize = settings.getInt("HOUSEHOLD_SIZE", 1);
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formattedDate = currentDate.format(formatter);
        binding.editTextDateCarbonInput.setText(formattedDate);

        binding.buttonCarbonSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    formatData();
                } catch (JsonProcessingException | JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        });

        executorService.execute(new Runnable() {
            @Override
            public void run() {

            }
        });

        return root;
    }

    private void submitData(String jsonString) throws JSONException {
        String url = API + "newCarbonFootprintEntry";

        try {
            // Convert JSON string to JSONObject
            JSONObject emissionData = new JSONObject(jsonString);

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
                    return emissionData.toString().getBytes();
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

    private void formatData() throws JsonProcessingException, JSONException {
        // Create Transport Data
        TransportData transportData = new TransportData(
                binding.spinnerTransportMode.getSelectedItem().toString(),
                Double.parseDouble(binding.editTextDistance.getText().toString()) , 0,
                generateID());

        // Create Home Data
        HomeData homeData = new HomeData(
                Double.parseDouble(binding.editTextElecUsage.getText().toString()),
                binding.spinnerEnergySource.getSelectedItem().toString(),
                Double.parseDouble(binding.editTextGasUsage.getText().toString()));

        EmissionCalculator calculator = new EmissionCalculator(householdSize);
        EmissionCalculator.TransportData transport = new EmissionCalculator.TransportData(
                binding.spinnerTransportMode.getSelectedItem().toString(),
                Double.parseDouble(binding.editTextDistance.getText().toString()));
        double transportEmission = calculator.calculateTransportEmission(Arrays.asList(transport));

        EmissionCalculator.HomeData homeDataEmi = new EmissionCalculator.HomeData(
                Double.parseDouble(binding.editTextElecUsage.getText().toString()),
                binding.spinnerEnergySource.getSelectedItem().toString(),
                Double.parseDouble(binding.editTextGasUsage.getText().toString()));
        double homeEnergyEmission = calculator.calculateHomeEnergyEmission(homeDataEmi);

        // Create Main Data Object
        EmissionData emissionData = new EmissionData(
                mongoId,
                formattedDate,
                List.of(transportData), // List of transport data
                homeData,
                Math.round((transportEmission + homeEnergyEmission) * 100.0) / 100.0,
                transportEmission,
                homeEnergyEmission,
                householdSize,
                city
        );

        // Convert to JSON using Jackson
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(emissionData);
        Log.d("JSON_OUT", jsonString);
        submitData(jsonString);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    static class TransportData {
        private String mode;
        private double distance;
        private double fuelEfficiency;
        private String id;

        // Constructor
        public TransportData(String mode, double distance, double fuelEfficiency, String id) {
            this.mode = mode;
            this.distance = distance;
            this.fuelEfficiency = fuelEfficiency;
            this.id = id;
        }

        // Getters and Setters (Optional, depending on usage)
        public String getMode() {
            return mode;
        }

        public void setMode(String mode) {
            this.mode = mode;
        }

        public double getDistance() {
            return distance;
        }

        public void setDistance(double distance) {
            this.distance = distance;
        }

        public double getFuelEfficiency() {
            return fuelEfficiency;
        }

        public void setFuelEfficiency(double fuelEfficiency) {
            this.fuelEfficiency = fuelEfficiency;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }
    }

    static class HomeData {
        private double electricityUsage;
        private String enerySource;
        private double gasUsage;

        // Constructor
        public HomeData(double electricityUsage, String enerySource, double gasUsage) {
            this.electricityUsage = electricityUsage;
            this.enerySource = enerySource;
            this.gasUsage = gasUsage;
        }

        // Getters and Setters (Optional, depending on usage)
        public double getElectricityUsage() {
            return electricityUsage;
        }

        public void setElectricityUsage(double electricityUsage) {
            this.electricityUsage = electricityUsage;
        }

        public String getEnerySource() {
            return enerySource;
        }

        public void setEnerySource(String enerySource) {
            this.enerySource = enerySource;
        }

        public double getGasUsage() {
            return gasUsage;
        }

        public void setGasUsage(double gasUsage) {
            this.gasUsage = gasUsage;
        }
    }

    static class EmissionData extends JSONObject {
        private String userId;
        private String inputDate;
        private List<TransportData> transportData;
        private HomeData homeData;
        private double carbonEmissionsEnergy;
        private double transportEmissions;
        private double homeEnergyEmissions;
        private int householdSize;
        private String city;

        // Constructor
        public EmissionData(String userId, String inputDate, List<TransportData> transportData, HomeData homeData,
                            double carbonEmissionsEnergy, double transportEmissions, double homeEnergyEmissions,
                            int householdSize, String city) {
            this.userId = userId;
            this.inputDate = inputDate;
            this.transportData = transportData;
            this.homeData = homeData;
            this.carbonEmissionsEnergy = carbonEmissionsEnergy;
            this.transportEmissions = transportEmissions;
            this.homeEnergyEmissions = homeEnergyEmissions;
            this.householdSize = householdSize;
            this.city = city;
        }

        // Getters and Setters (Optional, depending on usage)
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

        public List<TransportData> getTransportData() {
            return transportData;
        }

        public void setTransportData(List<TransportData> transportData) {
            this.transportData = transportData;
        }

        public HomeData getHomeData() {
            return homeData;
        }

        public void setHomeData(HomeData homeData) {
            this.homeData = homeData;
        }

        public double getCarbonEmissionsEnergy() {
            return carbonEmissionsEnergy;
        }

        public void setCarbonEmissionsEnergy(double carbonEmissionsEnergy) {
            this.carbonEmissionsEnergy = carbonEmissionsEnergy;
        }

        public double getTransportEmissions() {
            return transportEmissions;
        }

        public void setTransportEmissions(double transportEmissions) {
            this.transportEmissions = transportEmissions;
        }

        public double getHomeEnergyEmissions() {
            return homeEnergyEmissions;
        }

        public void setHomeEnergyEmissions(double homeEnergyEmissions) {
            this.homeEnergyEmissions = homeEnergyEmissions;
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