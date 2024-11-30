package com.example.greenpath.ui.waste;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class WasteViewModel extends ViewModel {

    private final MutableLiveData<String> mText;

    public WasteViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is waste input fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}