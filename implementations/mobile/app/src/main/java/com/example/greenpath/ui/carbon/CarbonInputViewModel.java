package com.example.greenpath.ui.carbon;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class CarbonInputViewModel extends ViewModel {

    private final MutableLiveData<String> mText;

    public CarbonInputViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is carbon input fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}