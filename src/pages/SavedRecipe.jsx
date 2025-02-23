import React, { useState, useEffect } from "react";
import axios from "axios";
import SavedCard from "../components/SavedCard";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Handle errors
  const userID = useGetUserID();
  const navigate = useNavigate();

  // Redirect user if not logged in
  useEffect(() => {
    if (!userID) {
      navigate("/login");
    }
  }, [userID, navigate]);

  // Fetch saved recipes with full details
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recipes/saved/${userID}`
        );
        setSavedRecipes(response.data); // Assuming backend returns full recipe details
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
        setError("Failed to load saved recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchSavedRecipes();
    }
  }, [userID]);

  // Show loading skeleton
  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <div className="flex-col items-center justify-center py-6 w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Saved Recipes
        </h1>
        <p className="text-center mt-4 text-red-500">{error}</p>
      </div>
    );
  }

  // Show message if no saved recipes exist
  if (savedRecipes.length === 0) {
    return (
      <div className="flex-col items-center justify-center py-6 w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Saved Recipes
        </h1>
        <p className="text-center mt-4 text-gray-600">No recipes saved yet.</p>
      </div>
    );
  }

  return (
    <div className="flex-col items-center justify-center py-6 w-full">
      <h1 className="text-2xl font-semibold text-center text-gray-900">
        Saved Recipes
      </h1>
      <div className="w-full mt-4 mx-auto flex justify-center px-4 md:px-28 lg:px-40 xl:px-96">
        <div className="flex flex-col gap-5">
          {savedRecipes.map((recipe) => (
            <SavedCard
              key={recipe._id}
              name={recipe.name}
              imageUrl={recipe.imageUrl}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              cookingTime={recipe.cookingTime}
              userName={recipe.username}
              id={recipe._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipe;
