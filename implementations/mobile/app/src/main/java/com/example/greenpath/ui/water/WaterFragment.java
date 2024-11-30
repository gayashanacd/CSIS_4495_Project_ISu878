package com.example.greenpath.ui.water;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.room.Room;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.example.greenpath.databases.GreenPathDatabase;
import com.example.greenpath.databinding.FragmentWaterBinding;
import com.example.greenpath.utils.JsonParser;
import com.example.greenpath.utils.VolleySingleton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.security.SecureRandom;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class WaterFragment extends Fragment {

    private FragmentWaterBinding binding;
    GreenPathDatabase cmDB;
    private RequestQueue requestQueue;
    private static final String CHARACTERS = "0123456789";
    private static final int ID_LENGTH = 5;
    private static final SecureRandom random = new SecureRandom();


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        WaterViewModel addViewModel =
                new ViewModelProvider(this).get(WaterViewModel.class);

        binding = FragmentWaterBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        cmDB = Room.databaseBuilder(requireContext(), GreenPathDatabase.class, "calariemate.db").build();
        requestQueue = VolleySingleton.getInstance(requireContext()).getRequestQueue();

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

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}