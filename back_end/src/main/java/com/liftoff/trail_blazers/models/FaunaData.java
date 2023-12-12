package com.liftoff.trail_blazers.models;

import java.util.ArrayList;

public class FaunaData {


    /**
     * Returns the results of searching Fauna data by field and search term.
     *
     * @param column Fauna field that should be searched.
     * @param value Value of the field to search for.
     * @param allFauna The list of animals to search.
     * @return List of all animals matching the criteria.
     */
    public static ArrayList<Fauna> findByColumnAndValue(String column, String value, Iterable<Fauna> allFauna) {
        ArrayList<Fauna> results = new ArrayList<>();

        if (value.toLowerCase().equals("all")){
            return(ArrayList<Fauna>) allFauna;
        }

        if (column.equals("all")){
            results = findByValue(value, allFauna);
            return results;
        }

        for (Fauna animal : allFauna) {
            String aValue = getFieldValue(animal, column);

            if (aValue != null && aValue.toLowerCase().contains(value.toLowerCase())) {
                results.add(animal);
            }
        }
        return results;
    }

    public static String getFieldValue(Fauna animal, String fieldName){
        String theValue;
        if (fieldName.equals("scientificName")){
            theValue = animal.getScientificName();
        } else if (fieldName.equals("commonName")){
            theValue = animal.getCommonName();
        } else if (fieldName.equals("currentDistribution")){
            theValue = animal.getCurrentDistribution();
        } else if (fieldName.equals("family")){
            theValue = animal.getFamily();
        } else {
            theValue = animal.getStatus();
        }
        return theValue;
    }


    /**
     * Search all fauna fields for the given term.
     *
     * @param value The search term to look for.
     * @param allFauna The list of animals to search.
     * @return List of all Fauna with at least one field containing the value.
     */
    public static ArrayList<Fauna> findByValue(String value, Iterable<Fauna> allFauna) {

        ArrayList<Fauna> results = new ArrayList<>();

        for (Fauna animal : allFauna) {

            if (animal.getCommonName().toLowerCase().contains(value.toLowerCase())) {
                results.add(animal);
            } else if (animal.getCurrentDistribution().toLowerCase().contains(value.toLowerCase())) {
                results.add(animal);
            } else if (animal.getFamily().toLowerCase().contains(value.toLowerCase())) {
                results.add(animal);
            }else if (animal.getScientificName().toLowerCase().contains(value.toLowerCase())) {
                results.add(animal);
            }else if (animal.getStatus().toLowerCase().contains(value.toLowerCase())) {
                results.add(animal);
            }
        }
        return results;
    }
}
