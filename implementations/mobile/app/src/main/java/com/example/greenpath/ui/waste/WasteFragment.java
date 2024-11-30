package com.example.greenpath.ui.waste;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.room.Room;

import com.example.greenpath.databases.GreenPathDatabase;
import com.example.greenpath.databinding.FragmentWasteBinding;
import com.example.greenpath.models.User;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class WasteFragment extends Fragment {

    private FragmentWasteBinding binding;
    GreenPathDatabase cmDB;
    User currentUser;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        WasteViewModel wasteViewModel =
                new ViewModelProvider(this).get(WasteViewModel.class);

        binding = FragmentWasteBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        cmDB = Room.databaseBuilder(requireContext(), GreenPathDatabase.class, "greenpath.db").build();

        SharedPreferences settings =  requireActivity().getSharedPreferences("PREFS_CM", 0);
        String userId = settings.getString("USERID", "");

        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.execute(new Runnable() {
            @Override
            public void run() {
                currentUser = cmDB.userDAO().getUserById(userId);
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        setData();
                    }
                });
            }
        });

        return root;
    }

    private void setData() {

    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}