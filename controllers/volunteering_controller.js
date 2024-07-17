import { volunteeringSchema } from "../schema/volunteering_schema.js";
import { UserModel } from "../models/user_model.js";
import { Volunteering } from "../models/volunteering_model.js";



// Function to add a volunteering activity
export const createVolunteering = async (req, res) => {
  try {
    // Validate data provided by the user
    const { error, value } = volunteeringSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Retrieve user session
    const userId = req.session?.user?.id || req?.user?.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Add a volunteering activity
    const volunteering = await Volunteering.create({
      ...value,
      user: userId,
    });

    // If the user was found,push the id of the volunteering you just created inside the user
    user.volunteering.push(volunteering._id);

    // And save the user now with the volunteering id
    await user.save();

    // Return response
    res.status(201).json({ volunteering });
  } catch (error) {
    console.log(error);
  }
};



// Function to get all volunteering activities of a particular user
export const getAllVolunteering = async (req, res) => {
  try {
    //Fetch Volunteering that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id;
    const allVolunteering = await Volunteering.find({ user: userId });
    if (allVolunteering.length == 0) {
      return res.status(404).send("No Volunteering added");
    }
    res.status(200).json({ Volunteerings: allVolunteering });
  } catch (error) {
    return res.status(500).json({ error });
  }
};



// Function to update a volunteering activity of a user
export const updateVolunteering = async (req, res) => {
  try {
    // Validate data provided by user
    const { error, value } = volunteeringSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Retrieve user session
    const userId = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update volunteering
    const volunteering = await Volunteering.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!volunteering) {
      return res.status(404).send("Volunteering not found");
    }

    res.status(200).json({ Volunteering });
  } catch (error) {
    return res.status(500).json({ error });
  }
};



// Function to delete a volunteering activity of a user
export const deleteVolunteering = async (req, res) => {
  try {
    // Retrieve user session
    const userId = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Delete volunteering activity
    const volunteering = await Volunteering.findByIdAndDelete(req.params.id);
    if (!volunteering) {
      return res.status(404).send("Volunteering not found");
    }

    // Remove the deleted volunteering activity from the particular user
    user.volunteering.pull(req.params.id);
    // Save the change
    await user.save();

    res.status(200).json("Volunteering activity deleted successfully");
  } catch (error) {
    return res.status(500).json({ error });
  }
};