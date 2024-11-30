package com.example.greenpath;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.example.greenpath.databases.GreenPathDatabase;
import com.example.greenpath.databinding.ActivityStartViewBinding;
import com.example.greenpath.models.User;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class StartViewActivity extends AppCompatActivity {

    ActivityStartViewBinding binding;
    List<User> users = new ArrayList<>();

    GreenPathDatabase greenPathDatabase;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityStartViewBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        setupInitialData();
        greenPathDatabase = Room.databaseBuilder(getApplicationContext(), GreenPathDatabase.class, "greenpath.db").build();
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        executorService.execute(new Runnable() {
            @Override
            public void run() {
                greenPathDatabase.userDAO().insertUsersFromList(users);
                Log.d("DB", users.size() + " users added");

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                    }
                });
            }
        });

        binding.buttonStartLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(StartViewActivity.this, LoginActivity.class));
            }
        });
    }

    private void setupInitialData() {

        // clear prefs
        SharedPreferences settings =  getSharedPreferences("PREFS_CM", 0);
        SharedPreferences.Editor editor = settings.edit();
        editor.putBoolean("IS_LOGGED", false);
        editor.putString("USERID", "");
        editor.putString("USERNAME", "");
        editor.putString("PASSWORD", "");
        editor.putString("MONGOID", "");
        editor.putString("CITY", "");
        editor.putInt("HOUSEHOLD_SIZE", 1);

        boolean isFirstRun = true;
        isFirstRun = settings.getBoolean("FIRST_RUN", true);
        if (isFirstRun) {
            // do the thing for the first time
            Log.d("CM", "FIRST RUN");
            editor.putBoolean("FIRST_RUN", false);
            editor.apply();
            readUsersFromCSV();
        } else {
            // other time your app loads
            readUsersFromCSV();
            Log.d("CM", "NOT THE FIRST RUN");
        }
    }

    private void readUsersFromCSV() {
        //read users from users.csv
        users = new ArrayList<>();
        String inputLine;
        InputStream inputStream = getResources().openRawResource(R.raw.users);
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        //rest of the file read logic next class

        try{
            if((inputLine = reader.readLine()) !=null){
                // header lin is contained in inputLine
            }
            while ((inputLine = reader.readLine()) != null){
                String[] eachUserFields = inputLine.split(",");
                User eachUser = new User(
                        eachUserFields[0],
                        eachUserFields[1],
                        eachUserFields[2],
                        Boolean.parseBoolean(eachUserFields[3]),
                        eachUserFields[4],
                        eachUserFields[5],
                        Integer.parseInt(eachUserFields[6])
                );
                users.add(eachUser);
            }
        }
        catch (IOException ex){
            ex.printStackTrace();
        } finally {
            try{
                inputStream.close();
            }catch (IOException ex){
                ex.printStackTrace();
            }
        }
    }
}