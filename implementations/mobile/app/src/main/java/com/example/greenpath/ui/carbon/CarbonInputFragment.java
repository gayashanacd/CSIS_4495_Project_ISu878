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

import com.example.greenpath.databases.GreenPathDatabase;
import com.example.greenpath.databinding.FragmentCarbonBinding;

import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CarbonInputFragment extends Fragment {

    private FragmentCarbonBinding binding;
    GreenPathDatabase cmDB;
    ArrayList barArraylist;

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