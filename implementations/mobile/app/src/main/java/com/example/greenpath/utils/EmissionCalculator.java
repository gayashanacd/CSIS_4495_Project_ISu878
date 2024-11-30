package com.example.greenpath.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EmissionCalculator {

    // Constants for emission factors
    private static final Map<String, Double> WASTE_EMISSION_FACTORS = new HashMap<>();
    private static final Map<String, Double> TRANSPORT_EMISSION_FACTORS = new HashMap<>();
    private static final Map<String, Double> HOME_ENERGY_EMISSION_FACTORS = new HashMap<>();
    private static final double WATER_EMISSION_FACTOR = 0.36; // kg CO₂ per cubic meter of water
    private static final double GAS_EMISSION_FACTOR = 1.89;  // kg CO₂ per cubic meter

    static {
        // Initialize waste emission factors
        WASTE_EMISSION_FACTORS.put("Plastic", 2.5);
        WASTE_EMISSION_FACTORS.put("Paper", 1.3);
        WASTE_EMISSION_FACTORS.put("Metal", 1.5);
        WASTE_EMISSION_FACTORS.put("Organic", 0.8);
        WASTE_EMISSION_FACTORS.put("General", 1.2);
        WASTE_EMISSION_FACTORS.put("Glass", 0.9);

        // Initialize transport emission factors
        TRANSPORT_EMISSION_FACTORS.put("Car", 0.24);
        TRANSPORT_EMISSION_FACTORS.put("Bus", 0.06);
        TRANSPORT_EMISSION_FACTORS.put("Train", 0.04);
        TRANSPORT_EMISSION_FACTORS.put("Bicycle", 0.0);
        TRANSPORT_EMISSION_FACTORS.put("Walk", 0.0);

        // Initialize home energy emission factors
        HOME_ENERGY_EMISSION_FACTORS.put("Electricity", 0.5);
        HOME_ENERGY_EMISSION_FACTORS.put("NaturalGas", 2.2);
        HOME_ENERGY_EMISSION_FACTORS.put("HeatingOil", 3.2);
        HOME_ENERGY_EMISSION_FACTORS.put("SolarPower", 0.05);
        HOME_ENERGY_EMISSION_FACTORS.put("WindPower", 3.2);
    }

    private int householdSize = 1;

    public EmissionCalculator(int householdSize) {
        this.householdSize = householdSize;
    }

    public double calculateWasteEmission(List<WasteData> wasteData) {
        double totalEmissions = 0;
        for (WasteData waste : wasteData) {
            String category = waste.getCategory();
            double amount = waste.getAmount();
            if (WASTE_EMISSION_FACTORS.containsKey(category)) {
                totalEmissions += amount * WASTE_EMISSION_FACTORS.get(category);
            } else {
                System.err.println("Unknown waste type: " + category);
            }
        }
        return roundToTwoDecimalPlaces(totalEmissions / householdSize);
    }

    public double calculateWaterEmission(double totalHouseholdUsage, double totalOutdoorUsage, int miscellaneousUsage) {
        double totalWaterUsage = totalHouseholdUsage + totalOutdoorUsage + miscellaneousUsage;
        double totalWaterUsageInCubicMeters = totalWaterUsage / 1000.0;
        return roundToTwoDecimalPlaces(WATER_EMISSION_FACTOR * totalWaterUsageInCubicMeters);
    }

    public double calculateTransportEmission(List<TransportData> transportData) {
        double totalEmissions = 0;
        for (TransportData transport : transportData) {
            String mode = transport.getMode();
            double distance = transport.getDistance();
            if (TRANSPORT_EMISSION_FACTORS.containsKey(mode)) {
                totalEmissions += distance * TRANSPORT_EMISSION_FACTORS.get(mode);
            } else {
                System.err.println("Unknown transport type: " + mode);
            }
        }
        return roundToTwoDecimalPlaces(totalEmissions);
    }

    public double calculateHomeEnergyEmission(HomeData homeData) {
        if (homeData != null) {
            double totalHomeUsage = homeData.getElectricityUsage() *
                    HOME_ENERGY_EMISSION_FACTORS.getOrDefault(homeData.getEnergySource(), 0.0);
            totalHomeUsage += homeData.getGasUsage() * GAS_EMISSION_FACTOR;
            return roundToTwoDecimalPlaces(totalHomeUsage / householdSize);
        }
        return 0;
    }

    private double roundToTwoDecimalPlaces(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    // Helper Classes for Input Data
    public static class WasteData {
        private String category;
        private double amount;

        public WasteData(String category, double amount) {
            this.category = category;
            this.amount = amount;
        }

        public String getCategory() {
            return category;
        }

        public double getAmount() {
            return amount;
        }
    }

    public static class TransportData {
        private String mode;
        private double distance;

        public TransportData(String mode, double distance) {
            this.mode = mode;
            this.distance = distance;
        }

        public String getMode() {
            return mode;
        }

        public double getDistance() {
            return distance;
        }
    }

    public static class HomeData {
        private double electricityUsage;
        private String energySource;
        private double gasUsage;

        public HomeData(double electricityUsage, String energySource, double gasUsage) {
            this.electricityUsage = electricityUsage;
            this.energySource = energySource;
            this.gasUsage = gasUsage;
        }

        public double getElectricityUsage() {
            return electricityUsage;
        }

        public String getEnergySource() {
            return energySource;
        }

        public double getGasUsage() {
            return gasUsage;
        }
    }
}
