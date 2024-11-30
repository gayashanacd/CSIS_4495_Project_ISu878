package com.example.greenpath.utils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class JsonParser {
    public static List<JSONObject> parseJsonArray(String jsonArrayString) throws JSONException {
        List<JSONObject> jsonObjectList = new ArrayList<>();
        JSONArray jsonArray = new JSONArray(jsonArrayString);
        for (int i = 0; i < jsonArray.length(); i++) {
            jsonObjectList.add(jsonArray.getJSONObject(i));
        }
        return jsonObjectList;
    }
}
