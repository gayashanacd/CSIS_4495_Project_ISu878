package com.example.greenpath;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.greenpath.databases.GreenPathDatabase;
import com.example.greenpath.databinding.ActivityLoginBinding;
import com.example.greenpath.models.User;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class LoginActivity extends AppCompatActivity {

    ActivityLoginBinding binding;
    GreenPathDatabase greenPathDatabase;
    String username, password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        greenPathDatabase = Room.databaseBuilder(getApplicationContext(), GreenPathDatabase.class, "greenpath.db").build();
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        binding.buttonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                username = binding.editTextLoginUsername.getText().toString();
                password = binding.editTextLoginPassword.getText().toString();

                if (!username.equals("") && !password.equals("")) {
                    validateUser(username, password);
                }
                else{
                    showMessage("Username or password cannot be empty");
                }
            }
        });
    }

    private void validateUser(String userName, String password){
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.execute(new Runnable() {
            @Override
            public void run() {
                User user = greenPathDatabase.userDAO().getUser(userName,password);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (user!=null) {
                            if(user.isAdmin()){

                                SharedPreferences settings = getSharedPreferences("PREFS_CM", 0);
                                // settings = getSharedPreferences("PREFS_CM", 0);
                                SharedPreferences.Editor editor = settings.edit();
                                editor.putString("USERNAME", user.getUserName());
                                editor.putString("PASSWORD", user.getPassword());
                                editor.putString("USERID", user.getId());
                                editor.putBoolean("IS_LOGGED", true);
                                editor.putString("MONGOID", user.getMongoId());
                                editor.apply();
                                startActivity(new Intent(LoginActivity.this, MainActivity.class));
                            }else {
                                Log.d("DB User found : ", user.getUserName());
                                Log.d("CM", "DB User found image : " + user.getImagePath());

                                // save current user info
                                SharedPreferences settings = getSharedPreferences("PREFS_CM", 0);
                                // settings = getSharedPreferences("PREFS_BBW", 0);
                                SharedPreferences.Editor editor = settings.edit();
                                editor.putString("USERNAME", user.getUserName());
                                editor.putString("PASSWORD", user.getPassword());
                                editor.putString("USERID", user.getId());
                                editor.putString("USERIMAGE", user.getImagePath());
                                editor.putString("MONGOID", user.getMongoId());
                                editor.putBoolean("IS_LOGGED", true);
                                editor.putString("CITY", user.getCity());
                                editor.putInt("HOUSEHOLD_SIZE", user.getHouseholdSize());
                                editor.apply();
                                startActivity(new Intent(LoginActivity.this, MainActivity.class));
                            }
                        }
                        else{
                            EditText txtUserName = binding.editTextLoginUsername;
                            EditText txtPassword = binding.editTextLoginPassword;
                            txtUserName.setText("");
                            txtPassword.setText("");
                            txtUserName.requestFocus();
                            showMessage("Incorrect username or password. Try again.");
                        }
                    }
                });

            }
        });
    }

    private void showMessage(String message){
        Toast.makeText(LoginActivity.this, message, Toast.LENGTH_SHORT).show();
    }
}