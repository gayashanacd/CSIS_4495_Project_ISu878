package com.example.greenpath.ui.carbon;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.room.Room;

import com.android.volley.RequestQueue;
import com.example.greenpath.databases.GreenPathDatabase;
import com.example.greenpath.databinding.FragmentCarbonBinding;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CarbonInputFragment extends Fragment {

    private FragmentCarbonBinding binding;
    GreenPathDatabase cmDB;
    private RequestQueue requestQueue;
    ArrayList barArraylist;
    String mongoId, formattedDate;
    final String API = "http://10.0.2.2:5000/api/";

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        CarbonInputViewModel homeViewModel =
                new ViewModelProvider(this).get(CarbonInputViewModel.class);

        binding = FragmentCarbonBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        cmDB = Room.databaseBuilder(requireContext(), GreenPathDatabase.class, "calariemate.db").build();
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        SharedPreferences settings =  requireActivity().getSharedPreferences("PREFS_CM", 0);
        String userId = settings.getString("USERID", "");
        mongoId = settings.getString("MONGOID", "");
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formattedDate = currentDate.format(formatter);
        binding.editTextDateCarbonInput.setText(formattedDate);

        executorService.execute(new Runnable() {
            @Override
            public void run() {

            }
        });

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}