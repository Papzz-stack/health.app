// HealthFoxApplication.java
package com.healthfox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@SpringBootApplication
@RestController
public class HealthFoxApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthFoxApplication.class, args);
    }

    // Endpoint: /generatePlan
    @PostMapping("/generatePlan")
    public Map<String, Object> generatePlan(@RequestBody Map<String, Object> userDetails) {
        int age = (int) userDetails.get("age");
        int height = (int) userDetails.get("height");
        int weight = (int) userDetails.get("weight");
        String activity = (String) userDetails.get("activity");
        String diet = (String) userDetails.get("diet");

        // Calorie calculation
        double calories = 10 * weight + 6.25 * height - 5 * age + 5;
        if (activity.equalsIgnoreCase("Moderate")) calories *= 1.55;
        if (activity.equalsIgnoreCase("Active")) calories *= 1.75;

        // Meal plan
        List<String> meals = new ArrayList<>();
        switch (diet.toLowerCase()) {
            case "vegetarian":
                meals = Arrays.asList("Breakfast: Oatmeal with berries 🍓",
                                      "Lunch: Lentil soup 🥣",
                                      "Dinner: Veggie stir-fry 🥦");
                break;
            case "vegan":
                meals = Arrays.asList("Breakfast: Smoothie with oats 🍌",
                                      "Lunch: Quinoa salad 🥗",
                                      "Dinner: Chickpea curry 🍛");
                break;
            case "halal":
                meals = Arrays.asList("Breakfast: Eggs and toast 🍳",
                                      "Lunch: Grilled chicken salad 🥗",
                                      "Dinner: Salmon with veggies 🐟");
                break;
            case "ghanaian":
                meals = Arrays.asList("Breakfast: Koko (millet porridge) with bread 🍞",
                                      "Lunch: Jollof rice with grilled chicken 🍗",
                                      "Dinner: Banku with tilapia and pepper sauce 🐟🌶️");
                break;
            default:
                meals = Arrays.asList("Breakfast: Yogurt with fruit 🍎",
                                      "Lunch: Turkey sandwich 🥪",
                                      "Dinner: Beef stir-fry 🥩");
        }

        // Response JSON
        Map<String, Object> response = new HashMap<>();
        response.put("calories", Math.round(calories));
        response.put("meals", meals);
        response.put("habits", Arrays.asList("Drink water 💧", "Exercise 🏃", "Sleep well 😴"));

        return response;
    }
}
