package com.crazysnake;

//import com.facebook.react.ReactActivity;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.widget.ImageView;
import android.view.Gravity;
import android.util.TypedValue;
import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);
        ImageView imageView = new ImageView(this);

        view.setBackgroundColor(Color.parseColor("#FFFFFF"));
        view.setGravity(Gravity.CENTER);

        view.addView(imageView);
        return view;
    }

}