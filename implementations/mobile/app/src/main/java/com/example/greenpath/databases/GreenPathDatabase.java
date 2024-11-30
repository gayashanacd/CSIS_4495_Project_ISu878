package com.example.greenpath.databases;

import androidx.room.Database;
import androidx.room.RoomDatabase;

import com.example.greenpath.interfaces.UserDao;
import com.example.greenpath.models.User;

@Database(entities = {User.class}, version = 1, exportSchema = false)
public abstract class GreenPathDatabase extends RoomDatabase {
    public abstract UserDao userDAO();
}
