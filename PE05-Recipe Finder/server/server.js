import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not configured.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let recipes;

async function connectToDatabase() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });

  const database = client.db("recipeFinder");
  recipes = database.collection("recipes");

  console.log("Connected to MongoDB Atlas");
}

/* GET all recipes */
app.get("/api/recipes", async (req, res) => {
  try {
    const result = await recipes
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve recipes." });
  }
});

/* GET one recipe */
app.get("/api/recipes/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid recipe ID." });
    }

    const recipe = await recipes.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve the recipe." });
  }
});

/* POST a new recipe */
app.post("/api/recipes", async (req, res) => {
  try {
    const {
      name,
      ingredients,
      instructions,
      category,
      cookingTime,
    } = req.body;

    if (
      !name?.trim() ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0 ||
      !instructions?.trim()
    ) {
      return res.status(400).json({
        message: "Name, ingredients, and instructions are required.",
      });
    }

    const newRecipe = {
      name: name.trim(),
      ingredients: ingredients
        .map((ingredient) => ingredient.trim())
        .filter(Boolean),
      instructions: instructions.trim(),
      category: category?.trim() || "Other",
      cookingTime: Number(cookingTime) || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await recipes.insertOne(newRecipe);

    res.status(201).json({
      ...newRecipe,
      _id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not create the recipe." });
  }
});

/* PATCH an existing recipe */
app.patch("/api/recipes/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid recipe ID." });
    }

    const {
      name,
      ingredients,
      instructions,
      category,
      cookingTime,
    } = req.body;

    if (
      !name?.trim() ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0 ||
      !instructions?.trim()
    ) {
      return res.status(400).json({
        message: "Name, ingredients, and instructions are required.",
      });
    }

    const updates = {
      name: name.trim(),
      ingredients: ingredients
        .map((ingredient) => ingredient.trim())
        .filter(Boolean),
      instructions: instructions.trim(),
      category: category?.trim() || "Other",
      cookingTime: Number(cookingTime) || 0,
      updatedAt: new Date(),
    };

    const result = await recipes.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updates },
      { returnDocument: "after" }
    );

    if (!result) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Could not update the recipe." });
  }
});

/* DELETE a recipe */
app.delete("/api/recipes/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid recipe ID." });
    }

    const result = await recipes.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    res.json({ message: "Recipe deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete the recipe." });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

async function shutdown() {
  await client.close();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);