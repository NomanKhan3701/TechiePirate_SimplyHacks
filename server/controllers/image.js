const { cloudinary } = require("../utils/cloudinary");
const express = require("express");

const getImages = async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:dev_setups")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.status(200).send(publicIds);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message });
  }
};

const addImage = async (req, res) => {
  try {
    const { img } = req.body;
    const uploadedResponse = await cloudinary.uploader.upload(img, {
      upload_preset: "dev_setups",
      quality: "auto",
      fetch_format: "auto",
      dpr: "auto",
      width: "auto",
    });
    res.json({
      public_id: uploadedResponse.public_id,
      url: uploadedResponse.url,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    const deleted = await cloudinary.uploader.destroy(
      public_id,
      function (result) {
        console.log(result);
      }
    );
    // console.log("Remaining to implement the delete function");
    res.status(202).send(deleted);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message });
  }
};

module.exports = {
  getImages,
  addImage,
  deleteImage,
};
